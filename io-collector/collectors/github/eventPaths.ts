/* eslint-disable @typescript-eslint/class-name-casing, @typescript-eslint/camelcase */

const _ = require("lodash")
import { GithubEvent } from "./types"

export type singleWithPlural = [string, string]

// indexed single and plural = [<prop path to test>, { value: [single, plural]}
export type indexedSingleAndPlural = [
  string,
  {
    [key: string]: [string, string]
  }
]
export type propValResult = [string, any, string]
export type iteratorMap = [string, { [key: string]: string }]

export interface entityRef {
  id: string
  url?: string
  preposition?: string
  desc?: string
  title?: string
  content?: string
}

export interface eventPathSet {
  actor?: {
    id: string
    url: string
  }
  verb?: string | iteratorMap
  result?: string | singleWithPlural | indexedSingleAndPlural
  parent?: entityRef | { [key: string]: entityRef } | [string, entityRef]
  target?: entityRef | { [key: string]: entityRef } | [string, entityRef]
  subject?: entityRef | { [key: string]: entityRef } | [string, entityRef]
}

export const defaultActorPaths = {
  id: "actor.login",
  url: "actor.url",
}

export const repoParentPaths = {
  id: "repo.name",
  url: "repo.url",
  preposition: "in",
  title: "repo.name",
}

export const pullRequestPaths = {
  id: "payload.pull_request.number",
  url: "payload.pull_request.html_url",
  title: "payload.pull_request.title",
}

// {[actor] [verb] [result] [subject.preoposition] [subject.desc] [subject] [target.preposition] [target.desc] [target]}

// CommitComment: 'timfitzzz created a comment on commit

