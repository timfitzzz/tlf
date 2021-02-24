import {
  defaultActorPaths,
  GithubEventType,
  repoParentPaths,
} from "./helperTypes"

const SponsorshipEvent: GithubEventType = {
  config: {
    actionPropPath: "payload.action",
    actionTypes: ["added", "removed"],
  },
  paths: {
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
}

export default SponsorshipEvent
