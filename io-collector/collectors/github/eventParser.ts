// import { GithubEvent } from "./types"
// import { eventPaths } from "./eventPaths"
// import {
//   getEntityMd,
// } from "./mdGenerators"
// import _ from 'lodash'

// type EventsSummary = string

// function combineAndParseEventsWithMultipleEntities(events: GithubEvent[]) {}

// function groupEventsBySameEntities(events: GithubEvent[]): GithubEvent[][] {
//   const output: GithubEvent[][]
//   const sortedEvents: number[] = []

//   events.forEach((event, i) => {
//     const set = []
//     const otherEvents = events
//       .slice(0, i)
//       .join(events.slice(i + 1, events.length - 1))

//     // if not already sorted
//     if (sortedEvents.indexOf(i) === -1) {
//       // get all events with the same type
//       const sameType: GithubEvent[] = events.filter(e => e.type === event.type)

//       // get all events with the same subject id
//       // _.get(event, eventPaths[type].subject.id)
//       const sameSubject: GithubEvent[] = events.filter(e => _.get(e, eventPaths[e.type].subject.id) === _.get(e, eventPaths[event.type].subject.id))
//     }
//   })

//   return output
// }

// assembleFullMdFragment: builds a complete LI for a single event
// export function assembleMdLinesForSingleEvent(event: GithubEvent): string[] {
// this function builds

// assume this is one of the single event types:
// CommitCommentEvent
// CreateEvent
// DeleteEvent
// ForkEvent
// GollumEvent
// IssueCommentEvent
// IssuesEvent TODO: Add support for multiple changes to an issue
// MemberEvent
// PublicEvent
// PullRequestEvent
// PullRequestReviewCommentEvent
// ReleaseEvent
// SponsorshipEvent
// WatchEvent

//   const output: string[] = []
//   output.push(
//     `  - ${getActorVerbResultMd(event)} ${getEntityMd(
//       event,
//       "subject"
//     )} ${getEntityMd(event, "target")} ${getEntityMd(event, "parent")}`
//   )
//   hasContent(event) && output.push(`    > ${getContentMd(event)}`)
//   return output
// }

// function parseEvents(events: GithubEvent[]): EventsSummary {
//   events.map(event => {
//     switch (event.type) {
//       default: {
//         return `  - ${""}`
//       }
//     }
//   })
// }
