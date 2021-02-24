const WatchEventTests = {}

WatchEventTests["testEvents"] = [
  {
    testStrings: {
      summary: {
        plain:
          "timfitzzz started watching repository mohebifar/react-use-context-selector",
        md:
          "[timfitzzz](https://github.com/timfitzzz) started watching repository [mohebifar/react-use-context-selector](https://github.com/mohebifar/react-use-context-selector)",
      },
      actor: {
        plain: `timfitzzz started`,
        md: `[timfitzzz](https://github.com/timfitzzz) started`,
      },
      result: "watching",
      subject: {
        plain: [["repository mohebifar/react-use-context-selector"]],
        md: [
          [
            "repository [mohebifar/react-use-context-selector](https://github.com/mohebifar/react-use-context-selector)",
          ],
        ],
      },
    },
    event: {
      id: "14421186279",
      type: "WatchEvent",
      actor: {
        id: 3611294,
        login: "timfitzzz",
        display_login: "timfitzzz",
        gravatar_id: "",
        url: "https://api.github.com/users/timfitzzz",
        avatar_url: "https://avatars.githubusercontent.com/u/3611294?",
      },
      repo: {
        id: 231138759,
        name: "mohebifar/react-use-context-selector",
        url:
          "https://api.github.com/repos/mohebifar/react-use-context-selector",
      },
      payload: { action: "started" },
      public: true,
      created_at: "2020-12-04T22:39:36Z",
    },
  },
]

export default WatchEventTests
