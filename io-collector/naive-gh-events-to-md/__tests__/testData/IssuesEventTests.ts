const IssuesEventTests = {}

IssuesEventTests["testEvents"] = {}
IssuesEventTests["testEvents"]["closed"] = [
  {
    testStrings: {
      summary: {
        plain:
          "timfitzzz closed issue set up test mongodb database in timfitzzz/stemmy",
        md:
          "[timfitzzz](https://github.com/timfitzzz) closed issue [set up test mongodb database](https://github.com/timfitzzz/stemmy/issues/13) in [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)",
      },
      actionTypes: ["closed"],
      actor: {
        plain: `timfitzzz closed`,
        md: `[timfitzzz](https://github.com/timfitzzz) closed`,
      },
      result: "issue",
      subject: {
        plain: [["set up test mongodb database"]],
        md: [
          [
            "[set up test mongodb database](https://github.com/timfitzzz/stemmy/issues/13)",
          ],
        ],
      },
      target: {
        plain: [[""]],
        md: [[""]],
      },
      parent: {
        plain: [["in timfitzzz/stemmy"]],
        md: [["in [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)"]],
      },
    },
    event: {
      id: "14651575891",
      type: "IssuesEvent",
      actor: {
        id: 3611294,
        login: "timfitzzz",
        display_login: "timfitzzz",
        gravatar_id: "",
        url: "https://api.github.com/users/timfitzzz",
        avatar_url: "https://avatars.githubusercontent.com/u/3611294?",
      },
      repo: {
        id: 289771653,
        name: "timfitzzz/stemmy",
        url: "https://api.github.com/repos/timfitzzz/stemmy",
      },
      payload: {
        action: "closed",
        issue: {
          url: "https://api.github.com/repos/timfitzzz/stemmy/issues/13",
          repository_url: "https://api.github.com/repos/timfitzzz/stemmy",
          labels_url:
            "https://api.github.com/repos/timfitzzz/stemmy/issues/13/labels{/name}",
          comments_url:
            "https://api.github.com/repos/timfitzzz/stemmy/issues/13/comments",
          events_url:
            "https://api.github.com/repos/timfitzzz/stemmy/issues/13/events",
          html_url: "https://github.com/timfitzzz/stemmy/issues/13",
          id: 775097444,
          node_id: "MDU6SXNzdWU3NzUwOTc0NDQ=",
          number: 13,
          title: "set up test mongodb database",
          user: {
            login: "timfitzzz",
            id: 3611294,
            node_id: "MDQ6VXNlcjM2MTEyOTQ=",
            avatar_url: "https://avatars1.githubusercontent.com/u/3611294?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/timfitzzz",
            html_url: "https://github.com/timfitzzz",
            followers_url: "https://api.github.com/users/timfitzzz/followers",
            following_url:
              "https://api.github.com/users/timfitzzz/following{/other_user}",
            gists_url: "https://api.github.com/users/timfitzzz/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/timfitzzz/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/timfitzzz/subscriptions",
            organizations_url: "https://api.github.com/users/timfitzzz/orgs",
            repos_url: "https://api.github.com/users/timfitzzz/repos",
            events_url:
              "https://api.github.com/users/timfitzzz/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/timfitzzz/received_events",
            type: "User",
            site_admin: false,
          },
          labels: [
            {
              id: 2567918464,
              node_id: "MDU6TGFiZWwyNTY3OTE4NDY0",
              url:
                "https://api.github.com/repos/timfitzzz/stemmy/labels/deployment",
              name: "deployment",
              color: "edd62d",
              default: false,
              description: "related to deployment",
            },
          ],
          state: "closed",
          locked: false,
          assignee: {
            login: "timfitzzz",
            id: 3611294,
            node_id: "MDQ6VXNlcjM2MTEyOTQ=",
            avatar_url: "https://avatars1.githubusercontent.com/u/3611294?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/timfitzzz",
            html_url: "https://github.com/timfitzzz",
            followers_url: "https://api.github.com/users/timfitzzz/followers",
            following_url:
              "https://api.github.com/users/timfitzzz/following{/other_user}",
            gists_url: "https://api.github.com/users/timfitzzz/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/timfitzzz/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/timfitzzz/subscriptions",
            organizations_url: "https://api.github.com/users/timfitzzz/orgs",
            repos_url: "https://api.github.com/users/timfitzzz/repos",
            events_url:
              "https://api.github.com/users/timfitzzz/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/timfitzzz/received_events",
            type: "User",
            site_admin: false,
          },
          assignees: [
            {
              login: "timfitzzz",
              id: 3611294,
              node_id: "MDQ6VXNlcjM2MTEyOTQ=",
              avatar_url:
                "https://avatars1.githubusercontent.com/u/3611294?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/timfitzzz",
              html_url: "https://github.com/timfitzzz",
              followers_url: "https://api.github.com/users/timfitzzz/followers",
              following_url:
                "https://api.github.com/users/timfitzzz/following{/other_user}",
              gists_url:
                "https://api.github.com/users/timfitzzz/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/timfitzzz/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/timfitzzz/subscriptions",
              organizations_url: "https://api.github.com/users/timfitzzz/orgs",
              repos_url: "https://api.github.com/users/timfitzzz/repos",
              events_url:
                "https://api.github.com/users/timfitzzz/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/timfitzzz/received_events",
              type: "User",
              site_admin: false,
            },
          ],
          milestone: null,
          comments: 1,
          created_at: "2020-12-27T19:49:07Z",
          updated_at: "2020-12-27T20:52:02Z",
          closed_at: "2020-12-27T20:52:02Z",
          author_association: "OWNER",
          active_lock_reason: null,
          body: "need to move mongodb contents to online test location",
          performed_via_github_app: null,
        },
      },
      public: false,
      created_at: "2020-12-27T20:52:02Z",
    },
  },
]

export default IssuesEventTests
