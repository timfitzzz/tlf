import { defaultActorPaths, GithubEventType } from "./helperTypes"

const PublicEvent: GithubEventType = {
  config: {},
  paths: {
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
      id: "",
      url: null,
    },
  },
}

export default PublicEvent
