const CommitCommentEventTests = {}

CommitCommentEventTests["testEvents"] = [
  {
    testStrings: {
      summary: {
        plain:
          "vercel[bot] created a comment 47077458 on a commit (4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c) in dm2444/Venwiz-Demo",
        md:
          "[vercel[bot]](https://github.com/apps/vercel) created a comment [47077458](https://github.com/dm2444/Venwiz-Demo/commit/4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c#commitcomment-47077458) on [a commit](https://github.com/dm2444/Venwiz-Demo/commit/4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c#commitcomment-47077458) in [dm2444/Venwiz-Demo](https://github.com/dm2444/Venwiz-Demo)",
      },
      content: {
        plain: [
          [
            "Successfully deployed to the following URLs:\n\n* [venwiz-demo.dm2444.vercel.app](https://venwiz-demo.dm2444.vercel.app)  \n* [venwiz-demo.vercel.app](https://venwiz-demo.vercel.app)  \n* [venwiz-demo-git-main.dm2444.vercel.app](https://venwiz-demo-git-main.dm2444.vercel.app)",
          ],
        ],
        md: [
          [
            "Successfully deployed to the following URLs:\n\n* [venwiz-demo.dm2444.vercel.app](https://venwiz-demo.dm2444.vercel.app)  \n* [venwiz-demo.vercel.app](https://venwiz-demo.vercel.app)  \n* [venwiz-demo-git-main.dm2444.vercel.app](https://venwiz-demo-git-main.dm2444.vercel.app)",
          ],
        ],
      },
      actor: {
        plain: "vercel[bot] created",
        md: "[vercel[bot]](https://github.com/apps/vercel) created",
      },
      result: "a comment",
      subject: {
        plain: [
          [
            "47077458",
            "Successfully deployed to the following URLs:\n\n* [venwiz-demo.dm2444.vercel.app](https://venwiz-demo.dm2444.vercel.app)  \n* [venwiz-demo.vercel.app](https://venwiz-demo.vercel.app)  \n* [venwiz-demo-git-main.dm2444.vercel.app](https://venwiz-demo-git-main.dm2444.vercel.app)",
          ],
        ],
        md: [
          [
            "[47077458](https://github.com/dm2444/Venwiz-Demo/commit/4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c#commitcomment-47077458)",
            "Successfully deployed to the following URLs:\n\n* [venwiz-demo.dm2444.vercel.app](https://venwiz-demo.dm2444.vercel.app)  \n* [venwiz-demo.vercel.app](https://venwiz-demo.vercel.app)  \n* [venwiz-demo-git-main.dm2444.vercel.app](https://venwiz-demo-git-main.dm2444.vercel.app)",
          ],
        ],
      },
      target: {
        plain: [["on a commit (4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c)"]],
        md: [
          [
            "on [a commit](https://github.com/dm2444/Venwiz-Demo/commit/4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c#commitcomment-47077458)",
          ],
        ],
      },
      parent: {
        plain: [["in dm2444/Venwiz-Demo"]],
        md: [
          ["in [dm2444/Venwiz-Demo](https://github.com/dm2444/Venwiz-Demo)"],
        ],
      },
    },
    event: {
      id: "15171804358",
      type: "CommitCommentEvent",
      actor: {
        id: 35613825,
        login: "vercel[bot]",
        display_login: "vercel",
        gravatar_id: "",
        url: "https://api.github.com/users/vercel[bot]",
        avatar_url: "https://avatars.githubusercontent.com/u/35613825?",
      },
      repo: {
        id: 338244382,
        name: "dm2444/Venwiz-Demo",
        url: "https://api.github.com/repos/dm2444/Venwiz-Demo",
      },
      payload: {
        comment: {
          url:
            "https://api.github.com/repos/dm2444/Venwiz-Demo/comments/47077458",
          html_url:
            "https://github.com/dm2444/Venwiz-Demo/commit/4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c#commitcomment-47077458",
          id: 47077458,
          node_id: "MDEzOkNvbW1pdENvbW1lbnQ0NzA3NzQ1OA==",
          user: {
            login: "vercel[bot]",
            id: 35613825,
            node_id: "MDM6Qm90MzU2MTM4MjU=",
            avatar_url: "https://avatars.githubusercontent.com/in/8329?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/vercel%5Bbot%5D",
            html_url: "https://github.com/apps/vercel",
            followers_url:
              "https://api.github.com/users/vercel%5Bbot%5D/followers",
            following_url:
              "https://api.github.com/users/vercel%5Bbot%5D/following{/other_user}",
            gists_url:
              "https://api.github.com/users/vercel%5Bbot%5D/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/vercel%5Bbot%5D/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/vercel%5Bbot%5D/subscriptions",
            organizations_url:
              "https://api.github.com/users/vercel%5Bbot%5D/orgs",
            repos_url: "https://api.github.com/users/vercel%5Bbot%5D/repos",
            events_url:
              "https://api.github.com/users/vercel%5Bbot%5D/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/vercel%5Bbot%5D/received_events",
            type: "Bot",
            site_admin: false,
          },
          position: null,
          line: null,
          path: null,
          commit_id: "4b8dd057ab076677f75d1ffe2bcc36cb43c07a1c",
          created_at: "2021-02-13T05:22:45Z",
          updated_at: "2021-02-13T05:22:45Z",
          author_association: "NONE",
          body:
            "Successfully deployed to the following URLs:\n\n* [venwiz-demo.dm2444.vercel.app](https://venwiz-demo.dm2444.vercel.app)  \n* [venwiz-demo.vercel.app](https://venwiz-demo.vercel.app)  \n* [venwiz-demo-git-main.dm2444.vercel.app](https://venwiz-demo-git-main.dm2444.vercel.app)",
        },
      },
      public: true,
      created_at: "2021-02-13T05:22:45Z",
    },
  },
]

export default CommitCommentEventTests
