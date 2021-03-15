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
    { done: [] as number[], sets: [] as EventPropSet[][] }
  ).sets
}

// export function sortEventPropSets(evps: EventPropSet[], { sort, collapse }: sortEventPropSetsOptions): EventPropSet[][] {

//   if (sort && sort.length > 0) {
//     sort.forEach(sortProperty)
//   }

// }

function dayNameToNumber(dayName: string): number {
  dayName = dayName.toLowerCase()

  const dayNames = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  }

  return dayNames[dayName] || 0
}

function initializeStartWeekday(startWeekday: number | string): number {
  if (typeof startWeekday == "string") {
    // convert string
    return dayNameToNumber(startWeekday)
  } else if (startWeekday !== -1) {
    //
    // handle numbers over 7 and non-integers
    return Math.floor(startWeekday % 7)
  } else {
    return -1
  }
}

function initializeStartDate(startWeekday: number, firstEventDate: Date): Date {
  // if start weekday is a thing, we should move the start date to match
  // the first such weekday prior to the first event in the date range.
  if (startWeekday > -1) {
    let initialDay = firstEventDate.getDay()
    let daysToShift = initialDay - startWeekday // if first event is on monday (1), start day is 5, daysToShift = -4
    return new Date(
      new Date(firstEventDate.getTime() - Math.abs(daysToShift) * 86400000)
        .toJSON()
        .split("T")[0]
    )
  } else {
    // if start weekday is not a thing, then we need to start our first collection at the time of the first evp.
    return firstEventDate
  }
}

function initializeNextCollection(
  currentCollection: DatedEventCollection,
  nextEvent: EventPropSet,
  lengthMs: number
): DatedEventCollection {
  const { endDate: lastEndDate } = currentCollection

  const { date: nextEventDate } = nextEvent

  let nextStartDate: Date = new Date(lastEndDate.getTime() + 1)
  let nextEndDate: Date = new Date(lastEndDate.getTime() + lengthMs)

  // console.log(
  //   `lastEndDate: ${lastEndDate.getTime()}, nextEventDate: ${nextEventDate.getTime()}`
  // )
  // console.log(`potential next start date: ${nextStartDate.getTime()}`)
  // console.log(`is this date correct: ${checkRange()}`)

  function checkRange(): boolean {
    return !!(
      nextEventDate.getTime() >= nextStartDate.getTime() &&
      nextEventDate.getTime() <= nextEndDate.getTime()
    )
  }

  let keepLooping = true

  while (
    checkRange() === false &&
    keepLooping &&
    !(nextStartDate.getTime() > new Date().getTime())
  ) {
    // console.dir(
    //   `${nextEventDate} does not fall between ${nextStartDate} and ${nextEndDate}`
    // )
    nextStartDate = new Date(nextEndDate.getTime() + 1)
    nextEndDate = new Date(nextEndDate.getTime() + lengthMs)
    // console.dir(
    //   `new potential next start/end dates: ${nextStartDate}, ${nextEndDate}`
    // )
    if (checkRange()) {
      keepLooping = false
    }
  }

  // console.log(
  //   `settled on ${nextStartDate} - ${nextEndDate}, placing event dated ${nextEventDate} within`
  // )

  return {
    startDate: nextStartDate,
    endDate: nextEndDate,
    eventPropSets: [nextEvent],
  }
}

