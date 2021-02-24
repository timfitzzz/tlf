import _ from "lodash"
import EventTypes from "./eventTypes"
import { indexedResultDef, resultDef } from "./eventTypes/helperTypes"
import { getEntityProps, getActorProps } from "./getProps"
import { GithubEvent, entityProps } from "./types"

export function getVerb(event: GithubEvent): string {
  const verbPaths = EventTypes[event.type].paths.verb

  if (typeof verbPaths === "string") {
    const possibleResult = _.get(event, verbPaths)
    return possibleResult || verbPaths
  } else if (Array.isArray(verbPaths)) {
    const verbKey = verbPaths[0]
    const verbKeyValue = _.get(event, verbKey)

    if (verbPaths[1][verbKeyValue]) {
      return verbPaths[1][verbKeyValue]
    } else {
      return verbKeyValue
    }
  }
}

export function getResult(
  event: GithubEvent,
  plural: boolean = false,
  actionType?: string
): string {
  const resultSet: string | resultDef | indexedResultDef =
    EventTypes[event.type].paths.result

  if (typeof resultSet === "string") {
    return resultSet
  } else if (Array.isArray(resultSet)) {
    return plural ? resultSet[1] : resultSet[0]
  } else if (actionType) {
    return plural ? resultSet[actionType][1] : resultSet[actionType][0]
  } else {
    return "err"
  }
}

// getEntityText returns an array of arrays.
// each array[n] has the following structure:
// array[n][0] is the main markdown or text segment
// array[n][1 - n] contain any associated content props in plaintext
// (if md formatting for content is desired that can be performed in a separate step)
export function getEntityText(
  event: GithubEvent,
  type: string,
  { md }: { md: boolean } = { md: false }
): string[][] {
  const entityProps = getEntityProps(event, type)

  function processPropSet(set: Partial<entityProps> = {}) {
    let { id, url, desc, preposition, title, content } = set
    let space = " "

    let titleString = md
      ? title || desc || id || ""
      : title || desc
      ? title || desc + (id ? " (" + id + ")" : "")
      : id || ""
    // prettier-ignore
    return [
      "" + // make sure at least an empty string is returned
      (preposition ? preposition + space : "") + // preposition
      ((desc && title) ? desc + space : "") + // if both desc and title, desc
      (md && url ? "[" : "") + // open link if md and url
      titleString + // title, or desc, or id
      (md && url ? "]" : "") + // close link if md and url
        (md && url ? `(${url})` : ""), // url if md and url
      content,
    ]
  }

  if (Array.isArray(entityProps)) {
    return [
      ...entityProps.map((propSet: entityProps) => processPropSet(propSet)),
    ]
  } else {
    return [processPropSet(entityProps)]
  }
}

export function getActorVerbText(
  event: GithubEvent,
  { md }: { md: boolean } = { md: false }
): string {
  let { id, url } = getActorProps(event)
  let verb = getVerb(event)

  return `${md ? "[" : ""}${id}${md ? "](" + url + ")" : ""} ${verb}`
}

// export function getResultSubjectText(event: GithubEvent, { md, plural }: { md: boolean, plural: boolean } = { md: false, plural: false }) {
//   let result = getResult(event, plural ? true : false)

// }
// export function getEntityText(event: GithubEvent, type: string, { mdx }: { mdx: boolean }): string {

//   let entityProps = getEntityProps(event, type)

// }

export function isEntityPlural(entityText: string[][]): boolean {
  return (
    entityText.length > 1 || entityText.filter(i => i.length > 2).length > 0
  )
}

export function joinEntitySummaries(entityText: string[][]): string {
  return entityText.map(item => item[0]).join(", ")
}

export function getEventSummary(
  event: GithubEvent,
  { md }: { md: boolean } = { md: false }
): string {
  let subjectTexts = getEntityText(event, "subject", { md })
  let subject = joinEntitySummaries(subjectTexts)
  let target = joinEntitySummaries(getEntityText(event, "target", { md }))
  let parent = joinEntitySummaries(getEntityText(event, "parent", { md }))

  return (
    getActorVerbText(event, { md }) +
    " " +
    getResult(event, isEntityPlural(subjectTexts)) +
    (subject && subject.length > 0 ? " " + subject : "") +
    (target && target.length > 0 ? " " + target : "") +
    (parent && parent.length > 0 ? " " + parent : "")
  )
}
