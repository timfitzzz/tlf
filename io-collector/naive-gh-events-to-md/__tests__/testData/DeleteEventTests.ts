const DeleteEventTests = {}

DeleteEventTests["testEvents"] = {}
DeleteEventTests["testEvents"]["branch"] = [
  {
    testStrings: {
      summary: {
        plain:
          "rixtech deleted a branch feature/dirs-with-spaces in rixtech/webp2gif",
        md:
          "[rixtech](https://github.com/rixtech) deleted a branch feature/dirs-with-spaces in [rixtech/webp2gif](https://github.com/rixtech/webp2gif)",
      },
      actor: {
        plain: "rixtech deleted",
        md: "[rixtech](https://github.com/rixtech) deleted",
      },
      result: "a branch",
      subject: {
        plain: [["feature/dirs-with-spaces"]],
        md: [["feature/dirs-with-spaces"]],
      },
      parent: {
        plain: [["in rixtech/webp2gif"]],
        md: [["in [rixtech/webp2gif](https://github.com/rixtech/webp2gif)"]],
      },
    },
    event: {
      id: "15171804601",
      type: "DeleteEvent",
      actor: {
        id: 13712342,
        login: "rixtech",
        display_login: "rixtech",
        gravatar_id: "",
        url: "https://api.github.com/users/rixtech",
        avatar_url: "https://avatars.githubusercontent.com/u/13712342?",
      },
      repo: {
        id: 334330660,
        name: "rixtech/webp2gif",
        url: "https://api.github.com/repos/rixtech/webp2gif",
      },
      payload: {
        ref: "feature/dirs-with-spaces",
        ref_type: "branch",
        pusher_type: "user",
      },
      public: true,
      created_at: "2021-02-13T05:22:50Z",
    },
  },
]

export default DeleteEventTests
