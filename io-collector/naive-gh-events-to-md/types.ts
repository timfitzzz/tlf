import { Endpoints } from "@octokit/types"
import { resultDef } from "./eventTypes/helperTypes"

export type GithubEvent = Endpoints["GET /users/{username}/events"]["response"]["data"][0]
export type GithubIssue = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0]
export type GithubLabel = Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"]["response"]["data"][0]
export type GithubUser = Endpoints["GET /users/{username}"]["response"]["data"]
export type GithubRepo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]
export type GithubPullRequest = Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}"]["response"]["data"]
export type GithubPullRequestComment = Endpoints["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"]["response"]["data"]
export type GithubPullRequestReview = Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"]["response"]["data"]
export type GithubRelease = Endpoints["GET /repos/{owner}/{repo}/releases/{release_id}"]["response"]["data"]

export interface EntityProps {
  id: number | string
  url: string
  desc: string
  preposition: string
  title: string
  content?: string
}

export interface ActorProps {
  id: string
  url: string
}

export interface EventPropSet {
  date: Date
  private: boolean
  type: string
  verb: string
  result: resultDef
  actionType?: string
  subject: EntityProps
  actor: ActorProps
  target?: EntityProps
  parent: EntityProps
}
