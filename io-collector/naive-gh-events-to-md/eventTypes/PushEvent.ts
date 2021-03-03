import { defaultActorPaths, GithubEventType } from "./helperTypes"

const PushEvent: GithubEventType = {
  config: {
    iterator: "payload.commits",
  },
  paths: {
    actor: defaultActorPaths,
    verb: "pushed",
    result: ["commit", "commits"],
    subject: {
      id: "sha",
      url: "url",
      content: "message",
    },
    target: {
      id: "repo.id",
      title: "repo.name",
      preposition: "to",
      url: "repo.url",
    },
  },
}

export default PushEvent

export interface GHCommitBrief {
  sha: string
  author: {
    email: string
    name: string
  }
  message: string
  distinct: boolean
  url: string
}

export interface PushEventPayload {
  push_id: number
  size: number
  distinct_size: number
  ref: string
  head: string
  before: string
  commits: GHCommitBrief[]
}
