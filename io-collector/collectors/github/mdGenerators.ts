// import { GithubEvent } from "./types"
// import { eventPaths, EntityRef } from "./eventPaths"
// import _ from "lodash"

// export function getActorMd(event: GithubEvent) {
//   const { actor } = eventPaths[event.type]

//   return `[${actor.id}](https://github.com/${actor.url})`
// }

// // export function getVerbMd(event: GithubEvent): string {
// //   const { verb } = eventPaths[event.type]
// //   let output: string = ``
// //   if (Array.isArray(verb)) {
// //     verb.forEach((pvr: propValResult) => {
// //       if (_.get(event, pvr[0]) === pvr[1] || null) {
// //         output = pvr[2]
// //       }
// //     })
// //   } else {
// //     output = verb
// //   }
// //   return output
// // }

// export function getResultMd(event: GithubEvent, p?: boolean): string {
//   const { result } = eventPaths[event.type]

//   if (Array.isArray(result)) {
//     if (typeof result[1] === "object") {
//       let resultIndex = _.get(event, result[0])
//       return `${p ? result[1][resultIndex][1] : result[1][resultIndex][0]}`
//     } else {
//       return `${result[0]}${p && result[1]}`
//     }
//   } else {
//     return `${_.get(event, result)}`
//   }
// }

// export function getEntityMd(
//   event: GithubEvent,
//   entityType: string
// ): string | string[] {
//   const entityPaths:
//     | EntityRef
//     | { [key: string]: EntityRef }
//     | [string, EntityRef] = eventPaths[event.type][entityType]
//   let { id, url, desc, title, preposition }: Partial<EntityRef> = {}

//   // for entities with multiple items,
//   // entityPaths = ['property to iterate', EntityRef]
//   if (Array.isArray(entityPaths)) {
//     let entities = _.get(event, entityPaths[0]) // get the entities to iterate
//     desc = entityPaths[1].desc // get the entityPaths
//     preposition = entityPaths[1].preposition
//     id = entityPaths[1].id
//     url = entityPaths[1].url
//     title = entityPaths[1].title
//     // return brief md
//     return entities.map(entity => {
//       return `[${_.get(entity, id)}](${_.get(entity, url)}})${
//         entity.title ? entity.title : entity.id
//       }]`
//     })
//   } else if (!entityPaths.id) {
//     id = entityPaths[event.payload.action].id
//     url = entityPaths[event.payload.action].url
//     desc = entityPaths[event.payload.action].desc
//     title = entityPaths[event.payload.action].title
//     preposition = entityPaths[event.payload.action].preposition
//   } else {
//     id = entityPaths.id as string
//     url = entityPaths.url as string
//     desc = entityPaths.desc as string
//     title = entityPaths.title as string
//     preposition = entityPaths.preposition as string
//   }
//   const name: string = title || id

//   return `${preposition && preposition + " "}${desc && desc + " "}[${_.get(
//     event,
//     name
//   )}](${_.get(event, url)})`
// }

// export function getBriefIteratorMds(
//   entityPath: EntityRef,
//   iterator: any
// ): string[] {
//   const { id, url, title } = entityPath

//   return iterator.map(
//     iteration =>
//       `[${_.get(iteration, id)}](${_.get(iteration, url)}): ${_.get(
//         iteration,
//         title
//       )}`
//   )
// }

// export function getBriefEntityMd(
//   event: GithubEvent,
//   entityType: string
// ): string {
//   const entityPaths: EntityRef | { [key: string]: EntityRef } =
//     eventPaths[event.type][entityType]
//   let { id, url, title }: Partial<EntityRef> = {}

//   if (!entityPaths.id) {
//     id = entityPaths[event.payload.action].id
//     url = entityPaths[event.payload.action].url
//     title = entityPaths[event.payload.action].title
//   } else {
//     id = entityPaths.id as string
//     url = entityPaths.url as string
//     title = entityPaths.title as string
//   }
//   const name: string = title || id

//   return `[${_.get(event, id)}](${_.get(event, url)})${name &&
//     ": " + _.get(event, name)}`
// }

// // export function hasContent(event: GithubEvent): boolean {
// //   return !!(eventPaths[event.type].content)
// // }

// // export function getContentMd(event: GithubEvent) {

// //   const { content } = eventPaths[event.type]

// //   if (typeof content === 'object') {
// //     return `${content[event.payload.action]}`
// //   } else {
// //     return `${content}`
// //   }

// // }

// // export function getActorVerbResultMd(event: GithubEvent): string {

// //   return `${getActorMd(event)} ${getVerbMd(event)} ${getResultMd(event)}`

// // }
