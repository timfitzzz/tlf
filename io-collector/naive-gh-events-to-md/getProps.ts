import { EntityProps, EventPropSet } from "./types"
import EventTypes, { GHEvent, GHEventPayloadIteree } from "./eventTypes"
import {
  EntityRef,
  GithubEventType,
  IndexedResultDef,
  resultDef,
} from "./eventTypes/helperTypes"
const _ = require("lodash")

export function fixUrl(url: string): string | null {
  if (url.indexOf("[bot]") !== -1) {
    url = url.replace("[bot]", "").replace("/users", "/apps")
  }

  return url
    ? url
        .replace("api.", "")
        .replace("www.", "")
        .replace("/repos", "")
        .replace("/users", "")
    : null
}

// export function lookupActionType(
//   event: GHEvent,
//   iteree?: number
// ): string | string[] | null {
//   const { actionPropPath, actionTypes, iterator } = EventTypes[
//     event.type
//   ].config

//   if (iterator && actionTypes) {
//     if (iteree) {
//       return _.get(_.get(event, iterator)[iteree], [actionPropPath[1]])
//     } else {
//       let types: string[] = _.get(event, iterator).map(iteree =>
//         _.get(iteree, actionPropPath[1])
//       )
//       // .reduce((acc, i) => (acc.indexOf(i) ? acc + i : acc), [])
//       return types.length > 1 ? types : types[0]
//     }
//   } else if (actionPropPath) {
//     return _.get(event, actionPropPath)
//   } else {
//     return null
//   }
// }

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
      // console.log(_.get(iteree, actionPropPath[1]))
      let output = [_.get(iteree, actionPropPath[1])]
      return output
    } else {
      let types: string[] = _.get(event, iterator).map((iteree) =>
        _.get(iteree, actionPropPath[1])
      )
      // console.log(types)
      // .reduce((acc, i) => (acc.indexOf(i) ? acc + i : acc), [])
      return types
    }
  } else if (actionPropPath) {
    // console.log(_.get(event, actionPropPath))
    return [_.get(event, actionPropPath)]
  } else {
    // console.log("actionTypes === null")
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
    return lookupActionTypes(event).map((type) => paths.verb[type])
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

function pathsToProps(obj: object, paths: EntityRef): EntityProps {
  // console.log(paths)
  // paths.id === "page_name" && console.log("processing obj: ", obj)
  // paths.id === "page_name" && console.log("getting paths ", paths)
  return {
    preposition: paths.preposition,
    id: _.get(obj, paths.id) || paths.id,
    url: paths.url ? fixUrl(_.get(obj, paths.url)) : undefined,
    title: _.get(obj, paths.title),
    desc: _.get(obj, paths.desc) || paths.desc,
    content: _.get(obj, paths.content),
  }
}

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

export function getEntityProps(
  event: GHEvent,
  entityType: string,
  actionType?: string
): EntityProps {
  // console.dir(event.type + " " + entityType + " " + actionType)
  const entityPaths: EntityRef | { [key: string]: EntityRef } =
    EventTypes[event.type].paths[entityType]

  // const { iterator } = EventTypes[event.type].config

  let output: EntityProps | undefined

  if (entityPaths) {
    if (typeof entityPaths.id === "undefined") {
      if (entityPaths[actionType]) {
        // for entities with multiple action types:
        // entityPaths = { [key: string]: EntityRef }
        output = pathsToProps(event, entityPaths[actionType])
      } else {
        output = undefined
      }
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
  // console.log(event, entityPaths, entityType, actionType, output)
  return output
}

export function getEventPropSets(event: GHEvent): EventPropSet[] {
  let subjectPropSets = getSubjectPropSets(event)
  let subjectActionTypes = lookupActionTypes(event)
  let verbs = getVerbs(event)

  // console.dir(subjectActionTypes)

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
      target: getEntityProps(
        event,
        "target",
        subjectActionTypes ? subjectActionTypes[i] : undefined
      ) as EntityProps,
      parent: getEntityProps(
        event,
        "parent",
        subjectActionTypes ? subjectActionTypes[i] : undefined
      ) as EntityProps,
    }
  })
}

export function getEventsPropSets(events: GHEvent[]): EventPropSet[] {
  return events.reduce((acc, event) => acc.concat(getEventPropSets(event)), [])
}
