const GollumEventTests = {}

GollumEventTests["testEvents"] = {}
GollumEventTests["testEvents"]["multiple"] = [
  {
    testStrings: {
      summary: {
        plain: [
          "kii-chan-reloaded created wiki page Pain in kii-chan-reloaded/GeneticChickengineering",
          "kii-chan-reloaded edited 2 wiki pages in kii-chan-reloaded/GeneticChickengineering",
        ],
        md: [
          "[kii-chan-reloaded](https://github.com/kii-chan-reloaded) created wiki page [Pain](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Pain) in [kii-chan-reloaded/GeneticChickengineering](https://github.com/kii-chan-reloaded/GeneticChickengineering)",
          "[kii-chan-reloaded](https://github.com/kii-chan-reloaded) edited 2 wiki pages in [kii-chan-reloaded/GeneticChickengineering](https://github.com/kii-chan-reloaded/GeneticChickengineering)",
        ],
      },
      content: {
        plain: ["Home", "Settings"],
        md: [
          "[Home](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Home)",
          "[Settings](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Settings)",
        ],
      },
      actor: {
        plain: ["kii-chan-reloaded created", "kii-chan-reloaded edited"],
        md: [
          "[kii-chan-reloaded](https://github.com/kii-chan-reloaded) created",
          "[kii-chan-reloaded](https://github.com/kii-chan-reloaded) edited",
        ],
      },
      result: ["wiki page", "wiki pages"],
      subject: {
        plain: [["Pain"], ["Home", "Settings"]],
        md: [
          [
            "[Pain](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Pain)",
          ],
          [
            "",
            "[Home](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Home)",
            "[Settings](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Settings)",
          ],
        ],
      },
      parent: {
        plain: [
          ["in kii-chan-reloaded/GeneticChickengineering"],
          ["in kii-chan-reloaded/GeneticChickengineering"],
        ],
        md: [
          [
            "in [kii-chan-reloaded/GeneticChickengineering](https://github.com/kii-chan-reloaded/GeneticChickengineering)",
          ],
          [
            "in [kii-chan-reloaded/GeneticChickengineering](https://github.com/kii-chan-reloaded/GeneticChickengineering)",
          ],
        ],
      },
    },
    event: {
      id: "15249156818",
      type: "GollumEvent",
      actor: {
        id: 15570802,
        login: "kii-chan-reloaded",
        display_login: "kii-chan-reloaded",
        gravatar_id: "",
        url: "https://api.github.com/users/kii-chan-reloaded",
        avatar_url: "https://avatars.githubusercontent.com/u/15570802?",
      },
      repo: {
        id: 330191424,
        name: "kii-chan-reloaded/GeneticChickengineering",
        url:
          "https://api.github.com/repos/kii-chan-reloaded/GeneticChickengineering",
      },
      payload: {
        pages: [
          {
            page_name: "Pain",
            title: "Pain",
            summary: null,
            action: "created",
            sha: "000ee63bea0b1033b85af5aa84f68c531ec32e5f",
            html_url:
              "https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Pain",
          },
          {
            page_name: "Home",
            title: "Home",
            summary: null,
            action: "edited",
            sha: "000ee63bea0b1033b85af5aa84f68c531ec32e5f",
            html_url:
              "https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Home",
          },
          {
            page_name: "Settings",
            title: "Settings",
            summary: null,
            action: "edited",
            sha: "000ee63bea0b1033b85af5aa84f68c531ec32e5f",
            html_url:
              "https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Settings",
          },
        ],
      },
      public: true,
      created_at: "2021-02-19T19:11:30Z",
    },
  },
]

