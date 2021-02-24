import {
  defaultActorPaths,
  GithubEventType,
  repoParentPaths,
} from "./helperTypes"

const ReleaseEvent: GithubEventType = {
  config: {
    actionPropPath: "payload.action",
    actionTypes: ["published", "edited"],
  },
  paths: {
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
}

export default ReleaseEvent
