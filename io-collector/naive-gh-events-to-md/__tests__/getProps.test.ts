import EventTypes from "../eventTypes"
import testData from "./testData"
import {
  fixUrl,
  getEntityProps,
  getActorProps,
  lookupActionTypes,
  getVerbs,
  getSubjectPropSets,
  getResultTexts,
  getEventPropSets,
  getEventsPropSets,
} from "../getProps"
import { TestEvent } from "../types"

describe("fixUrl", () => {
  it("should handle github user urls from the api and return correct web url", () => {
    expect(fixUrl("https://api.github.com/users/timfitzzz")).toBe(
      "https://github.com/timfitzzz"
    )
  })

  it("should handle repo urls from the api and return correct web url", () => {
    expect(fixUrl("https://api.github.com/repos/timfitzzz/nursefornyc")).toBe(
      "https://github.com/timfitzzz/nursefornyc"
    )
  })

  it("should handle bot url and correctly convert", () => {
    expect(fixUrl("https://api.github.com/users/vercel[bot]")).toBe(
      "https://github.com/apps/vercel"
    )
  })
})

Object.getOwnPropertyNames(testData).forEach((testName: string) => {
  let actionTypes = EventTypes[testName].config.actionTypes

  if (!actionTypes || actionTypes.length < 1) {
    actionTypes = ["none"]
  }

  actionTypes.forEach((actionType) => {
    describe(`getProps testData should exist for event type ${testName} and action type ${actionType}`, () => {
      expect(testData[testName].testEvents[actionType]).toBeDefined()
    })

    if (testData[testName].testEvents[actionType]) {
      let testEventsSets: TestEvent[] =
        testData[testName].testEvents[actionType]

      testEventsSets.forEach((testEventsSet) => {
        let { propSets, events } = testEventsSet

        const expectedActionTypes = propSets.map((ps) => ps.actionType)

        const expectedVerbs = propSets.map((ps) => ps.verb)

        describe("lookupActionTypes", () => {
          let foundActionTypes = []

          it(`should find action types ${expectedActionTypes} for test event set`, () => {
            events.forEach((e) => {
              foundActionTypes.concat(lookupActionTypes(e))
            })

            foundActionTypes.forEach((fat, i) => {
              expect(fat).toBe(expectedActionTypes[i])
            })
          })
        })

        describe("getVerbs", () => {
          const foundVerbs = events.reduce((acc, e) => {
            return acc.concat(getVerbs(e))
          }, [])

          it(`should find verbs for test ${testName} event matching test event set`, () => {
            expect(foundVerbs).toEqual(expectedVerbs)
          })
        })

        describe("getResultTexts", () => {
          let expectedResultTexts = expectedActionTypes.map((eat) =>
            getResultTexts(testName, eat)
          )
          let foundResultTexts = []

          it(`${testName}: should return correct result options for each action type`, () => {
            events.forEach((e) => {
              let actionTypes = lookupActionTypes(e)

              if (actionTypes) {
                actionTypes.forEach((at) => {
                  foundResultTexts.push(getResultTexts(testName, at))
                })
              } else {
                foundResultTexts.push(getResultTexts(testName))
              }
            })

            expect(expectedResultTexts).toStrictEqual(foundResultTexts)
          })
        })

        describe("getActorProps", () => {
          const expectedActorProps = propSets.map((p) => p.actor)

          it("should return correct actor props for each event", () => {
            events.forEach((e) => {
              let actorProps = getActorProps(e)

              expect(actorProps).toEqual(expectedActorProps[0])
              // there might be multiple prop sets for each event, but they
              // should all have the same actor.
            })
          })
        })

        describe("getSubjectPropSets", () => {
          const expectedSubjectPropSets = propSets.map((p) => p.subject)
          let foundSubjectPropSets = []

          it("should return correct subject props for each event", () => {
            events.forEach((e) => {
              foundSubjectPropSets = foundSubjectPropSets.concat(
                getSubjectPropSets(e)
              )
            })

            expect(foundSubjectPropSets).toEqual(expectedSubjectPropSets)
          })
        })

        describe("getEntityProps", () => {
          let entityTypes = ["target", "parent"]

          entityTypes.forEach((entType) => {
            if (EventTypes[testName].paths[entType]) {
              let expectedPropSets = propSets.map((p) => p[entType])
              let foundPropSets = []
              it(`${testName} should return the expected values for ${entType}`, () => {
                events.forEach((e) => {
                  let numberOfSetsInThisEvent: number = getSubjectPropSets(e)
                    .length
                  let actionTypes = lookupActionTypes(e)
                  for (let i = 0; i < numberOfSetsInThisEvent; i++) {
                    // there should be only one set of target or parent for each prop set
                    // produced by an event.... unless some are undefined.
                    if (actionTypes && actionTypes[i]) {
                      foundPropSets.push(
                        getEntityProps(e, entType, actionTypes[i])
                      )
                    } else {
                      foundPropSets.push(getEntityProps(e, entType))
                    }
                  }
                })
                expect(foundPropSets).toEqual(expectedPropSets)
              })
            }
          })
        })

        describe("getEventPropSets", () => {
          let expectedEventPropSets = propSets
          let foundEventPropSets = []

          events.forEach((e) => {
            foundEventPropSets = foundEventPropSets.concat(getEventPropSets(e))
          })

          expect(foundEventPropSets).toEqual(expectedEventPropSets)
        })

        describe("getEventsPropSets", () => {
          let expectedEventsPropSets = propSets
          let foundEventsPropSets = getEventsPropSets(events)

          expect(foundEventsPropSets).toStrictEqual(expectedEventsPropSets)
        })
      })
    }
  })
})
