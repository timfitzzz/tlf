import { EntityProps, EventPropSet } from "./types"
import EventTypes, { GHEvent, GHEventPayloadIteree } from "./eventTypes"
import {
  EntityRef,
  GithubEventType,
  IndexedResultDef,
  resultDef,
} from "./eventTypes/helperTypes"
const _ = require("lodash")
import { LocaleOptions, DateTimeFormatOptions } from "luxon"

export function fixUrl(url: string): string | null {
  return url
    ? url
        .replace("api.", "")
        .replace("www.", "")
        .replace("/repos", "")
    : null
}

export function lookupActionType(
  event: GHEvent,
  iteree?: number
): string | string[] | null {
  const { actionPropPath, actionTypes, iterator } = EventTypes[
    event.type
  ].config

  if (iterator && actionTypes) {
    if (iteree) {
      return _.get(_.get(event, iterator)[iteree], [actionPropPath[1]])
    } else {
      let types: string[] = _.get(event, iterator).map(iteree =>
        _.get(iteree, actionPropPath[1])
      )
      // .reduce((acc, i) => (acc.indexOf(i) ? acc + i : acc), [])
      return types.length > 1 ? types : types[0]
    }
  } else if (actionPropPath) {
    return _.get(event, actionPropPath)
  } else {
    return null
  }
}

export function lookupActionTypes(
  event: GHEvent,
  itereeIdx?: number
): string[] | null {
  const { actionPropPath, actionTypes, iterator } = EventTypes[
    event.type
  ].config

  if (iterator && actionTypes) {
    if (itereeIdx) {
      // console.log(`got itereeIdx`)
      let iteree = _.get(event, iterator)[itereeIdx]
      // console.log(`got iteree: ${iteree}`)
      // console.log("getting path ", actionPropPath[1])
      return _.get(iteree, actionPropPath[1])
    } else {
      let types: string[] = _.get(event, iterator).map(iteree =>
        _.get(iteree, actionPropPath[1])
      )
      // .reduce((acc, i) => (acc.indexOf(i) ? acc + i : acc), [])
      return types
    }
  } else if (actionPropPath) {
    return [_.get(event, actionPropPath)]
  } else {
    return null
  }
}

export function getVerbs<K extends GHEvent>(
  event: K
  // eventType: EventTypeRequirement<K> = undefined,
  // iterantIndex: IterantIndexRequirement<K> = undefined
): string[] {
  const typeMetadata: GithubEventType = EventTypes[event.type]
  const {
    config: { iterator },
    paths,
  } = typeMetadata

  if (typeof paths.verb === "string") {
    if (iterator) {
      const iterations = _.get(event, iterator)
      return iterations.map(() => paths.verb)
    } else {
      return [paths.verb]
    }
  } else {
    return lookupActionTypes(event).map(type => paths.verb[type])
  }
}

export function getResultTexts(
  eventType: string,
  actionType?: string | null
): string | [string, string] {
  const resultSet: string | resultDef | IndexedResultDef =
    EventTypes[eventType].paths.result

  // console.log(resultSet)
  // console.log(EventTypes[eventType])
  if (typeof resultSet === "string") {
    return resultSet
  } else if (Array.isArray(resultSet)) {
    return resultSet
  } else if (actionType && resultSet[actionType]) {
    return resultSet[actionType]
  } else {
    return "item"
  }
}

export function getActorProps(event: GHEvent): { id: string; url: string } {
  // console.log("getting actor for ", event.type)
  // console.log(EventTypes[event.type])
  const actorPaths: GithubEventType["paths"]["actor"] =
    EventTypes[event.type].paths.actor
  // console.log(actorPaths)

  return {
    id: _.get(event, actorPaths.id),
    url: _.get(event, actorPaths.url).replace(
      "api.github.com/users",
      "github.com"
    ),
  }
}

// interface SubjectProps {
//   id: string
//   url: string
//   title: string
//   content: string
// }

// goal: produce property sets for each subject within an event
export function getSubjectPropSets(event: GHEvent): EntityProps[] {
  // console.log(event.type)
  // console.log(EventTypes[event.type])
  const subjectPaths: EntityRef | { [key: string]: EntityRef } =
    EventTypes[event.type].paths.subject
  const { iterator, actionTypes } = EventTypes[event.type].config

  let output: EntityProps[]

  if (subjectPaths) {
    if (iterator) {
      let subjects: GHEventPayloadIteree[] = _.get(event, iterator)
      // console.log(subjects)
      output = subjects.map((subject, i) => {
        // console.log(lookupActionTypes(event, i))
        return actionTypes && !subjectPaths.id
          ? pathsToProps(subject, subjectPaths[lookupActionTypes(event, i)[0]])
          : pathsToProps(subject, subjectPaths as EntityRef)
      })
    } else {
      output = [
        actionTypes && !subjectPaths.id
          ? pathsToProps(
              event,
              subjectPaths[lookupActionTypes(event)[0]] as EntityRef
            )
          : pathsToProps(event, subjectPaths as EntityRef),
      ]
    }
  }
  return output
}

