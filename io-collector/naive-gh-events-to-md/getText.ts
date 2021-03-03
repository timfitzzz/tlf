import { DateTimeFormatOptions, DateTime } from "luxon"
import { GHEvent } from "./eventTypes"
import {
  getActorProps,
  getVerbs,
  NaiveConfig,
  getSortedDatedEventCollections,
} from "./getProps"
import { EntityProps, EventPropSet } from "./types"

// type EventTypeRequirement<T> = T extends GHEventPayloadIteree
//   ? string
//   : undefined
// type IterantIndexRequirement<T> = T extends GHEventPayloadIteree
//   ? number
//   : undefined

// export function getVerb<K extends GHEvent | GHEventPayloadIteree = GHEvent>(
//   iterant: K,
//   eventType: EventTypeRequirement<K> = undefined,
//   iterantIndex: IterantIndexRequirement<K> = undefined
// ): string {
//   const typeMetadata: GithubEventType = eventType
//     ? EventTypes[eventType as string]
//     : EventTypes[(iterant as GHEvent).type]
//   const { paths } = typeMetadata

//   if (typeof paths.verb === "string") {
//     return paths.verb
//   } else {
//     // lookupActionType should always get an iterant index if the
//     // iterant is a GHEventPayloadIteree.
//     // so, it should always return a string
//     const actionTypeSlug: string = lookupActionType(
//       iterant as GHEvent,
//       iterantIndex ? iterantIndex : undefined
//     ) as string

//     return paths[actionTypeSlug]
//   }
// }

// export function getVerb(event: GithubEvent): string {
//   const verbPaths: string | iteratorMap = EventTypes[event.type].paths.verb

//   let actionType: string | string[] = lookupActionType(event)

//   if (typeof verbPaths === "string") {
//     const possibleResult = _.get(event, verbPaths)
//     return possibleResult || verbPaths
//   } else if (Array.isArray(verbPaths)) {
//     const verbKey = verbPaths[0]
//     const verbKeyValue = _.get(event, verbKey)

//     if (verbPaths[1][verbKeyValue]) {
//       return verbPaths[1][verbKeyValue]
//     } else {
//       return verbKeyValue
//     }
//   }
// }

// export function getResult(event: GHEvent, number: number = 1): string {
//   const resultSet: string | resultDef | IndexedResultDef =
//     EventTypes[event.type].paths.result

//   let actionType: string | string[] = lookupActionType(event)
//   if (Array.isArray(actionType)) {
//     actionType = actionType[0]
//   }

//   if (typeof resultSet === "string") {
//     return resultSet
//   } else if (Array.isArray(resultSet)) {
//     return number > 1 ? number + resultSet[1] : resultSet[0]
//   } else if (actionType) {
//     return number > 1 ? resultSet[actionType][1] : resultSet[actionType][0]
//   }
// }

// export function renderResultText(eventType: string, actionType: string | null, number: number = 1): string {
//   const resultSet: string | resultDef | IndexedResultDef =
//     EventTypes[eventType].paths.result

//   if (typeof resultSet === "string") {
//     return resultSet
//   } else if (Array.isArray(resultSet)) {
//     return number > 1 ? number + resultSet[1] : resultSet[0]
//   } else if (actionType && Array.isArray(resultSet[actionType])) {
//     return number > 1 ? resultSet[actionType][1] : resultSet[actionType][0]
//   } else if (actionType && typeof resultSet[actionType] === 'string') {
//     return resultSet[actionType] as string
//   }
// }

// export function getResult(event: GHEvent, plural: boolean = false): string {
//   const resultSet: string | resultDef | IndexedResultDef =
//     EventTypes[event.type].paths.result

//   let actionType: string | string[] = lookupActionType(event)

//   if (typeof resultSet === "string") {
//     return resultSet
//   } else if (Array.isArray(resultSet)) {
//     return plural ? resultSet[1] : resultSet[0]
//   } else if (actionType && !Array.isArray(actionType)) {
//     return plural ? resultSet[actionType][1] : resultSet[actionType][0]
//   } else if (actionType && Array.isArray(actionType)) {
//     return actionType
//       .map(type => (plural ? resultSet[type][1] : resultSet[type][0]))
//       .join(", ")
//   }
// }

// // getEntityText returns an array of arrays.
// // each array[n] has the following structure:
// // array[n][0] is the main markdown or text segment
// // array[n][1 - n] contain any associated content props in plaintext
// // (if md formatting for content is desired that can be performed in a separate step)
// export function getSubjectText(subject: EntityProps): string {

// }

