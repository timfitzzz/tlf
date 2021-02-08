import { DateTime } from "luxon"
import axios, { AxiosRequestConfig } from "axios"
const fs = require("fs")
import { IioRecordsListItem } from "../collect"
import { getLastRecordDate } from "../getLastRecord"
import { Endpoints } from "@octokit/types"
import { IOMDXRecord } from "../types"
import { generateIOMDXFileContents } from "../write"

export interface GitHubWeek extends IOMDXRecord {
  templateKey: "github"
  source: "github"
  tags: ["GitHub"]
}

export type GithubEvent = Endpoints["GET /users/{username}/events"]["response"]["data"][0] // cool trick

async function getNewGithubEvents(
  personalAccessToken: string,
  ioRecordsList: IioRecordsListItem[]
): Promise<GithubEvent[]> {
  // find the newest github record
  // set last record date for later comparison
  var lastUpdated = getLastRecordDate("github", ioRecordsList)

  var userEvents: GithubEvent[] = []
  var done = false
  var page = 1

  // search each page of event results until we get all events since the last
  // time our mdx files were updated
  while (!done) {
    // using axios; what we're doing isn't complex enough to call for adding
    // github js dependencies like github-api or octokit
    // update: nevermind, we need @octokit/rest for types :(
    let eventsPageConfig: AxiosRequestConfig = {
      method: "get",
      url: `https://api.github.com/users/timfitzzz/events?page=${page}`,
      headers: {
        Authorization: `Bearer ${personalAccessToken}`,
      },
    }

    // console.log("querying events page config: ", eventsPageConfig)

    let eventsPage = (
      await axios.request<
        Endpoints["GET /users/{username}/events"]["response"]["data"]
      >(eventsPageConfig)
    ).data

    let newEvents = eventsPage.filter((event: GithubEvent) => {
      // console.log(new Date(event.created_at), lastUpdated)
      return !!(new Date(event.created_at) > lastUpdated)
    })

    // console.log(`found ${newEvents.length} new items on page ${page}`)

    if (newEvents.length == 0) {
      // if this page had no new events, we can exit this while loop
      done = true
    } else {
      // add all the new events to our newEvents object and
      // restart the while loop with next page
      newEvents.forEach(event => userEvents.push(event))
      page++
    }
  }

  return userEvents
}

function parseNewGithubRecords(newRecords: GithubEvent[]) {
  let sortedRecords = newRecords
    .slice()
    .sort(
      (a, b) =>
        (new Date(a.created_at) as any) - (new Date(b.created_at) as any)
    )
  let weeks = []
  let currentWeekIndex = 0

  sortedRecords.forEach((record, i) => {
    // console.log(weeks)

    if (i == 0) {
      weeks[0] = [record]
    } else {
      let createdAt = DateTime.fromISO(record.created_at)
      let weekStart = DateTime.fromISO(weeks[currentWeekIndex][0].created_at)
      let differenceFromFirstRecord = createdAt.diff(weekStart, ["days"]).days

      // console.log(differenceFromFirstRecord)

      if (differenceFromFirstRecord > 7) {
        currentWeekIndex++
        weeks[currentWeekIndex] = [record]
      } else {
        weeks[currentWeekIndex].push(record)
      }
    }
  })

  return weeks
}

function generateGitHubWeekObject(weekEvents: GithubEvent[]): GitHubWeek {
  function generateTitle() {
    let startDateString = DateTime.fromISO(
      weekEvents[0].created_at
    ).toLocaleString(DateTime.DATE_FULL)
    let endDateString =
      weekEvents.length > 1
        ? DateTime.fromISO(
            weekEvents[weekEvents.length - 1].created_at
          ).toLocaleString(DateTime.DATE_FULL)
        : null

    return `${startDateString} ${endDateString &&
      `to ${endDateString}: ${weekEvents.length} git events`}`
  }

  function summarizeGithubEvent(event: GithubEvent): string[] {
    let actorText = `[${event.actor.display_login}](https://github.com/${event.actor.login})`
    let repoText = event.repo
      ? `[${event.repo.name}](https://github.com/${event.repo.name})`
      : null
    let eventSummary = []

    switch (event.type) {
      case "PushEvent":
        eventSummary.push(
          `  - ${actorText} pushed a commit to ${repoText}: \r\n`
        )
        //@ts-ignore -- 'commits' isn't in the provided types, but it should be
        event.payload.commits.forEach(commit => {
          let commitUrl = `https://github.com/${event.repo.name}/commits/${commit.sha}`
          let messageLines: string[] = commit.message.split("\n")
          if (messageLines.length > 1) {
            let [line1, ...otherLines] = messageLines
            eventSummary.push(
              `    > #[${commit.sha.substr(
                0,
                6
              )}](${commitUrl}): ${line1}  \r\n`
            )
            otherLines.map(line =>
              eventSummary.push(`    >          ${line}  \r\n`)
            )
          } else {
            eventSummary.push(
              `    > #[${commit.sha.substr(0, 6)}](${commitUrl}): ${
                messageLines[0]
              }  \r\n`
            )
          }
        })
        break
      case "WatchEvent":
        eventSummary.push(
          `  - ${actorText} ${event.payload.action} watching a repository: ${repoText} \r\n`
        )
        break
      case "IssuesEvent": {
        let issueText = `[${event.payload.issue.title}](${event.payload.issue.html_url})`
        eventSummary.push(
          `  - ${actorText} ${event.payload.action} an issue: ${issueText} \r\n`
        )
        event.payload.issue.body
          .split("\r\n")
          .forEach(
            line => line !== "\r\n" && eventSummary.push(`    > ${line}  \r\n`)
          )
        break
      }
      case "IssueCommentEvent":
        eventSummary.push(
          `  - ${actorText} ${event.payload.action} an issue on ${repoText} \r\n`
        )
        eventSummary.push(
          `    > #${event.payload.issue.number}: ${event.payload.issue.title}  \r\n`
        )
        break
      default:
        break
    }

    // console.log(eventSummary)
    return eventSummary
  }

  return weekEvents.reduce(
    (acc, current) => {
      return {
        ...acc,
        body: [
          ...acc.body,
          summarizeGithubEvent(current)
            .map(eventLine => `${eventLine}`)
            .join(""),
        ],
      }
    },
    {
      templateKey: "github",
      source: "github",
      title: generateTitle(),
      date: weekEvents[weekEvents.length - 1].created_at,
      description: "week of GitHub activity",
      URI: weekEvents[0].actor.url,
      tags: ["GitHub"],
      // data: JSON.stringify({ events: weekEvents }),
      body: [],
    }
  )
}

function writeNewRecords(weeks: GithubEvent[][], mdxFolder: string) {
  weeks.forEach(week => {
    const weekObject = generateGitHubWeekObject(week)
    const weekFile = generateIOMDXFileContents(weekObject)

    let dateString = DateTime.fromISO(
      week[week.length - 1].created_at
    ).toFormat(`yyyy-MM-dd`)

    fs.writeFileSync(
      `${mdxFolder}/${dateString}-${week.length}_gh_events.mdx`,
      weekFile
    )
  })
}

interface IcollectGithub {
  personalAccessToken: string
  username: string
  mdxFolder: string
  ioRecordsList: IioRecordsListItem[]
}

export const collectGithub = ({
  personalAccessToken,
  mdxFolder,
  ioRecordsList,
}: IcollectGithub) => {
  getNewGithubEvents(personalAccessToken, ioRecordsList).then(userEvents =>
    writeNewRecords(parseNewGithubRecords(userEvents), mdxFolder)
  )
}
