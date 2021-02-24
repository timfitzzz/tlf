import { GithubEventType, defaultActorPaths } from "./helperTypes"

const ForkEvent: GithubEventType = {
  config: {},
  paths: {
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
}

export default ForkEvent