function processPropSet(set: Partial<EntityProps> = {}, { md }: { md: boolean} = { md: false }) {
  let { id, url, desc, preposition, title } = set
  let space = " "

  let titleString = md
    ? title || desc || id || ""
    : title || desc
    ? title || desc + (id ? " (" + id + ")" : "")
    : id || ""
  // prettier-ignore
  return "" + // make sure at least an empty string is returned
    (preposition ? preposition + space : "") + // preposition
    ((desc && title) ? desc + space : "") + // if both desc and title, desc
    (md && url ? "[" : "") + // open link if md and url
    titleString + // title, or desc, or id
    (md && url ? "]" : "") + // close link if md and url
      (md && url ? `(${url})` : "") // url if md and url
}

// function renderEventPropertySet(set: EntityProps, { md }: { md: boolean} = { md: false }) {
//   let { id, url, desc, preposition, title } = set
//   let space = " "

//   let titleString = md
//     ? title || desc || id || ""
//     : title || desc
//     ? title || desc + (id ? " (" + id + ")" : "")
//     : id || ""
//   // prettier-ignore
//   return "" + // make sure at least an empty string is returned
//     (preposition ? preposition + space : "") + // preposition
//     ((desc && title) ? desc + space : "") + // if both desc and title, desc
//     (md && url ? "[" : "") + // open link if md and url
//     titleString + // title, or desc, or id
//     (md && url ? "]" : "") + // close link if md and url
//       (md && url ? `(${url})` : "") // url if md and url
// }




// export function getEntityText(
//   EntityProps: EntityProps,
//   { md }: { md: boolean } = { md: false }
// ): string[][] {

//   if (Array.isArray(EntityProps)) {
//     return [
//       ...EntityProps.map((propSet: EntityProps) => processPropSet(propSet, { md })),
//     ]
//   } else {
//     return [processPropSet(EntityProps, { md })]
//   }
// }

export function renderActorText(
  ActorProps: EventPropSet["actor"],
  { md }: { md: boolean } = { md: false }
): string {
  let { id, url } = ActorProps
  return `${md ? "[" : ""}${id}${md ? "](" + url + ")" : ""}`
}


export function getActorText(
  event: GHEvent,
  { md }: { md: boolean } = { md: false }
): string {
  let { id, url } = getActorProps(event)
  return `${md ? "[" : ""}${id}${md ? "](" + url + ")" : ""}`
}


export function renderVerbText(verb: EventPropSet["verb"]): string {
  return verb
}

export function getActorVerbText(
  event: GHEvent,
  { md }: { md: boolean } = { md: false }
): string | string[] {
  let actorText = getActorText(event, { md })
  let verbs = getVerbs(event)

  if (verbs.length > 1) {
    return verbs.map(verb => `${actorText} ${verb}`)
  } else {
    let verb = verbs[0]
    return `${actorText} ${verb}`
  }
}

// export function getResultSubjectText(event: GithubEvent, { md, plural }: { md: boolean, plural: boolean } = { md: false, plural: false }) {
//   let result = getResult(event, plural ? true : false)

// }
// export function getEntityText(event: GithubEvent, type: string, { mdx }: { mdx: boolean }): string {

//   let EntityProps = getEntityProps(event, type)

// }

export function isEntityPlural(entityText: string[][]): boolean {
  return (
    entityText.length > 1 || entityText.filter(i => i.length > 2).length > 0
  )
}

export function joinEntitySummaries(entityText: string[][]): string {
  return entityText.map(item => item[0]).join(", ")
}

// export function getEventTexts(
//   event: GithubEvent,
//   { md }: { md: boolean } = { md: false }
// ): string {
//   let actorVerbText: string | string[] = getActorVerbText(event, { md })
//   let subjectTexts: string[][] = getEntityText(event, "subject", { md })
//   let targetTexts: string[][] = getEntityText(event, "target", { md })
//   let parentTexts: string[][] = getEntityText(event, "parent", { md })

//   if (!(typeof actorVerbText === "string")) {
//     // if actor/verb text is a string, there's only one subject set.
//     // if it's not, then there's more than one.
//     return {

//     }

//   }
// }

// export function renderEventPropSet(event: EventPropertySet) {

//   const { date, private, type, actionType, subject, actor, target, parent} = event

//   return {
//     date: renderDate(date),
//     private: private ? "👁" : "",

//   }

// }

// export function getEventSummary(
//   eventProps: EventPropertySet,
//   { md }: { md: boolean } = { md: false }
// ): string {
//   let subjectTexts = getEntityText(eventProps.subject, { md })
//   let subject = joinEntitySummaries(subjectTexts)
//   let target = joinEntitySummaries(getEntityText(event, "target", { md }))
//   let parent = joinEntitySummaries(getEntityText(event, "parent", { md }))

//   return (
//     getActorVerbText(event, { md }) +
//     " " +
//     getResult(event) +
//     (subject && subject.length > 0 ? " " + subject : "") +
//     (target && target.length > 0 ? " " + target : "") +
//     (parent && parent.length > 0 ? " " + parent : "")
//   )
// }


