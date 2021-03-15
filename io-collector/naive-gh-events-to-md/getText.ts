import { DateTimeFormatOptions, DateTime } from "luxon"
import { GHEvent } from "./eventTypes"
import { getActorProps, getVerbs } from "./getProps"
import {
  defaultNaiveConfig,
  NaiveConfig,
  RenderedEventPropSet,
  RenderedSubjectAndContent,
} from "./types"
import {
  getSortedDatedEventCollections,
  SortedDatedEventCollections,
} from "./collectPropSets"
import { EntityProps, EventPropSet, RenderedEventsTextSet } from "./types"

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
//       ...EntityProps.map((propSet: EntityProps) => renderEntity(propSet, { md })),
//     ]
//   } else {
//     return [renderEntity(EntityProps, { md })]
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
    return verbs.map((verb) => `${actorText} ${verb}`)
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
    entityText.length > 1 || entityText.filter((i) => i.length > 2).length > 0
  )
}

export function joinEntitySummaries(entityText: string[][]): string {
  return entityText.map((item) => item[0]).join(", ")
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

export function renderEntityText(
  set: Partial<EntityProps> = {},
  { md }: { md: boolean } = { md: false }
): string {
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

// export function renderEntityText(
//   EntityProps: EntityProps,
//   { md }: { md: boolean } = { md: false }
// ): string {
//   return renderEntity(EntityProps, { md })
// }

export const renderSubject = (
  subjectProps: EventPropSet["subject"],
  { md }: { md: boolean } = { md: false }
): RenderedSubjectAndContent => [
  renderEntityText(subjectProps, { md }),
  subjectProps.content,
]

export function getRenderedEventPropSet(
  eventProps: EventPropSet,
  {
    md = false,
    dateTimeFormatOptions = DateTime.DATE_FULL,
  }: Partial<NaiveConfig> = {
    md: false,
    dateTimeFormatOptions: DateTime.DATE_FULL,
  }
): RenderedEventPropSet {
  let date = renderDate(
    eventProps.date,
    dateTimeFormatOptions ? dateTimeFormatOptions : DateTime.DATE_FULL
  ) // make the format a config option
  let actor = renderActorText(eventProps.actor, { md: md as boolean })
  let verb = renderVerbText(eventProps.verb)
  let subject = renderSubject(eventProps.subject, { md: md as boolean })
  let target = eventProps.target
    ? renderEntityText(eventProps.target, { md: md as boolean })
    : undefined
  let parent = eventProps.parent
    ? renderEntityText(eventProps.parent, { md: md as boolean })
    : undefined

  return {
    date,
    actor,
    verb,
    subject: subject[0],
    content: subject[1],
    target,
    parent,
  }
}

export function renderDate(
  date: Date,
  formatOptions: DateTimeFormatOptions
): string {
  return DateTime.fromJSDate(date).toLocaleString(formatOptions)
}

export function renderDatedContent(
  content: string,
  date: string,
  url: string | null,
  title: string | null,
  { md = false }: Partial<NaiveConfig> = {
    md: false,
  }
): string {
  let output = `${title ? date + " - " : ""}${md && url ? "[" : ""}${
    title ? title : date
  }${md && url ? "](" + url + "): " : ": "}${content}${
    url && !md ? " (" + url + ")" : ""
  }`

  return output
}

export function renderContent(
  content: string,
  url: string | null,
  title: string | null,
  { md = false }: Partial<NaiveConfig> = {
    md: false,
  }
): string {
  let output = `${md && url ? "[" : ""}${title ? title : md ? "item" : ""}${
    md && url ? "](" + url + ")" : ""
  }${content && content !== title ? `: ${content}` : ""}${
    url && !md ? " (" + url + ")" : ""
  }`

  return output
}

export function renderEventPropSetGroup(
  eventPropSets: EventPropSet[],
  {
    md = defaultNaiveConfig.md as boolean,
    dateTimeFormatOptions = defaultNaiveConfig.dateTimeFormatOptions,
    dateSummaries = defaultNaiveConfig.dateSummaries,
    dateContent = defaultNaiveConfig.dateContent,
  }: Partial<NaiveConfig> = {
    md: false,
    dateTimeFormatOptions: DateTime.DATE_FULL,
    dateSummaries: false,
    dateContent: false,
  }
): RenderedEventsTextSet {
  let output: Partial<RenderedEventsTextSet> = [[]]

  let renderedSets = eventPropSets.map((eps) => {
    // console.log(eps);
    return getRenderedEventPropSet(eps, {
      md,
      dateTimeFormatOptions,
    })
  })

  // console.log(renderedSets)

  renderedSets.forEach((reps, i) => {
    let {
      subject: { url, title },
      result,
    } = eventPropSets[i]

    output[0] && output[0].push(reps.date)

    if (i === 0) {
      const summaryString = `${dateSummaries ? reps.date + ": " : ""}${
        reps.actor
      } ${reps.verb}${
        eventPropSets.length > 1 ? ` ${eventPropSets.length} ` : " "
      }${
        typeof result === "string"
          ? result
          : eventPropSets.length > 1
          ? result[1]
          : result[0]
      }${eventPropSets.length > 1 ? "" : " " + reps.subject}${
        reps.target || reps.parent ? " " : ""
      }${reps.target ? reps.target + (reps.parent ? " " : "") : ""}${
        reps.parent ? reps.parent : ""
      }`

      output[1] = summaryString
      // console.log(summaryString)
    }
    // console.log(
    //   reps, output, i, url, title, result
    // )
    // prettier-ignore
    if (reps.content || eventPropSets.length > 1) { 
      // if content exists, or there are multiple prop sets
      dateContent // should content lines be dated?
        ? output.push(              // if so, use renderDatedContent
            renderDatedContent(
              reps.content ? reps.content : title ? title : "",
              reps.date,
              url ? url : null,
              title ? title : null,
              { md }
            )
          ) 
        : output.push(    // if we're not dating the content lines:
            eventPropSets.length > 1  // if there are multiple subjects
              ? renderContent(    // render or generate content lines
                  reps.content ? reps.content : title ? title : "",
                  url ? url : null,
                  title ? title : null,
                  { md }
                ) // if there is just one content prop, return it directly
              : reps.content
          )
    }
  })
  return output as RenderedEventsTextSet
}

function formatRenderedEventsTextSet(
  rets: RenderedEventsTextSet,
  {
    md = true,
    indentContent = true,
    omitContent = false,
    newLinesBetween = true,
  }: Partial<NaiveConfig> = {
    indentContent: true,
    omitContent: false,
    newLinesBetween: true,
    md: true,
  }
): RenderedEventsTextSet {
  let [dates, summary, ...content] = rets

  // the last line ending (could be summary or content, depending)
  let lastLineEnding = " \r\n" + (newLinesBetween ? "\r\n" : "")

  // if omitContent, drop content
  content = omitContent ? [] : content

  // finally, handle indentation
  let contentIndentation = indentContent ? (md ? "* " : "  ") : ""

  content =
    content.length > 0
      ? content.map((contentLine) =>
          formatContentLine(contentLine, contentIndentation)
        )
      : []

  // if no content, apply last line ending to summary
  if (content.length < 1) {
    summary = summary + lastLineEnding
  } else {
    // otherwise, add basic line ending to summary line...
    summary = summary + " \r\n"
    // ...join content lines with basic line ending between them...
    content = content.map((contentLine, i) =>
      i != content.length - 1 ? contentLine + " \r\n" : contentLine
    )
    // ...and apply last line ending to last content string
    content[content.length - 1] = content[content.length - 1] + lastLineEnding
  }

  return [dates, summary, ...content]
}

function formatContentLine(content: string, indentation: string): string {
  let contentLines = content.split("\n")

  let output =
    indentation +
    contentLines.map((line, i) => `${i != 0 ? "  " : ""}${line}`).join("\n")

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

export interface RenderedEventCollectionSet {
  startDate: string
  endDate: string
  renderedEventCollections: RenderedEventCollection[]
}
export type RenderedEventCollection = string

export function renderEvents(
  events: GHEvent[],
  {
    sortBy = defaultNaiveConfig.sortBy,
    groupByDays = defaultNaiveConfig.groupByDays,
    dateSummaries = defaultNaiveConfig.dateSummaries,
    dateContent = defaultNaiveConfig.dateContent,
    collapse = defaultNaiveConfig.collapse,
    md = defaultNaiveConfig.md,
    startDate = defaultNaiveConfig.startDate,
    omitContent = defaultNaiveConfig.omitContent,
    indentContent = defaultNaiveConfig.indentContent,
    dateTimeFormatOptions = DateTime.DATE_FULL,
    newLinesBetween = true,
  }: Partial<NaiveConfig> = {
    sortBy: "date",
    groupByDays: 7,
    dateSummaries: false,
    dateContent: true,
    collapse: true,
    md: true,
    startDate: new Date("1/1/1970"),
    omitContent: false,
    indentContent: true,
    dateTimeFormatOptions: DateTime.DATE_FULL,
    newLinesBetween: true,
  }
): RenderedEventCollectionSet[] {
  let eventPropSetGroupCollection: SortedDatedEventCollections = getSortedDatedEventCollections(
    events,
    { sortBy, collapse, groupByDays, startDate }
  ) as SortedDatedEventCollections

  return eventPropSetGroupCollection.map((sdec) => {
    let { startDate, endDate, eventPropSetGroups } = sdec

    return {
      startDate: startDate ? renderDate(startDate, dateTimeFormatOptions) : "",
      // startDate:
      //   typeof startDate === "string"
      //     ? startDate
      //     : startDate
      //     ? renderDate(startDate, dateTimeFormatOptions)
      //     : "",
      endDate:
        typeof endDate === "string"
          ? endDate
          : endDate
          ? renderDate(endDate, dateTimeFormatOptions)
          : "",
      renderedEventCollections: eventPropSetGroups
        ? eventPropSetGroups.map((epsg) => {
            let repts = renderEventPropSetGroup(epsg, {
              md,
              dateTimeFormatOptions,
              dateSummaries,
              dateContent,
              omitContent,
              indentContent,
            })

            let processedRenderedSet = formatRenderedEventsTextSet(repts, {
              md,
              indentContent,
              omitContent,
              newLinesBetween,
            })

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            let [_dates, summary, ...content] = processedRenderedSet

            return summary + content.join("")

            // if (content.length < 1) {
            //   return summary + " \r\n\r\n"
            // } else {
            //   return (
            //     [
            //       summary,
            //       ...content.map((content) =>
            //         indentContent
            //           ? addIndentsToContent(content, { md: md || true })
            //           : content
            //       ),
            //     ].join("  \r\n") + "  \r\n"
            //   )
            // }
          })
        : [],
    }
  })
}
