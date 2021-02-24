import { defaultActorPaths, GithubEventType } from "./helperTypes"

const PushEvent: GithubEventType = {
  config: {
    iterator: "payload.commits",
  },
  paths: {
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
}

export default PushEvent