export type RenderedSubjectAndContent = [ subject: string, content: string ]
export type RenderedEventPropSetText = [ summary: string, ...content: string[] ]
export type RenderedEventsTextSet = [ dates: string[], summary: string, ...content: string[] ]
export interface RenderedEventPropSet {
  date: string
  actor: string,
  verb: string,
  subject: string,
  content: string,
  target: string,
  parent: string
}

export function renderEntityText(
  EntityProps: EntityProps,
  { md }: { md: boolean } = { md: false }
): string {
  return processPropSet(EntityProps, { md })
}

export const renderSubject = (
  subjectProps: EventPropSet["subject"],
  { md }: { md: boolean } = { md: false }
): RenderedSubjectAndContent => [renderEntityText(subjectProps, { md }), subjectProps.content]

export function getRenderedEventPropSet(
  eventProps: EventPropSet,
  { md, dateTimeFormatOptions }: { md: boolean, dateTimeFormatOptions: DateTimeFormatOptions } = { md: false, dateTimeFormatOptions: DateTime.DATE_FULL }
): RenderedEventPropSet {
  let date = renderDate(eventProps.date, dateTimeFormatOptions) // make the format a config option
  let actor = renderActorText(eventProps.actor, { md })
  let verb = renderVerbText(eventProps.verb)
  let subject = renderSubject(eventProps.subject, { md })
  let target = renderEntityText(eventProps.target, { md })
  let parent = renderEntityText(eventProps.parent, { md })

  return {
    date,
    actor,
    verb,
    subject: subject[0],
    content: subject[1],
    target,
    parent
  }
}

export function renderDate(date: Date, formatOptions: DateTimeFormatOptions): string {
  return DateTime.fromJSDate(date).toLocaleString(formatOptions)
}

export function renderDatedContent(
  content: string,
  date: string,
  url: string,
  title: string,
  { md }: { md: boolean } = { md: false }
): string {
  return title ? date : '' +
         md ? '[' : '' + 
         title ? title : date +
         md ? '](' + url + '): ' : ': ' +
         content
}

export function renderEventPropSetGroup(
  eventPropSets: EventPropSet[],
  { md, dateTimeFormatOptions }: { md: boolean, dateTimeFormatOptions: DateTimeFormatOptions } = { md: false, dateTimeFormatOptions: DateTime.DATE_FULL }
): RenderedEventsTextSet {
  let output: RenderedEventsTextSet = [[], undefined, undefined]

  let renderedSets = eventPropSets.map(eps => {
    // console.log(eps);
    return getRenderedEventPropSet(eps, { md, dateTimeFormatOptions })
    
  })

  // console.log(renderedSets)

  renderedSets.forEach((reps, i) => {

    let { subject: { url, title }, result } = eventPropSets[i]
    
    output[0].push(reps.date)
    
    if (i === 0) {

      const summaryString = `${reps.actor} ${reps.verb} ${typeof result === 'string' ? result : eventPropSets.length > 1 ? result[1] : result[0]} ${eventPropSets.length > 1 ? '' : (reps.subject + " ")}${reps.target ? reps.target + (reps.parent ? " " :  '') : ''}${reps.parent ? reps.parent : ''}`

      output[1] = summaryString
      // console.log(summaryString)
    }
    // console.log(
    //   reps, output, i, url, title, result
    // )

    if (reps.content) {
      output.push(renderDatedContent(reps.content, reps.date, url ? url : null, title ? title : null, { md }))
    }
  })

  return output

}

// export function collapseRenderedEventPropSets(
//   eventPropSets: RenderedEventPropSet[],
//   type: string,
//   actionType: string,
//   quantity: number
// ): RenderedEventsTextSet[] {

//   if (eventPropSets.length < 2) {
//     return
//   }

// }

export interface RenderedEventCollections {
  startDate: string
  endDate: string
  renderedEventCollections: RenderedEventCollection[]
}
export type RenderedEventCollection = string

export function renderEvents(
  events: GHEvent[],
  options: NaiveConfig = {
    sortBy: 'date',
    groupByDays: 7,
    collapse: true,
    md: true,
    startDate: new Date(1/1/1970),
    omitContent: false,
    indentContent: true,
    dateTimeFormatOptions: DateTime.DATE_FULL
  }
): RenderedEventCollections[] {

  const { md, dateTimeFormatOptions } = options

  let eventPropSetGroupCollection = getSortedDatedEventCollections(events, options)

  return eventPropSetGroupCollection.map(({ startDate, endDate, eventPropSetGroups }) => {
    return {
      startDate: typeof startDate === 'string' ? startDate : startDate ? renderDate(startDate, options.dateTimeFormatOptions) : '',
      endDate: typeof endDate === 'string' ? endDate : endDate ? renderDate(endDate, options.dateTimeFormatOptions) : '',
      renderedEventCollections: eventPropSetGroups ? eventPropSetGroups.map(epsg => renderEventPropSetGroup(epsg, { md, dateTimeFormatOptions}).join('\r\n')) : []
    }
  })
}