// single desc: [actor] [verb] [result] [subject.preposition] [subject.desc] [subject.id | title]
//              [target.preposition] [target.desc] [target.id | target.title]
//              [parent.preposition] [parent.desc] [parent.id | parent.title]:
//                [content]
// plural desc: [actor] [verb] [result] [target.preposition] [target.desc] [target.id | target.title] [subject...] [parent...]:
//                > [content]
export const eventPaths: { [key: string]: eventPathSet } = {
  CommitCommentEvent: {
    // single: 'timfitzzz created a comment on commit #123daff in timfitzzz/stemmy:'
    //         '  [comment.text]'
    // plural: 'timfitzzz created comments on commit #123daff in timfitzzz/stemmy:'
    //         '  [...comments.text]
    actor: {
      id: "payload.comment.user.login",
      url: "payload.comment.user.html_url",
    },
    verb: "created", // had actions defined here, but they apparently don't matter
    result: ["a comment", "comments"],
    subject: {
      id: "payload.comment.id",
      url: "payload.comment.html_url",
      content: "payload.comment.body",
    },
    target: {
      preposition: "on",
      id: "payload.comment.commit_id",
      desc: "a commit",
      url: "payload.comment.html_url",
    },
    parent: repoParentPaths,
  },
  CreateEvent: {
    // single: 'timfitzzz created a branch newPlatformDesign in timfitzzz/stemmy'
    // plural: 'timfitzzz created branches in timfitzzz/stemmy:'
    //         > [...subject]
    actor: defaultActorPaths,
    verb: "created",
    result: [
      "payload.ref_type",
      {
        branch: ["a branch", "branches"],
        tag: ["a tag", "tags"],
      },
    ],
    subject: {
      id: "payload.ref",
    },
    parent: repoParentPaths,
  },
  DeleteEvent: {
    // single: 'timfitzzz deleted a [branch/tag] newPlatformDesign in timfitzzz/stemmy'
    // plural: 'timfitzzz created branches in timfitzzz/stemmy:'
    actor: defaultActorPaths,
    verb: "deleted",
    result: [
      "payload.ref_type",
      {
        branch: ["a branch", "branches"],
        tag: ["a tag", "tags"],
      },
    ],
    subject: {
      id: "payload.ref",
    },
    parent: repoParentPaths,
  },
  ForkEvent: {
    // single: 'timfitzzz forked timfitzzz/stemmy to create timfitzzz/stemmy2'
    actor: defaultActorPaths,
    verb: "forked",
    result: ["a repo", "repos"],
    subject: {
      id: "repo.id",
      url: "repo.url",
      title: "repo.name",
    },
    target: {
      preposition: "to",
      desc: "new repo",
      id: "payload.forkee.id",
      title: "payload.forkee.full_name",
      url: "payload.forkee.html_url",
    },
  },
  GollumEvent: {
    // TODO: somehow pre-process to handle multiple pages in payload
    // single: 'timfitzzz created wiki page Hello in timfitzzz/stemmy
    // plural: 'timfitzzz created wiki pages in timfitzzz/stemmy:'
    //         '  > [...subjects]
    actor: defaultActorPaths,
    verb: [
      "payload.pages[0].action",
      {
        created: "created",
        edited: "edited",
      },
    ],
    result: ["wiki page", "wiki pages"],
    subject: [
      "payload.pages",
      {
        id: "page_name",
        url: "html_url",
        title: "title",
      },
    ],
    parent: repoParentPaths,
  },
  IssueCommentEvent: {
    // single: 'timfitzzz created a comment on issue [issue.title] in [parent]:'
    //         '  payload.comment
    // plural: 'timfitz created comments on issue [issue.title] in [parent]:'
    //         '  > [payload.comment]
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        created: "created",
        edited: "edited",
        deleted: "deleted",
      },
    ],
    result: ["comment", "comments"],
    subject: {
      id: "payload.comment.id",
      content: "payload.comment.body",
      url: "payload.comment.html_url",
    },
    target: {
      preposition: "on",
      desc: "issue",
      id: "payload.issue.number",
      url: "payload.issue.html_url",
      title: "payload.issue.title",
    },
    parent: repoParentPaths,
  },
  IssuesEvent: {
    // 'timfitzzz opened an issue [subject[result[0].id] in [repo]'
    // 'timfitzzz assigned an issue [subject] to [target] in [repo]'
    // 'timfitzzz assigned a label [subject[result[0].id]]
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        opened: "opened",
        closed: "closed",
        reopened: "reopened",
        assigned: "assigned",
        unassigned: "unassigned",
        labeled: "applied",
        unlabeled: "removed",
      },
    ],
    result: [
      "payload.action",
      {
        opened: ["issue", "issues"],
        closed: ["issue", "issues"],
        reopened: ["issue", "issues"],
        assigned: ["issue", "issues"],
        unassigned: ["issue", "issues"],
        labeled: ["label", "labels"],
        unlabeled: ["label", "labels"],
      },
    ],
    subject: {
      opened: {
        id: "payload.issue.number",
        url: "payload.issue.html_url",
        title: "payload.issue.title",
        content: "payload.issue.body",
      },
      closed: {
        id: "payload.issue.number",
        url: "payload.issue.html_url",
        title: "payload.issue.title",
      },
      assigned: {
        id: "payload.issue.number",
        url: "payload.issue.html_url",
        title: "payload.issue.title",
      },
      unassigned: {
        id: "payload.issue.number",
        url: "payload.issue.html_url",
        title: "payload.issue.title",
      },
      labeled: {
        id: "payload.label.name",
        url: "payload.label.html_url",
      },
      unlabeled: {
        id: "payload.label.name",
        url: "payload.label.html_url",
      },
    },
    target: {
      assigned: {
        preposition: "to user",
        id: "payload.assignee.login",
        url: "payload.assignee.html_url",
      },
      unassigned: {
        preposition: "to user",
        id: "payload.assignee.login",
        url: "payload.assignee.html_url",
      },
      labeled: {
        preposition: "to issue",
        id: "payload.issue.number",
        url: "payload.issue.html_url",
        title: "payload.issue.title",
      },
      unlabeled: {
        preposition: "from issue",
        id: "payload.issue.number",
        url: "payload.issue.html_url",
        title: "payload.issue.title",
      },
    },
    parent: repoParentPaths,
  },
  MemberEvent: {
    // timfitzzz granted access for [subject - user] to [target - repo]
    // timfitzzz edited access for [subject - user] to [target - repo]
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        added: "granted",
        edited: "modified",
        removed: "revoked",
      },
    ],
    result: ["access", "access"],
    subject: {
      preposition: "for",
      desc: "user",
      id: "payload.member.id",
      title: "payload.member.login",
      url: "payload.member.html_url",
    },
    target: {
      preposition: "to",
      id: "repo.name",
      url: "repo.url",
    },
  },
  PublicEvent: {
    // timfitzzz set
    actor: defaultActorPaths,
    verb: "set",
    result: ["repository", "repositories"],
    subject: {
      id: "repo.id",
      title: "repo.name",
      url: "repo.url",
    },
    target: {
      preposition: "to",
      desc: "'public'",
      id: null,
      url: null,
    },
  },
  PullRequestEvent: {
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        opened: "opened",
        closed: "closed",
        reopened: "reopened",
        assigned: "assigned",
        unassigned: "unassigned",
        review_requested: "requested",
        review_request_removed: "rescinded",
        labeled: "applied",
        unlabeled: "removed",
        synchronize: "synchronized",
      },
    ],
    result: [
      "payload.action",
      {
        opened: ["pull request", "pull requests"],
        closed: ["pull request", "pull requests"],
        reopened: ["pull request", "pull requests"],
        assigned: ["pull request", "pull requests"],
        unassigned: ["pull request", "pull requests"],
        review_requested: [
          "review of pull request",
          "reviews of pull requests",
        ],
        review_request_removed: [
          "request for review of pull request",
          "requests for review of pull requests",
        ],
        labeled: ["label", "labels"],
        unlabeled: ["label", "labels"],
        synchronize: ["pull request", "pull request"],
      },
    ],
    subject: {
      opened: pullRequestPaths,
      closed: pullRequestPaths,
      reopened: pullRequestPaths,
      assigned: pullRequestPaths,
      unassigned: pullRequestPaths,
      review_requested: pullRequestPaths,
      review_request_removed: pullRequestPaths,
      labeled: {
        id: "payload.label.name",
        url: "payload.label.html_url",
      },
      unlabeled: {
        id: "payload.label.name",
        url: "payload.label.html_url",
      },
      synchronize: pullRequestPaths,
    },
    target: {
      labeled: {
        preposition: "to",
        ...pullRequestPaths,
      },
      unlabeled: {
        preposition: "from",
        ...pullRequestPaths,
      },
    },
    parent: repoParentPaths,
  },
  PullRequestReviewEvent: {
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        created: "added",
        edited: "changed",
        deleted: "removed",
      },
    ],
    result: [
      "payload.action",
      {
        created: ["a review", "reviews"],
        edited: ["a review", "reviews"],
        deleted: ["a review", "reviews"],
      },
    ],
    subject: {
      id: "payload.review.id",
      url: "payload.review.html_url",
      content: "payload.review.body",
    },
    target: {
      id: "payload.pull_request.id",
      url: "payload.pull_request.html_url",
      desc: "a pull request",
      preposition: "of",
    },
    parent: repoParentPaths,
  },
  PullRequestReviewCommentEvent: {
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        created: "added",
        edited: "changed",
        deleted: "removed",
      },
    ],
    result: [
      "payload.action",
      {
        created: ["a comment", "comments"],
        deleted: ["a comment", "comments"],
        edited: ["a comment", "comments"],
      },
    ],
    subject: {
      created: {
        id: "payload.comment.id",
        url: "payload.comment.html_url",
        title: "payload.comment.id",
        content: "payload.comment.body",
      },
      edited: {
        id: "payload.comment.id",
        url: "payload.comment.html_url",
        title: "payload.comment.id",
        content: "payload.changes",
      },
    },
    target: {
      created: {
        preposition: "on",
        desc: "pull request",
        id: "payload.pull_request.id",
        title: "payload.pull_request.title",
        url: "payload.pull_request.html_url",
      },
      edited: {
        preposition: "on",
        desc: "pull request",
        id: "payload.pull_request.id",
        title: "payload.pull_request.title",
        url: "payload.pull_request.html_url",
      },
    },
    parent: repoParentPaths,
  },
  PushEvent: {
    actor: defaultActorPaths,
    verb: "pushed",
    result: ["commit", "commits"],
    subject: [
      "payload.commits",
      {
        id: "sha",
        url: "url",
        content: "message",
      },
    ],
    target: {
      id: "repo.id",
      title: "repo.name",
      preposition: "to",
      url: "repo.url",
    },
  },
  ReleaseEvent: {
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        published: "published",
        edited: "edited",
      },
    ],
    result: ["a release", "releases"],
    subject: {
      id: "payload.release.id",
      title: "payload.release.name",
      url: "payload.release.html_url",
    },
    target: repoParentPaths,
  },
  SponsorshipEvent: {
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        created: "added",
        removed: "removed",
      },
    ],
    result: ["a sponsorship tier", "sponsorship tiers"],
    target: repoParentPaths,
  },
  WatchEvent: {
    actor: defaultActorPaths,
    verb: "started",
    result: "watching",
    subject: {
      id: "repo.id",
      title: "repo.name",
      desc: "repository",
      url: "repo.url",
    },
  },
}

