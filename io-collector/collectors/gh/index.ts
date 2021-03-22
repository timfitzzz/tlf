const fs = require("fs")
import { DateTime } from "luxon"
import Naive, { GHEvent, RenderedEventCollectionSet } from "naive-gh-events"
import axios, { AxiosRequestConfig } from "axios"
import { IioRecordsListItem } from "../../collect"
import { getLastRecordDate } from "../../getLastRecord"
import { generateIOMDXFileContents } from "../../write"
// import { Endpoints } from "@octokit/types"

// export async function testNaiveEvents(personalAccessToken: string) {
//   // const username = process.env.GATSBY_GITHUB_USERNAME || "timfitzzz"

//   let eventsPageConfig: AxiosRequestConfig = {
//     method: "get",
//     url: `https://api.github.com/users/timfitzzz/events?page=1`,
//     headers: {
//       Authorization: `Bearer ${personalAccessToken}`,
//     },
//   }

//   let eventsPage = (await axios.request<GHEvent[]>(eventsPageConfig)).data

//   let events = Naive.renderEvents(eventsPage)

//   console.log(events)
// }

export async function getNewGithubEvents(
  personalAccessToken: string,
  ioRecordsList: IioRecordsListItem[]
): Promise<GHEvent[]> {
  // find the newest github record
  // set last record date for later comparison
  var lastUpdated = getLastRecordDate("github", ioRecordsList)

  var userEvents: GHEvent[] = []
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

    let eventsPage: GHEvent[] = (
      await axios.request<GHEvent[]>(eventsPageConfig)
    ).data

    let newEvents = eventsPage.filter((event: GHEvent) => {
      // console.log(new Date(event.created_at), lastUpdated)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return new Date(event.created_at!) > lastUpdated ? true : false
    })

    // console.log(`found ${newEvents.length} new items on page ${page}`)

    if (newEvents.length == 0) {
      // if this page had no new events, we can exit this while loop
      done = true
    } else {
      // add all the new events to our newEvents object and
      // restart the while loop with next page
      newEvents.forEach((event) => userEvents.push(event))
      page++
    }
  }

  return userEvents
}

function generateGitHubWeekFile(renderedSet: RenderedEventCollectionSet) {
  function generateTitle() {
    return `GitHub activity, ${renderedSet.startDate} to ${renderedSet.endDate}`
  }

  return generateIOMDXFileContents(
    {
      templateKey: "github",
      source: "github",
      title: generateTitle(),
      date: DateTime.fromJSDate(new Date(renderedSet.endDate)).toISO(),
      description: "Week of GitHub Activity",
      URI: "https://github.com/timfitzzz",
      tags: ["GitHub"],
      body: renderedSet.renderedEventCollections,
    },
    true
  )
}

function writeNewRecords(
  renderedSets: RenderedEventCollectionSet[],
  mdxFolder: string
) {
  renderedSets.forEach((week) => {
    const weekFile = generateGitHubWeekFile(week)

    let dateString = DateTime.fromJSDate(new Date(week.startDate)).toFormat(
      `yyyy-MM-dd`
    )

    fs.writeFileSync(
      `${mdxFolder}/${dateString}-${week.renderedEventCollections.length}_gh_events.mdx`,
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
  const NaiveConfig = {
    md: true,
    collapse: true,
  }

  getNewGithubEvents(personalAccessToken, ioRecordsList).then((userEvents) =>
    writeNewRecords(Naive.renderEvents(userEvents, NaiveConfig), mdxFolder)
  )
}
