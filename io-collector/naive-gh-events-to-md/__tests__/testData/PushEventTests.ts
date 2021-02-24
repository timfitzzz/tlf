const PushEventTests = {}

PushEventTests["testEvents"] = {}
PushEventTests["testEvents"] = [
  {
    testStrings: {
      summary: {
        plain:
          "timfitzzz pushed commit d4e5d71da8b6cd7b169c090458142527eeb3c0af to timfitzzz/nursefornyc",
        md:
          "[timfitzzz](https://github.com/timfitzzz) pushed commit [d4e5d71da8b6cd7b169c090458142527eeb3c0af](https://github.com/timfitzzz/nursefornyc/commits/d4e5d71da8b6cd7b169c090458142527eeb3c0af) to [timfitzzz/nursefornyc](https://github.com/timfitzzz/nursefornyc)",
      },
      actor: {
        plain: `timfitzzz pushed`,
        md: `[timfitzzz](https://github.com/timfitzzz) pushed`,
      },
      result: "commit",
      subject: {
        plain: [
          [
            "d4e5d71da8b6cd7b169c090458142527eeb3c0af",
            "Added Labor Unions/Sindicals to endorsement section titles",
          ],
        ],
        md: [
          [
            "[d4e5d71da8b6cd7b169c090458142527eeb3c0af](https://github.com/timfitzzz/nursefornyc/commits/d4e5d71da8b6cd7b169c090458142527eeb3c0af)",
            "Added Labor Unions/Sindicals to endorsement section titles",
          ],
        ],
      },
      target: {
        plain: [["to timfitzzz/nursefornyc"]],
        md: [
          [
            "to [timfitzzz/nursefornyc](https://github.com/timfitzzz/nursefornyc)",
          ],
        ],
      },
    },
    event: {
      id: "15110828004",
      type: "PushEvent",
      actor: {
        id: 3611294,
        login: "timfitzzz",
        display_login: "timfitzzz",
        gravatar_id: "",
        url: "https://api.github.com/users/timfitzzz",
        avatar_url: "https://avatars.githubusercontent.com/u/3611294?",
      },
      repo: {
        id: 277394326,
        name: "timfitzzz/nursefornyc",
        url: "https://api.github.com/repos/timfitzzz/nursefornyc",
      },
      payload: {
        push_id: 6496663910,
        size: 1,
        distinct_size: 1,
        ref: "refs/heads/master",
        head: "d4e5d71da8b6cd7b169c090458142527eeb3c0af",
        before: "b8fe3cfef2055a150b3af1c9d47911d1d0368c65",
        commits: [
          {
            sha: "d4e5d71da8b6cd7b169c090458142527eeb3c0af",
            author: { email: "diceytroop@gmail.com", name: "Tim Fitzgerald" },
            message:
              "Added Labor Unions/Sindicals to endorsement section titles",
            distinct: true,
            url:
              "https://api.github.com/repos/timfitzzz/nursefornyc/commits/d4e5d71da8b6cd7b169c090458142527eeb3c0af",
          },
        ],
      },
      public: false,
      created_at: "2021-02-08T19:45:37Z",
    },
  },
]

export default PushEventTests
