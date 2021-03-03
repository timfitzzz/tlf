const ReleaseEventTests = {}

ReleaseEventTests["testEvents"] = [
  {
    testStrings: {
      summary: {
        plain:
          "arzrasel published a release EasySwiftUIKit in arzrasel/EasySwiftUIKit",
        md:
          "[arzrasel](https://github.com/arzrasel) published a release [EasySwiftUIKit](https://github.com/arzrasel/EasySwiftUIKit/releases/tag/1.0.3.04) in [arzrasel/EasySwiftUIKit](https://github.com/arzrasel/EasySwiftUIKit)",
      },
      actionTypes: [],
      actor: {
        plain: "arzrasel published",
        md: "[arzrasel](https://github.com/arzrasel) published",
      },
      result: "a release",
      subject: {
        plain: [["EasySwiftUIKit"]],
        md: [
          [
            "[EasySwiftUIKit](https://github.com/arzrasel/EasySwiftUIKit/releases/tag/1.0.3.04)",
          ],
        ],
      },
      target: {
        plain: [["in arzrasel/EasySwiftUIKit"]],
        md: [
          [
            "in [arzrasel/EasySwiftUIKit](https://github.com/arzrasel/EasySwiftUIKit)",
          ],
        ],
      },
    },
    event: {
      id: "15171804410",
      type: "ReleaseEvent",
      actor: {
        id: 77522472,
        login: "arzrasel",
        display_login: "arzrasel",
        gravatar_id: "",
        url: "https://api.github.com/users/arzrasel",
        avatar_url: "https://avatars.githubusercontent.com/u/77522472?",
      },
      repo: {
        id: 330085569,
        name: "arzrasel/EasySwiftUIKit",
        url: "https://api.github.com/repos/arzrasel/EasySwiftUIKit",
      },
      payload: {
        action: "published",
        release: {
          url:
            "https://api.github.com/repos/arzrasel/EasySwiftUIKit/releases/38006213",
          assets_url:
            "https://api.github.com/repos/arzrasel/EasySwiftUIKit/releases/38006213/assets",
          upload_url:
            "https://uploads.github.com/repos/arzrasel/EasySwiftUIKit/releases/38006213/assets{?name,label}",
          html_url:
            "https://github.com/arzrasel/EasySwiftUIKit/releases/tag/1.0.3.04",
          id: 38006213,
          author: {
            login: "arzrasel",
            id: 77522472,
            node_id: "MDQ6VXNlcjc3NTIyNDcy",
            avatar_url: "https://avatars.githubusercontent.com/u/77522472?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/arzrasel",
            html_url: "https://github.com/arzrasel",
            followers_url: "https://api.github.com/users/arzrasel/followers",
            following_url:
              "https://api.github.com/users/arzrasel/following{/other_user}",
            gists_url: "https://api.github.com/users/arzrasel/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/arzrasel/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/arzrasel/subscriptions",
            organizations_url: "https://api.github.com/users/arzrasel/orgs",
            repos_url: "https://api.github.com/users/arzrasel/repos",
            events_url:
              "https://api.github.com/users/arzrasel/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/arzrasel/received_events",
            type: "User",
            site_admin: false,
          },
          node_id: "MDc6UmVsZWFzZTM4MDA2MjEz",
          tag_name: "1.0.3.04",
          target_commitish: "main",
          name: "EasySwiftUIKit",
          draft: false,
          prerelease: false,
          created_at: "2021-02-13T05:19:50Z",
          published_at: "2021-02-13T05:22:46Z",
          assets: [],
          tarball_url:
            "https://api.github.com/repos/arzrasel/EasySwiftUIKit/tarball/1.0.3.04",
          zipball_url:
            "https://api.github.com/repos/arzrasel/EasySwiftUIKit/zipball/1.0.3.04",
          body: "",
        },
      },
      public: true,
      created_at: "2021-02-13T05:22:46Z",
    },
  },
]

export default ReleaseEventTests
