/* eslint-disable no-console */

import testData from "./testData"
import EventTypes from "../eventTypes"
import { defaultNaiveConfig, TestEvent } from "../types"
import { getEventsPropSets } from "../getProps"
import {
  collectEventsByDate,
  getSortedDatedEventCollections,
  groupEventPropSets,
} from "../collectPropSets"
import _ from "lodash"

let testEventsSets: TestEvent[] = []

beforeAll(() => {
  Object.getOwnPropertyNames(testData).forEach((testName: string) => {
    let actionTypes = EventTypes[testName].config.actionTypes

    if (!actionTypes || actionTypes.length < 1) {
      actionTypes = ["none"]
    }
    actionTypes.forEach((actionType) => {
      if (testData[testName].testEvents[actionType]) {
        testEventsSets = testEventsSets.concat(
          testData[testName].testEvents[actionType]
        )
      }
    })
  })
  return testEventsSets
})

describe("groupEventPropSets", () => {
  let { propSets, events } = testData.PushEvent.testEvents.multiple[0]

  it("should group propsets that share everything but the same subject", () => {
    let eventPropSets = getEventsPropSets(events)
    let groupedEventPropSets = groupEventPropSets(eventPropSets)

    expect(groupedEventPropSets[0][0]).toEqual(propSets[0])
    expect(groupedEventPropSets[0][1]).toEqual(propSets[2])
    expect(groupedEventPropSets[1][0]).toEqual(propSets[1])
  })
})

describe("collectEventsByDate", () => {
  let eventPropSets = []
  beforeAll(() => {
    eventPropSets = testEventsSets.reduce(
      (acc, tes) => acc.concat(tes.propSets),
      []
    )
    return eventPropSets
  })

  it("should split the test events into the expected groups with default 7 day range", () => {
    let weekLength = 7
    let eventsByDateRange = collectEventsByDate(
      eventPropSets,
      new Date("1/1/1970"),
      weekLength
    )

    eventsByDateRange.forEach((ebdr, i) => {
      expect(ebdr.startDate).toBeDefined()
      if (i === eventsByDateRange.length - 1) {
        if (
          new Date().getTime() <
          ebdr.startDate.getTime() + 86400000 * weekLength
        ) {
          expect(ebdr.endDate).toBeNull()
        } else {
          expect(ebdr.endDate).toBeTruthy()
        }
      }
    })
    expect(eventsByDateRange.length).toBe(12)
  })

  it("should split the test events into the expected groups with 3 day range", () => {
    let weekLength = 3
    let eventsByDateRange = collectEventsByDate(
      eventPropSets,
      new Date("1/1/1970"),
      weekLength
    )

    eventsByDateRange.forEach((ebdr, i) => {
      console.log(
        i,
        ebdr.eventPropSets.map((eps) => eps.date)
      )
      expect(ebdr.startDate).toBeDefined()
      if (i === eventsByDateRange.length - 1) {
        if (
          new Date().getTime() <
          ebdr.startDate.getTime() + 86400000 * weekLength
        ) {
          expect(ebdr.endDate).toBeNull()
        } else {
          expect(ebdr.endDate).toBeTruthy()
        }
      }
    })
    console.log(eventsByDateRange)
    // expect(eventsByDateRange.length).toBe(12)
  })
})

describe("getSortedDatedEventCollections", () => {
  it("should return expected collections with default options", () => {
    let sdecs = getSortedDatedEventCollections(
      testEventsSets.reduce((acc, tes) => {
        return acc.concat(tes.events)
      }, []),
      _.omit(defaultNaiveConfig, [
        "md",
        "omitContent",
        "indentContent",
        "dateTimeFormatOptions",
      ])
    )

    sdecs.forEach((sdec) => {
      expect(
        [...sdec.eventPropSetGroups].sort(
          (a, b) => a[0].date.getTime() - b[0].date.getTime()
        )
      ).toStrictEqual(sdec.eventPropSetGroups)
    })

    console.log(sdecs)
    console.log(sdecs[0].eventPropSets)
    console.log(sdecs[0].eventPropSetGroups)

    expect(sdecs.length).toBe(12)
  })

  it("should return expected collections with 3-day date range", () => {
    let config = Object.assign(defaultNaiveConfig, { groupByDays: 3 })

    let sdecs = getSortedDatedEventCollections(
      testEventsSets.reduce((acc, tes) => {
        return acc.concat(tes.events)
      }, []),
      _.omit(config, [
        "md",
        "omitContent",
        "indentContent",
        "dateTimeFormatOptions",
      ])
    )

    console.log(sdecs)
    console.log(sdecs[0].eventPropSets)
    console.log(sdecs[0].eventPropSetGroups)
    console.log(sdecs[sdecs.length - 2].eventPropSetGroups)
    console.log(sdecs[sdecs.length - 1].eventPropSetGroups)
  })
})