export function collectEventsByDate(
  evps: EventPropSet[], // array of event props
  startDate: Date, // earliest date to include
  days: number = 7, // number of days' worth of events to collect
  startWeekday: number | string = 0
  // ^ weekday to begin collecting from
  // (default sunday, -1 to start from earliest event date)
): DatedEventCollections {
  // collections of events grouped by date

  let collectionLengthMs = days * 86400000 // ms in a day

  startWeekday = initializeStartWeekday(startWeekday)
  // console.log(startWeekday)
  const evpsByDate = [...evps]
    .filter((evp) => evp.date.getTime() >= startDate.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const collectionStartDate = initializeStartDate(
    startWeekday,
    evpsByDate[0].date
  )

  // console.dir(startWeekday, collectionStartDate)

  // // if start weekday is a thing, we should move the start date to match
  // // the first such weekday prior to the first event in the date range.
  // if (startWeekday > -1) {
  //   let initialDate = evpsByDate[1].date
  //   let initialDay = initialDate.getDay()
  //   let daysToShift = initialDay - startWeekday
  //   startDate = new Date(
  //     new Date(initialDate.getTime() - daysToShift * 86400000)
  //       .toJSON()
  //       .split("T")[0]
  //   )
  // } else {
  //   // if start weekday is not a thing, then we need to start our first collection at the time of the first evp.
  //   startDate = evpsByDate[0].date
  // }

  // const evpDates = evpsByDate.reduce(
  //   (acc, evp) => acc + `, ${evp.date.toLocaleString()}`,
  //   ``
  // )

  // // console.dir(evpDates)

  const output = evpsByDate
    .reduce(
      // run through evps and sort into collections
      (acc, evp) => {
        let { collections } = acc
        // console.dir(collections)
        let openCollection = collections[
          collections.length - 1
        ] as DatedEventCollection // work on the current collection (last in string)

        // if the event date is within {days} days after the current collection start date
        // push it into the open collection object.
        if (
          openCollection &&
          openCollection.startDate &&
          evp.date.getTime() <= openCollection.endDate.getTime()
        ) {
          // console.log(
          //   `${evp.date.getTime()} is between ${openCollection.startDate.getTime()} and ${openCollection.endDate.getTime()}`
          // )
          if (openCollection && openCollection.eventPropSets) {
            openCollection.eventPropSets.push(evp)
          }
        } else {
          // or move start date of current (empty) collection until it includes this event
          // console.log(
          //   `${evp.date.getTime()} NOT between ${openCollection.startDate.getTime()} and ${openCollection.endDate.getTime()}`
          // )
          // if (
          //   openCollection &&
          //   openCollection.eventPropSets &&
          //   openCollection.eventPropSets.length > 0
          // ) {
          //   console.log(
          //     `found events in current collection ${openCollection}, closing`
          //   )

          let newCollection = initializeNextCollection(
            openCollection,
            evp,
            collectionLengthMs
          )
          // if the current collection contains events, create the next one
          newCollection && collections.push(newCollection)
          // } else {
          //   // if the current collection is empty, move it ahead a time unit at
          //   // a time until it contains the event.
          //   while (
          //     openCollection.eventPropSets.length < 1 &&
          //     startDate.getTime() < new Date().getTime()
          //   ) {
          //     openCollection.startDate = new Date(
          //       openCollection.startDate.getTime() + collectionLengthMs
          //     )
          //     if (evp.date.getTime() < openCollection.startDate.getTime()) {
          //       openCollection.eventPropSets.push(evp)
          //     }
          //   }
        }

        // start a new collection
        //}
        return acc
      },
      {
        collections: [
          {
            startDate: collectionStartDate as Date,
            endDate: new Date(
              collectionStartDate.getTime() + collectionLengthMs
            ),
            eventPropSets: [] as EventPropSet[],
          },
        ] as DatedEventCollection[],
      }
    )
    .collections.filter((collection) => collection.eventPropSets.length > 0)

  // i
  if (output.length > 0 && output[output.length - 1].endDate === null) {
    let lastGroup = output[output.length - 1] as DatedEventCollection
    if (
      lastGroup.startDate &&
      lastGroup.startDate.getTime() + collectionLengthMs < new Date().getTime()
    ) {
      lastGroup.endDate = new Date(
        lastGroup.startDate.getTime() + collectionLengthMs
      )
    } else {
      output[output.length - 1].endDate = new Date()
    }
  }

  return output
}

export function getSortedDatedEventCollections(
  events: GHEvent[],
  { sortBy, collapse, groupByDays, startDate }: NaiveConfig
): SortedDatedEventCollections {
  let propSets = getEventsPropSets(events).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  let output: SortedDatedEventCollections | DatedEventCollections = []

  if (groupByDays) {
    output = collectEventsByDate(
      propSets,
      startDate || new Date("1/1/1970"),
      groupByDays
    )
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

  return output as SortedDatedEventCollections
}
