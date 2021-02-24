import { GithubEvent, entityProps } from "./types"
import EventTypes from "./eventTypes"
import { entityRef } from "./eventTypes/helperTypes"
import _ from "lodash"

export function fixUrl(url: string) {
  return url
    .replace("api.", "")
    .replace("www.", "")
    .replace("/repos", "")
}

export function getActorProps(event: GithubEvent): { id: string; url: string } {
  console.log("getting actor for ", event.type)
  console.log(EventTypes[event.type])
  const actorPaths = EventTypes[event.type].paths.actor
  console.log(actorPaths)

  return {
    id: _.get(event, actorPaths.id),
    url: _.get(event, actorPaths.url).replace(
      "api.github.com/users",
      "github.com"
    ),
  }
}

function pathsToProps(obj: object, paths: entityRef) {
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
  event: GithubEvent,
  entityType: string
): entityProps | entityProps[] {
  const entityPaths:
    | entityRef
    | { [key: string]: entityRef }
    | [string, entityRef] = EventTypes[event.type].paths[entityType]

  let output: entityProps | entityProps[]

  // console.log(entityPaths)

  if (entityPaths) {
    // if the entity api is ["path", {}]
    if (Array.isArray(entityPaths)) {
      let entities = _.get(event, entityPaths[0]) // get the entities to iterate
      // let pathSet = entityPaths[1]
      output = entities.map(entity => ({
        preposition: entityPaths[1].preposition,
        id: _.get(entity, entityPaths[1].id),
        url: fixUrl(_.get(entity, entityPaths[1].url)),
        title: _.get(entity, entityPaths[1].title),
        desc: _.get(entity, entityPaths[1].desc) || entityPaths[1].desc,
        content: _.get(entity, entityPaths[1].content),
      }))
    } else if (!entityPaths.id && entityPaths[event.payload.action]) {
      // for entities with multiple action types:
      // entityPaths = { [key: string]: entityRef }
      output = pathsToProps(event, entityPaths[event.payload.action])
    } else {
      let { id, url, desc, title, preposition, content } = entityPaths
      output = {
        id: _.get(event, id as string),
        url: _.get(event, url as string)
          ?.replace("api.", "")
          .replace("www.", "")
          .replace("/repos", ""),
        desc: _.get(event, desc as string) || (desc as string),
        title: _.get(event, title as string),
        preposition: preposition as string,
        content: _.get(event, content as string),
      }
    }
  }
  // for entities with multiple items,
  // entityPaths = ['property to iterate', entityRef]
  return output
}
