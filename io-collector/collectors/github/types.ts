import { Endpoints } from "@octokit/types"

export type GithubEvent = Endpoints["GET /users/{username}/events"]["response"]["data"][0]
export type GithubIssue = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0]
export type GithubLabel = Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"]["response"]["data"][0]
export type GithubUser = Endpoints["GET /users/{username}"]["response"]["data"]
export type GithubRepo = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]
