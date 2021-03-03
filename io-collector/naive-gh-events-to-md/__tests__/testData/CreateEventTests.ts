const CreateEventTests = {}

CreateEventTests["testEvents"] = {}
CreateEventTests["testEvents"]["branch"] = [
  {
    testStrings: {
      summary: {
        plain:
          "timfitzzz created a branch newPlatformDesign in timfitzzz/nursefornyc",
        md:
          "[timfitzzz](https://github.com/timfitzzz) created a branch newPlatformDesign in [timfitzzz/nursefornyc](https://github.com/timfitzzz/nursefornyc)",
      },
      actionTypes: ["branch"],
      actor: {
        plain: `timfitzzz created`,
        md: `[timfitzzz](https://github.com/timfitzzz) created`,
      },
      result: "a branch",
      subject: {
        plain: [["newPlatformDesign"]],
        md: [["newPlatformDesign"]],
      },
      parent: {
        plain: [["in timfitzzz/nursefornyc"]],
        md: [
          [
            "in [timfitzzz/nursefornyc](https://github.com/timfitzzz/nursefornyc)",
          ],
        ],
      },
    },
    event: {
      id: "14943514016",
      type: "CreateEvent",
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
        ref: "newPlatformDesign",
        ref_type: "branch",
        master_branch: "master",
        description: "Sandy Nurse for NY City Council campaign site",
        pusher_type: "user",
      },
      public: false,
      created_at: "2021-01-25T23:13:10Z",
    },
  },
]

export default CreateEventTests