export interface entityProps {
  id: number | string
  url: string
  desc: string
  preposition: string
  title: string
  content: string
}

export function getActorProps(event: GithubEvent): { id: string; url: string } {
  const actorPaths = eventPaths[event.type].actor

  return {
    id: _.get(event, actorPaths.id),
    url: _.get(event, actorPaths.url).replace(
      "api.github.com/users",
      "github.com"
    ),
  }
}

export function getVerb(event: GithubEvent): string {
  const verbPaths = eventPaths[event.type].verb

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

export function getResult(event: GithubEvent, plural: boolean = false): string {
  const resultSet = eventPaths[event.type].result

  if (!Array.isArray(resultSet)) {
    return resultSet
  } else if (typeof resultSet[1] === "object") {
    const resultKey = _.get(event, resultSet[0])
    return plural ? resultSet[1][resultKey][1] : resultSet[1][resultKey][0]
  } else {
    return plural ? resultSet[1] : resultSet[0]
  }
}

export function getEntityProps(
  event: GithubEvent,
  entityType: string
): entityProps | entityProps[] {
  const entityPaths:
    | entityRef
    | { [key: string]: entityRef }
    | [string, entityRef] = eventPaths[event.type][entityType]

  let output: entityProps | entityProps[]

  // console.log(entityPaths)

  if (entityPaths) {
    if (Array.isArray(entityPaths)) {
      let entities = _.get(event, entityPaths[0]) // get the entities to iterate
      output = entities.map(entity => ({
        preposition: entityPaths[1].preposition,
        id: _.get(entity, entityPaths[1].id),
        url: _.get(entity, entityPaths[1].url)
          ?.replace("api.", "")
          .replace("www.", "")
          .replace("/repos", ""),
        title: _.get(entity, entityPaths[1].title),
        desc: _.get(entity, entityPaths[1].desc) || entityPaths[1].desc,
        content: _.get(entity, entityPaths[1].content),
      }))
    } else if (!entityPaths.id && entityPaths[event.payload.action]) {
      // for entities with multiple action types:
      // entityPaths = { [key: string]: entityRef }
      output = {
        id: _.get(event, entityPaths[event.payload.action].id),
        url: _.get(event, entityPaths[event.payload.action].url)
          ?.replace("api.", "")
          .replace("www.", "")
          .replace("/repos", ""),
        desc:
          _.get(event, entityPaths[event.payload.action].desc) ||
          entityPaths[event.payload.action].desc,
        title: _.get(event, entityPaths[event.payload.action].title),
        preposition: entityPaths[event.payload.action].preposition,
        content: _.get(event, entityPaths[event.payload.action].content),
      }
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
