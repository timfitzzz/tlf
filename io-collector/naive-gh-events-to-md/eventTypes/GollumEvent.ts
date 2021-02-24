import {
  defaultActorPaths,
  GithubEventType,
  repoParentPaths,
} from "./helperTypes"

const GollumEvent: GithubEventType = {
  config: {
    actionPropPath: ["payload.pages", "action"],
    actionTypes: ["created", "edited"],
    iterator: "payload.pages",
  },
  paths: {
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
}

export default GollumEvent
