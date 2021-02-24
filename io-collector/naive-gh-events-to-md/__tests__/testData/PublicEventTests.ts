const PublicEventTests = {}

PublicEventTests["testEvents"] = {}
PublicEventTests["testEvents"] = [
  {
    testStrings: {
      summary: {
        plain:
          "RegularSpark set repository RegularSpark/wrappedchat to 'public'",
        md:
          "[RegularSpark](https://github.com/RegularSpark) set repository [RegularSpark/wrappedchat](https://github.com/RegularSpark/wrappedchat) to 'public'",
      },
      actor: {
        plain: "RegularSpark set",
        md: "[RegularSpark](https://github.com/RegularSpark) set",
      },
      result: "repository",
      subject: {
        plain: [["RegularSpark/wrappedchat"]],
        md: [
          [
            "[RegularSpark/wrappedchat](https://github.com/RegularSpark/wrappedchat)",
          ],
        ],
      },
      target: {
        plain: [["to 'public'"]],
        md: [["to 'public'"]],
      },
    },
    event: {
      id: "15171804449",
      type: "PublicEvent",
      actor: {
        id: 71980947,
        login: "RegularSpark",
        display_login: "RegularSpark",
        gravatar_id: "",
        url: "https://api.github.com/users/RegularSpark",
        avatar_url: "https://avatars.githubusercontent.com/u/71980947?",
      },
      repo: {
        id: 338492220,
        name: "RegularSpark/wrappedchat",
        url: "https://api.github.com/repos/RegularSpark/wrappedchat",
      },
      payload: {},
      public: true,
      created_at: "2021-02-13T05:22:47Z",
    },
  },
]

export default PublicEventTests
