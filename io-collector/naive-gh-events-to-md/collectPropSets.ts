import { GHEvent } from "./eventTypes"
import { getEventsPropSets } from "./getProps"
import { NaiveConfig } from "./types"
import { EventPropSet } from "./types"
const _ = require("lodash")

export interface DatedEventCollection {
  startDate: Date
  endDate: Date
  eventPropSets: EventPropSet[]
}

export interface SortedDatedEventCollection {
  startDate: Date
  endDate: Date
  eventPropSetGroups: EventPropSet[][]
  eventPropSets: EventPropSet[]
}

export type DatedEventCollections = DatedEventCollection[]
export type SortedDatedEventCollections = SortedDatedEventCollection[]

export function groupEventPropSets(evps: EventPropSet[]): EventPropSet[][] {
  return evps.reduce(
    (acc, set, index) => {
      let { done } = acc
      if (done.indexOf(index) === -1) {
        let sameSets = evps.filter((innerSet, innerIndex) => {
          if (done.indexOf(innerIndex) === -1) {
            if (
              _.isEqual(set.type, innerSet.type) &&
              _.isEqual(set.verb, innerSet.verb) &&
              _.isEqual(set.actionType, innerSet.actionType) &&
              _.isEqual(set.actor, innerSet.actor) &&
              _.isEqual(set.target, innerSet.target) &&
              _.isEqual(set.parent, innerSet.parent)
            ) {
              done.push(innerIndex)
              return true
            }
          } else {
            return false
          }
        })
        return { ...acc, sets: [...acc.sets, sameSets] }
      } else {
        return acc
      }
    },
    { done: [], sets: [] }
  ).sets
}

// export function sortEventPropSets(evps: EventPropSet[], { sort, collapse }: sortEventPropSetsOptions): EventPropSet[][] {

//   if (sort && sort.length > 0) {
//     sort.forEach(sortProperty)
//   }

// }

export function collectEventsByDate(
  evps: EventPropSet[],
  startDate: Date,
  days: number = 7
): DatedEventCollections {
  let collectionLengthMs = days * 86400000

  const evpsByDate = evps
    .filter((evp) => new Date(evp.date) > startDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce(
      (acc, evp) => {
        let { collections } = acc

        let openCollection = collections[collections.length - 1]

        // if the event date is within {days} days after the current collection start date
        //
        if (
          new Date(evp.date).getTime() <=
          openCollection.startDate.getTime() + collectionLengthMs
        ) {
          openCollection.eventPropSets.push(evp)
        } else {
          // close up a collection with something & start a new one,
          // or move start date of current (empty) collection until it includes this event
          if (openCollection.eventPropSets.length > 0) {
            openCollection.endDate = new Date(
              openCollection.startDate.getTime() + collectionLengthMs
            )

            collections.push({
              startDate: new Date(openCollection.endDate.getTime() + 1),
              endDate: null,
              eventPropSets: [evp],
            })
          } else {
            while (
              new Date(evp.date).getTime() >
              openCollection.startDate.getTime() + collectionLengthMs
            ) {
              openCollection.startDate = new Date(
                openCollection.startDate.getTime() + collectionLengthMs
              )
            }

            openCollection.eventPropSets.push(evp)
          }

          // start a new collection
        }
        return acc
      },
      {
        collections: [
          { startDate: startDate, endDate: null, eventPropSets: [] },
        ],
      }
    ).collections

  // i
  if (
    evpsByDate.length > 0 &&
    evpsByDate[evpsByDate.length - 1].endDate === null
  ) {
    let lastGroup = evpsByDate[evpsByDate.length - 1]
    if (
      lastGroup.startDate.getTime() + collectionLengthMs <
      new Date().getTime()
    ) {
      lastGroup.endDate = new Date(
        lastGroup.startDate.getTime() + collectionLengthMs
      )
    } else {
      evpsByDate[evpsByDate.length - 1].endDate = new Date()
    }
  }

  return evpsByDate
}

export function getSortedDatedEventCollections(
  events: GHEvent[],
  { sortBy, collapse, groupByDays, startDate }: NaiveConfig
): SortedDatedEventCollection[] {
  let propSets = getEventsPropSets(events).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  let output = []

  if (groupByDays) {
    output = collectEventsByDate(propSets, startDate, groupByDays)
  } else {
    output = collectEventsByDate(propSets, new Date("1/1/1970"), 1000000000)
  }

  if (collapse) {
    output = output.map((eventCollection) => ({
      ...eventCollection,
      eventPropSetGroups: groupEventPropSets(eventCollection.eventPropSets),
    }))
  } else {
    output = output.map((eventCollection) => ({
      ...eventCollection,
      eventPropSetGroups: eventCollection.eventPropSets.map((epset) => [epset]),
    }))
  }

  if (sortBy && sortBy !== "date") {
    // should already be sorted by date
    output = output.map((refinedEventCollection) => ({
      ...refinedEventCollection,
      eventPropSetGroups: refinedEventCollection.eventPropSetGroups.sort(
        (epsgroupA, epsgroupB) => epsgroupA[0][sortBy] - epsgroupB[0][sortBy]
      ),
    }))
  }

  return output
}
