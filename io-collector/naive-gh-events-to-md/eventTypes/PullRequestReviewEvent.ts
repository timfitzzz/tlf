import {
  defaultActorPaths,
  GithubEventType,
  repoParentPaths,
} from "./helperTypes"

const PullRequestReviewEvent: GithubEventType = {
  config: {
    actionPropPath: "payload.action",
    actionTypes: ["created", "edited", "deleted"],
  },
  paths: {
    actor: defaultActorPaths,
    verb: [
      "payload.action",
      {
        created: "added",
        edited: "changed",
        deleted: "removed",
      },
    ],
    result: {
      created: ["a review", "reviews"],
      edited: ["a review", "reviews"],
      deleted: ["a review", "reviews"],
    },
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
}

export default PullRequestReviewEvent