function pathsToProps(obj: object, paths: EntityRef): EntityProps {
  // console.log(paths)
  // paths.id === "page_name" && console.log("processing obj: ", obj)
  // paths.id === "page_name" && console.log("getting paths ", paths)

  return {
    preposition: paths.preposition,
    id: _.get(obj, paths.id),
    url: fixUrl(_.get(obj, paths.url)),
    title: _.get(obj, paths.title),
    desc: _.get(obj, paths.desc) || paths.desc,
    content: _.get(obj, paths.content),
  }
}

export function getEntityProps(
  event: GHEvent,
  entityType: string
): EntityProps | EntityProps[] {
  const entityPaths: EntityRef | { [key: string]: EntityRef } =
    EventTypes[event.type].paths[entityType]

  // const { iterator } = EventTypes[event.type].config

  let output: EntityProps | EntityProps[]

  // console.log(entityPaths)

  if (entityPaths) {
    if (!entityPaths.id && entityPaths[lookupActionTypes(event)[0]]) {
      // for entities with multiple action types:
      // entityPaths = { [key: string]: EntityRef }
      output = pathsToProps(event, entityPaths[lookupActionTypes(event)[0]])
    } else {
      output = pathsToProps(event, entityPaths as EntityRef)
    }
  }

  // if (entityPaths) {
  //   // if the entity api is ["path", {}]
  //   if (Array.isArray(entityPaths)) {
  //     let entities = _.get(event, entityPaths[0]) // get the entities to iterate
  //     // let pathSet = entityPaths[1]
  //     output = entities.map(entity => ({
  //       preposition: entityPaths[1].preposition,
  //       id: _.get(entity, entityPaths[1].id),
  //       url: fixUrl(_.get(entity, entityPaths[1].url)),
  //       title: _.get(entity, entityPaths[1].title),
  //       desc: _.get(entity, entityPaths[1].desc) || entityPaths[1].desc,
  //       content: _.get(entity, entityPaths[1].content),
  //     }))
  //   } else
  // }
  return output
}

export function getEventPropSets(event: GHEvent): EventPropSet[] {
  let subjectPropSets = getSubjectPropSets(event)
  let subjectActionTypes = lookupActionTypes(event)
  let verbs = getVerbs(event)

  return subjectPropSets.map((subject, i) => {
    return {
      date: new Date(event.created_at),
      private: !event.public,
      verb: verbs[i],
      type: event.type,
      result: getResultTexts(
        event.type,
        subjectActionTypes ? subjectActionTypes[i] : undefined
      ),
      actionType: subjectActionTypes ? subjectActionTypes[i] : undefined,
      subject,
      actor: getActorProps(event),
      target: getEntityProps(event, "target") as EntityProps,
      parent: getEntityProps(event, "parent") as EntityProps,
    }
  })
}

export function getEventsPropSets(events: GHEvent[]): EventPropSet[] {
  return events.reduce((acc, event) => acc.concat(getEventPropSets(event)), [])
}

export interface NaiveConfig {
  sortBy: "date" | "actor" | "type" | "target" | "parent"
  collapse: boolean
  groupByDays?: number
  startDate?: Date
  md?: boolean
  omitContent?: boolean
  indentContent?: boolean
  dateTimeFormatOptions: LocaleOptions & DateTimeFormatOptions
}

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

export interface DatedEventCollection {
  startDate: Date
  endDate: Date
  eventPropSet: EventPropSet[]
}

export interface SortedDatedEventCollection {
  startDate: Date
  endDate: Date
  eventPropSetGroups: EventPropSet[][]
}

export type DatedEventCollections = DatedEventCollection[]
export type SortedDatedEventCollections = SortedDatedEventCollection[]

export function collectEventsByDate(
  evps: EventPropSet[],
  startDate: Date,
  days: number = 7
): DatedEventCollections {
  let collectionLengthMs = days * 86400000

  return evps
    .filter(evp => new Date(evp.date) > startDate)
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
          openCollection.eventPropSet.push(evp)
        } else {
          // close up a collection with something & start a new one,
          // or move start date of current (empty) collection until it includes this event
          if (openCollection.eventPropSet.length > 0) {
            openCollection.endDate = new Date(
              openCollection.startDate.getTime() + collectionLengthMs
            )

            collections.push({
              startDate: new Date(openCollection.endDate.getTime() + 1),
              endDate: null,
              eventPropSet: [evp],
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

            openCollection.eventPropSet.push(evp)
          }

          // start a new collection
        }
        return acc
      },
      {
        collections: [
          { startDate: startDate, endDate: null, eventPropSet: [] },
        ],
      }
    ).collections
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
    output = output.map(eventCollection => ({
      ...eventCollection,
      eventPropSetGroups: groupEventPropSets(eventCollection.eventPropSet),
    }))
  } else {
    output = output.map(eventCollection => ({
      ...eventCollection,
      eventPropSetGroups: eventCollection.eventPropSet.map(epset => [epset]),
    }))
  }

  if (sortBy && sortBy !== "date") {
    // should already be sorted by date
    output = output.map(refinedEventCollection => ({
      ...refinedEventCollection,
      eventPropSetGroups: refinedEventCollection.eventPropSetGroups.sort(
        (epsgroupA, epsgroupB) => epsgroupA[0][sortBy] - epsgroupB[0][sortBy]
      ),
    }))
  }

  return output
}
