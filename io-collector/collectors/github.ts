import { DateTime } from "luxon"
import axios, { AxiosRequestConfig } from "axios"
import _ from "lodash"
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
export type GithubIssue = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0]
export type GithubLabel = Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"]["response"]["data"][0]
export type GithubUser = Endpoints["GET /users/{username}"]["response"]["data"]
export type GithubRepo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]

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

export function groupEventsByFieldPath(
  events: GithubEvent[],
  fieldName: string
): { [key: string]: GithubEvent[] } {
  let output: { [key: string]: GithubEvent[] } = {}

  events.forEach(
    event =>
      (output[_.get(event, fieldName)] = [
        event,
        ...output[_.get(event, fieldName)],
      ])
  )

  return output
}

export interface RepoEventsGroup {
  repoName: string
  commitEvents: GithubEvent[]
  issueEvents: GithubEvent[]
  commentsByIssue: {
    issueId: string
    comments: []
  }
}

interface GithubForkEvent extends GithubEvent {
  type: "ForkEvent"
  payload: {
    action: string
    forkee: GithubEvent["repo"]
  }
  repo: GithubRepo
}

interface GithubIssuesEvent extends GithubEvent {
  type: "IssuesEvent"
  payload: {
    action: string
    label?: GithubLabel
    issue?: GithubIssue
    assignee?: GithubUser
  }
}

export type GithubSingleEvent = GithubForkEvent | GithubIssuesEvent

function lMd(entity: { html_url?: string; name?: string; title?: string }) {
  let name = entity.name || entity.title
  return `[${name}](${entity.html_url})`
}

export function generateIssuesEventLanguage(event: GithubIssuesEvent) {
  switch (event.payload.action) {
    case "labeled":
      return `assigned issue ${lMd(event.payload.issue)} the ${
        event.payload.label.name
      } label`
    case "unlabeled":
      return `removed from issue ${lMd(event.payload.issue)} the ${
        event.payload.label.name
      } label`
    case "assigned":
      return `assigned the issue ${lMd(event.payload.issue)} to ${lMd(
        event.payload.assignee
      )}`
    case "unassigned":
      return `unassigned the issue ${lMd(event.payload.issue)} from ${lMd(
        event.payload.assignee
      )}`
    default:
      return `${event.payload.action} an issue on ${lMd(event.repo)}: ${lMd(
        event.payload.issue
      )}`
  }
}

// export function getTargetMd(event: GithubEvent): string {
//   const {
//     target: { id, url, desc, title },
//   } = eventPaths[event.type]

//   const name: string = title || id

//   return `${desc && desc + " "}[${_.get(event, name)}](${_.get(event, url)})`
// }

// export function getBriefTargetMd(event: GithubEvent) {
//   let {
//     target: { id, url, desc, title },
//   } = eventPaths[event.type]

//   return `[${_.get(event, id)}](${_.get(event, url)})${title && ": " + title}`
// }

// export function getSourceMd(event: GithubEvent): string {
//   const {
//     source: { id, url, desc, title },
//   } = eventPaths[event.type]

//   const name: string = title || id

//   return `${desc && desc + " "}[${_.get(event, name)}](${_.get(event, url)})`
// }

export const defaultActorPaths = {
  id: "actor.login",
  url: "actor.html_url",
}

export const repoParentPaths = {
  id: "repo.full_name",
  url: "repo.html_url",
  preposition: "in",
}

export const pullRequestPaths = {
  id: "payload.pull_request.number",
  url: "payload.pull_request.html_url",
  title: "payload.pull_request.title",
}

// single events include: ForkEvent
// export function generateSingleEventLanguage(event: GithubEvent) {
//   switch (event.type) {
//     case "ForkEvent": {
//       return `forked ${event.repo.name}, creating ${event.payload.forkee.name}`
//     }
//     case "IssuesEvent": {
//       return generateIssuesEventLanguage(event)
//     }
//     case "MemberEvent": {
//       return `${event.payload.action}`
//     }
//   }
// }

const repoNameMd = (repo: GithubEvent["repo"]) =>
  `[${repo.name}](https://github.com/${repo.name})`

// grouped events include: CommitCommentEvent, CreateEvent, DeleteEvent, GollumEvent

export function generateGroupedEventSummary(
  type: string,
  quant: number,
  repo: GithubEvent["repo"]
) {
  let plural = !!(quant > 1)

  switch (type) {
    case "CommitCommentEvent":
      return `left ${plural ? quant : "a"} comment${plural &&
        "s"} on commits in ${repoNameMd(repo)}`
    case "CreateEvent":
      return `created ${plural ? quant : "a"} branch${plural &&
        "es"}/tag${plural && "s"} in ${repoNameMd(repo)}`
    case "DeleteEvent":
      return `deleted ${plural ? quant : "a"} branch${plural &&
        "es"}/tag${plural && "s"} in ${repoNameMd(repo)}`
    case "GollumEvent":
      return `created or changed ${plural ? quant : "a"} wiki page${plural &&
        "s"} in ${repoNameMd(repo)}`
    case "IssueCommentEvent":
      return `added or deleted ${plural ? quant : "a"} comment${plural &&
        "s"} on ${!plural && "an"} issue${plural && "s"} in ${repoNameMd(repo)}`
    case "IssuesEvent":
      return ``
  }
}

// export function groupEvents(events: GithubEvent[]): RepoEventsGroup[] {
//   // const output: RepoEventsGroup[] = []

//   const repoNames: string[] = events.reduce(
//     (acc, event) =>
//       acc.indexOf(event.repo.name) === -1 ? acc + event.repo.name : acc },
//     []
//   )

//   const eventsByRepo = groupEventsByFieldPath(events, "repo.name")

//   return repoNames.map(repoName => {
//     const repoEventsByType = groupEventsByFieldPath(
//       eventsByRepo[repoName],
//       "type"
//     )

//     return {
//       repoName: repoName,
//       commitEvents: repoEventsByType.commit,
//       issueEvents: repoEventsByType.issue,
//       commentsByIssue: groupEventsByFieldPathrepoEventsByType.issue,
//     }
//   })
// }

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
