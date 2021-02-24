// import {
//   entityRef,
//   getActorVerbText,
//   getEntityText,
//   getEventSummary,
//   getResult,
//   getVerb,
// } from "../eventPaths"
import { entityProps, GithubEvent } from "../types"
import EventTypes from "../eventTypes"
import { entityRef } from "../eventTypes/helperTypes"
import testData from "./testData"
import {
  getActorVerbText,
  getEntityText,
  getEventSummary,
  getResult,
  getVerb,
} from "../getText"
import { getEntityProps, getActorProps } from "../getProps"

Object.getOwnPropertyNames(EventTypes).map(eventType => {
  describe(`Event type definition for ${eventType}`, () => {
    it("has paths and config defined", () => {
      expect(EventTypes[eventType].paths).not.toBeUndefined()
      expect(EventTypes[eventType].paths).not.toBeNull()
      expect(EventTypes[eventType].config).not.toBeUndefined()
      expect(EventTypes[eventType].config).not.toBeNull()
    })
  })

  describe(`Event type testing data for ${eventType}`, () => {
    it("exists", () => {
      expect(testData[eventType]).toBeDefined()
    })
  })

  // setup
  //
  // VARS
  //
  // entityRoles is a list of strings so we can iterate through possible
  // complex properties on the event object
  const entityRoles = ["subject", "target", "parent"]
  //
  // paths is the defined set of meaningful value paths on the event
  const paths = EventTypes[eventType].paths
  //
  // get config for this event type:
  // -- actionTypes:
  //      list of possible action types for this event type.
  // -- actionPropPath:
  //      the path to the prop indicating action type. this can be an array if
  //      there is an iterator -- arr[1] is the path within the iterated object.
  // -- iterator:
  //      if there are multiple subjects in one event, such as a list of
  //      commits, this is the path to the array containing these subjects.
  let { actionTypes = [], actionPropPath, iterator } = EventTypes[
    eventType
  ].config

  // AGENDA
  //
  // Our list of cases to test for this event type consists of:
  // -- each action type, if any
  // -- an event with multiple subjects, if there's an iterator
  // -- a single event, if there is neither
  //
  // These are defined in the testStrings property of the testData object
  // for each event type.
  //
  // Let's shoehorn all three conditions into the existing (but possibly blank)
  // actionTypes array.
  //
  if (iterator) {
    actionTypes.push("multiple")
  }
  if (actionTypes.length === 0) {
    actionTypes.push("none")
  }
  //
  // For each of these cases, we will:
  // -- validate that the event paths defined for each event are correct
  // -- ensure that all test data needed for each event type exists
  // -- test string (plaintext and markdown) generation

  console.log(testData[eventType])

  if (testData[eventType]) {
    actionTypes.forEach(actionType => {
      console.log(eventType)
      const testEvents = testData[eventType].testEvents
      let testDatums: { testStrings: any; event: GithubEvent }[] =
        actionType === "none" ? testEvents : testEvents[actionType]

      describe("Scenario data", () => {
        it(`should exist for event type ${eventType} and action type ${actionType}`, () => {
          expect(testDatums).toBeDefined()
        })
      })

      if (testDatums) {
        testDatums.forEach((testDatum, datumIndex) => {
          const { testStrings, event } = testDatum

          describe(`Scenario: Event type ${eventType}, action type ${actionType}, testEvent ${datumIndex}`, () => {
            describe(`event deconstruction`, () => {
              describe("event actor", () => {
                const actor = getActorProps(event)

                it("should have an actor id", () => {
                  expect(actor.id).not.toBeUndefined()
                  expect(actor.id).not.toBeNull()
                })

                it("should have a url that matches expected scheme", () => {
                  expect(actor.url).not.toBeUndefined()
                  expect(actor.url).not.toBeNull()
                  if (actor.url.indexOf("github.com/apps") === -1) {
                    expect(actor.url).toEqual(`https://github.com/${actor.id}`)
                  } else {
                    expect(actor.url).toContain(`https://github.com/apps`)
                  }
                })
              })

              describe("event verb", () => {
                const verb = getVerb(event)

                it("should exist", () => {
                  expect(verb).not.toBeUndefined()
                  expect(verb).not.toBeNull()
                })
              })

              describe("event result noun", () => {
                const singleResult = getResult(event)
                const pluralResult = getResult(event, true)

                it("should exist for both single and plural forms", () => {
                  expect(singleResult).not.toBeNull()
                  expect(pluralResult).not.toBeUndefined()
                })
              })

              describe("entity properties", () => {
                entityRoles
                  .filter(role => !!paths[role])
                  .forEach(entityRole => {
                    describe(`it should return props for all ${entityRole} properties defined in eventPaths`, () => {
                      let rolePaths: entityRef
                      let rolePathProps: string[] = []

                      if (Array.isArray(paths[entityRole])) {
                        rolePaths = paths[entityRole][1]
                        rolePathProps = Object.getOwnPropertyNames(rolePaths)

                        let entityPropSets: entityProps[] = getEntityProps(
                          event,
                          entityRole
                        ) as entityProps[]

                        entityPropSets.forEach((entityPropSet, key) => {
                          rolePathProps.forEach(rolePathProp => {
                            it(`returns a ${rolePathProp} prop for set '${key}`, () => {
                              expect(entityPropSet[rolePathProp]).not.toBeNull()
                              expect(
                                entityPropSet[rolePathProp]
                              ).not.toBeUndefined()
                            })
                          })
                        })
                      } else if (!paths[entityRole].id) {
                        rolePaths = paths[entityRole][event.payload.action]
                        if (rolePaths) {
                          rolePathProps = Object.getOwnPropertyNames(rolePaths)

                          let entityPropSet = getEntityProps(event, entityRole)
                          rolePathProps.forEach(rolePathProp => {
                            it(`returns a ${rolePathProp} prop`, () => {
                              expect(entityPropSet[rolePathProp]).not.toBeNull()
                              expect(
                                entityPropSet[rolePathProp]
                              ).not.toBeUndefined()
                            })
                          })
                        }
                      } else {
                        rolePaths = paths[entityRole]
                        rolePathProps = Object.getOwnPropertyNames(rolePaths)

                        let entityPropSet = getEntityProps(event, entityRole)
                        rolePathProps.forEach(rolePathProp => {
                          it(`returns a ${rolePathProp} prop`, () => {
                            expect(entityPropSet[rolePathProp]).not.toBeNull()
                            expect(
                              entityPropSet[rolePathProp]
                            ).not.toBeUndefined()
                          })
                        })
                      }
                    })
                  })
              })
            })

            describe(`language generation`, () => {
              // // let paths = eventPaths[event.type]

              // let { actionTypes = [], iterator } = EventTypes[event.type].config

              // // if there's multiple action types, we'll run through this looking to
              // // test an event of each type.
              // //
              // // if there's an iterator, "multiple" is one of the sets of testStrings
              // // that should exist.

              // if (iterator) { actionTypes.push('multiple') }
              // if (actionTypes.length === 0) { actionTypes.push('none') }

              // actionTypes.forEach(actionType => {

              // if (actionType === 'none') {
              //   selectedTestStrings = testStrings
              // } else {
              //   selectedTestStrings = testStrings[actionType]
              // }

              function isDefined(prop) {
                return !!(
                  testStrings &&
                  testStrings[prop] &&
                  testStrings[prop].plain &&
                  testStrings[prop].md
                )
              }

              describe(`actor-verb generator`, () => {
                it("should have actor-verb test strings defined", () => {
                  expect(isDefined("actor")).toBe(true)
                })

                if (isDefined("actor")) {
                  it("should return the correct strings in both plain and md formats", () => {
                    expect(getActorVerbText(event)).toEqual(
                      testStrings.actor.plain
                    )
                    expect(getActorVerbText(event, { md: true })).toEqual(
                      testStrings.actor.md
                    )
                  })
                }
              })

              // console.log(getEntityText(event, "subject"))

              describe(`${event.type} entity text generator`, () => {
                entityRoles
                  .filter(role => !!paths[role]) // only test roles actually defined for this entity
                  .forEach(role => {
                    it(`should have test strings defined for ${role} entity`, () => {
                      expect(isDefined(role)).toBe(true)
                    })

                    if (isDefined(role)) {
                      describe(`${event.type} ${role} text generator`, () => {
                        describe("plaintext output", () => {
                          let plaintext: string[][] = getEntityText(event, role)

                          plaintext.forEach((set, i) => {
                            // console.log(set)
                            let [summary, ...content] = set
                            describe(`the summary text for item ${i}`, () => {
                              it("should match expected text", () => {
                                expect(summary).toEqual(
                                  testStrings[role]["plain"][i][0]
                                )
                              })
                            })

                            if (content && content.length > 0) {
                              if (Array.isArray(content)) {
                                content.forEach((contentLine, j) => {
                                  describe(`the content line ${j}`, () => {
                                    it("should match expected text", () => {
                                      expect(contentLine).toEqual(
                                        testStrings[role]["plain"][i][j + 1]
                                      )
                                    })
                                  })
                                })
                              } else {
                                describe(`the content line 1`, () => {
                                  it("should match expected text", () => {
                                    expect(content).toEqual(
                                      testStrings[role]["plain"][i][1]
                                    )
                                  })
                                })
                              }
                            }
                          })
                        })

                        describe("markdown output", () => {
                          let md: string[][] = getEntityText(event, role, {
                            md: true,
                          })

                          md.forEach((set, i) => {
                            let [summary, ...content] = set
                            describe(`the summary text for item ${i}`, () => {
                              it("should match expected text", () => {
                                expect(summary).toEqual(
                                  testStrings[role]["md"][i][0]
                                )
                              })
                            })

                            if (content && content.length > 0) {
                              if (Array.isArray(content)) {
                                content.forEach((contentLine, j) => {
                                  describe(`the content line ${j}`, () => {
                                    it("should match expected text", () => {
                                      expect(contentLine).toEqual(
                                        testStrings[role]["md"][i][j + 1]
                                      )
                                    })
                                  })
                                })
                              } else {
                                describe(`the content line 1`, () => {
                                  it("should match expected text", () => {
                                    expect(content).toEqual(
                                      testStrings[role]["md"][i][1]
                                    )
                                  })
                                })
                              }
                            }
                          })
                        })
                      })
                    }
                  })
              })

              describe("event summary line generation", () => {
                it("should have test strings defined for the plaintext summary", () => {
                  expect(testStrings.summary.plain).toBeDefined()
                })

                if (testStrings.summary.plain) {
                  it("should generate the expected plaintext summary for the event", () => {
                    let summary = getEventSummary(event, { md: false })
                    expect(summary).toEqual(testStrings.summary.plain)
                  })
                }

                it("should have test strings defined for the markdown summary", () => {
                  expect(testStrings.summary.md).toBeDefined()
                })

                if (testStrings.summary.md) {
                  it("should generate the expected md summary for the event", () => {
                    let summary = getEventSummary(event, { md: true })
                    expect(summary).toEqual(testStrings.summary.md)
                  })
                }
              })
            })
          })
        })
      }
    })
  }
})

// const timTestEvents = JSON.parse(
//   fs.readFileSync(__dirname + "/testEventsData.json")
// )

// const getTestEventsForGithub = require(__dirname + "/getTestEventsForGithub.ts")
//   .default

// let eventSubjectProps = getEntityProps(timTestEvents[0], "subject")
// let eventTargetProps = getEntityProps(timTestEvents[0], "target")
// let eventParentProps = getEntityProps(timTestEvents[0], "parent")

// console.log(eventSubjectProps)
// console.log(eventTargetProps)
// console.log(eventParentProps)
// let eventTypes = Object.getOwnPropertyNames(eventPaths)
// let retrievedTypes = fs.readdirSync(__dirname + "/ghevents/").map(fileName => {
//   return fileName.split(".")[0]
// })