GollumEventTests["testEvents"]["created"] = [
  {
    testStrings: {
      summary: {
        plain:
          "kii-chan-reloaded created wiki page Pain in kii-chan-reloaded/GeneticChickengineering",
        md:
          "[kii-chan-reloaded](https://github.com/kii-chan-reloaded) created wiki page [Pain](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Pain) in [kii-chan-reloaded/GeneticChickengineering](https://github.com/kii-chan-reloaded/GeneticChickengineering)",
      },
      content: {
        plain: [],
        md: [],
      },
      actor: {
        plain: "kii-chan-reloaded created",
        md: "[kii-chan-reloaded](https://github.com/kii-chan-reloaded) created",
      },
      result: "wiki page",
      subject: {
        plain: [["Pain"]],
        md: [
          [
            "[Pain](https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Pain)",
          ],
        ],
      },
      parent: {
        plain: [["in kii-chan-reloaded/GeneticChickengineering"]],
        md: [
          [
            "in [kii-chan-reloaded/GeneticChickengineering](https://github.com/kii-chan-reloaded/GeneticChickengineering)",
          ],
        ],
      },
    },
    event: {
      id: "15249156818",
      type: "GollumEvent",
      actor: {
        id: 15570802,
        login: "kii-chan-reloaded",
        display_login: "kii-chan-reloaded",
        gravatar_id: "",
        url: "https://api.github.com/users/kii-chan-reloaded",
        avatar_url: "https://avatars.githubusercontent.com/u/15570802?",
      },
      repo: {
        id: 330191424,
        name: "kii-chan-reloaded/GeneticChickengineering",
        url:
          "https://api.github.com/repos/kii-chan-reloaded/GeneticChickengineering",
      },
      payload: {
        pages: [
          {
            page_name: "Pain",
            title: "Pain",
            summary: null,
            action: "created",
            sha: "000ee63bea0b1033b85af5aa84f68c531ec32e5f",
            html_url:
              "https://github.com/kii-chan-reloaded/GeneticChickengineering/wiki/Pain",
          },
        ],
      },
      public: true,
      created_at: "2021-02-19T19:11:30Z",
    },
  },
]

GollumEventTests["testEvents"]["edited"] = [
  {
    testStrings: {
      summary: {
        plain:
          "songkwwwwwww edited wiki page 데이터베이스 인터널스 Chap3 파일 포맷 in songkwwwwwww/study",
        md:
          "[songkwwwwwww](https://github.com/songkwwwwwww) edited wiki page [데이터베이스 인터널스 Chap3 파일 포맷](https://github.com/songkwwwwwww/study/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%9D%B8%ED%84%B0%EB%84%90%EC%8A%A4-Chap3-%ED%8C%8C%EC%9D%BC-%ED%8F%AC%EB%A7%B7) in [songkwwwwwww/study](https://github.com/songkwwwwwww/study)",
      },
      actor: {
        plain: "songkwwwwwww edited",
        md: "[songkwwwwwww](https://github.com/songkwwwwwww) edited",
      },
      result: "wiki page",
      subject: {
        plain: [["데이터베이스 인터널스 Chap3 파일 포맷"]],
        md: [
          [
            "[데이터베이스 인터널스 Chap3 파일 포맷](https://github.com/songkwwwwwww/study/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%9D%B8%ED%84%B0%EB%84%90%EC%8A%A4-Chap3-%ED%8C%8C%EC%9D%BC-%ED%8F%AC%EB%A7%B7)",
          ],
        ],
      },
      parent: {
        plain: [["in songkwwwwwww/study"]],
        md: [
          ["in [songkwwwwwww/study](https://github.com/songkwwwwwww/study)"],
        ],
      },
    },
    event: {
      id: "15171804351",
      type: "GollumEvent",
      actor: {
        id: 13285738,
        login: "songkwwwwwww",
        display_login: "songkwwwwwww",
        gravatar_id: "",
        url: "https://api.github.com/users/songkwwwwwww",
        avatar_url: "https://avatars.githubusercontent.com/u/13285738?",
      },
      repo: {
        id: 63380078,
        name: "songkwwwwwww/study",
        url: "https://api.github.com/repos/songkwwwwwww/study",
      },
      payload: {
        pages: [
          {
            page_name: "데이터베이스-인터널스-Chap3-파일-포맷",
            title: "데이터베이스 인터널스 Chap3 파일 포맷",
            summary: null,
            action: "edited",
            sha: "d73197027f9fc244d807517f89710f3e04deb948",
            html_url:
              "https://github.com/songkwwwwwww/study/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%9D%B8%ED%84%B0%EB%84%90%EC%8A%A4-Chap3-%ED%8C%8C%EC%9D%BC-%ED%8F%AC%EB%A7%B7",
          },
        ],
      },
      public: true,
      created_at: "2021-02-13T05:22:45Z",
    },
  },
]

export default GollumEventTests
