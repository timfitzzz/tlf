import {
  entityRef,
  getActorVerbText,
  getEntityText,
  getEventSummary,
  getResult,
  getVerb,
} from "../collectors/github/eventPaths"
import { GithubEvent } from "../collectors/github/types"
const {
  getEntityProps,
  getActorProps,
  eventPaths,
} = require("../collectors/github/eventPaths.ts")

const { events } = require("./utils/getEvents")

// const timTestEvents = JSON.parse(
//   fs.readFileSync(__dirname + "/testEventsData.json")
// )

// const getTestEventsForGithub = require(__dirname + "/getTestEventsForGithub.ts")
//   .default

// let eventSubjectProps = getEntityProps(timTestEvents[0], "subject")
// let eventTargetProps = getEntityProps(timTestEvents[0], "target")
// let eventParentProps = getEntityProps(timTestEvents[0], "parent")

// console.log(eventSubjectProps)
// console.log(eventTargetProps)
// console.log(eventParentProps)
// let eventTypes = Object.getOwnPropertyNames(eventPaths)
// let retrievedTypes = fs.readdirSync(__dirname + "/ghevents/").map(fileName => {
//   return fileName.split(".")[0]
// })

events.forEach((event: GithubEvent) => {
  let entityRoles = ["subject", "target", "parent"]
  let paths = eventPaths[event.type]

  describe(`${event.type} deconstruction`, () => {
    it("has paths defined in provided eventPaths", () => {
      expect(paths).not.toBeUndefined()
      expect(paths).not.toBeNull()
    })

    describe("event actor", () => {
      const actor = getActorProps(event)

      it("should have an actor id", () => {
        expect(actor.id).not.toBeUndefined()
        expect(actor.id).not.toBeNull()
      })

      it("should have a url that matches expected scheme", () => {
        expect(actor.url).not.toBeUndefined()
        expect(actor.url).not.toBeNull()
        if (actor.url.indexOf("github.com/apps") === -1) {
          expect(actor.url).toEqual(`https://github.com/${actor.id}`)
        } else {
          expect(actor.url).toContain(`https://github.com/apps`)
        }
      })
    })

    describe("event verb", () => {
      const verb = getVerb(event)

      it("should exist", () => {
        expect(verb).not.toBeUndefined()
        expect(verb).not.toBeNull()
      })
    })

    describe("event result noun", () => {
      const singleResult = getResult(event)
      const pluralResult = getResult(event, true)

      it("should exist for both single and plural forms", () => {
        expect(singleResult).not.toBeNull()
        expect(pluralResult).not.toBeUndefined()
      })
    })

    describe("entity properties", () => {
      entityRoles
        .filter(role => !!paths[role])
        .forEach(entityRole => {
          describe(`it should return props for all ${entityRole} properties defined in eventPaths`, () => {
            let rolePaths: entityRef
            let rolePathProps: string[] = []

            if (Array.isArray(paths[entityRole])) {
              rolePaths = paths[entityRole][1]
              rolePathProps = Object.getOwnPropertyNames(rolePaths)

              let entityPropSets = getEntityProps(event, entityRole)

              entityPropSets.forEach((entityPropSet, key) => {
                rolePathProps.forEach(rolePathProp => {
                  it(`returns a ${rolePathProp} prop for set '${key}`, () => {
                    expect(entityPropSet[rolePathProp]).not.toBeNull()
                    expect(entityPropSet[rolePathProp]).not.toBeUndefined()
                  })
                })
              })
            } else if (!paths[entityRole].id) {
              rolePaths = paths[entityRole][event.payload.action]
              if (rolePaths) {
                rolePathProps = Object.getOwnPropertyNames(rolePaths)

                let entityPropSet = getEntityProps(event, entityRole)
                rolePathProps.forEach(rolePathProp => {
                  it(`returns a ${rolePathProp} prop`, () => {
                    expect(entityPropSet[rolePathProp]).not.toBeNull()
                    expect(entityPropSet[rolePathProp]).not.toBeUndefined()
                  })
                })
              }
            } else {
              rolePaths = paths[entityRole]
              rolePathProps = Object.getOwnPropertyNames(rolePaths)

              let entityPropSet = getEntityProps(event, entityRole)
              rolePathProps.forEach(rolePathProp => {
                it(`returns a ${rolePathProp} prop`, () => {
                  expect(entityPropSet[rolePathProp]).not.toBeNull()
                  expect(entityPropSet[rolePathProp]).not.toBeUndefined()
                })
              })
            }
          })
        })
    })
  })

  function defaultActorTestStrings(verb: string) {
    return {
      plain: `timfitzzz ${verb}`,
      md: `[timfitzzz](https://github.com/timfitzzz) ${verb}`,
    }
  }

  let testStrings = {
    CommitCommentEvent: {
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
    CreateEvent: {
      summary: {
        plain:
          "timfitzzz created a branch newPlatformDesign in timfitzzz/nursefornyc",
        md:
          "[timfitzzz](https://github.com/timfitzzz) created a branch newPlatformDesign in [timfitzzz/nursefornyc](https://github.com/timfitzzz/nursefornyc)",
      },
      actor: defaultActorTestStrings("created"),
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
    DeleteEvent: {
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
    ForkEvent: {
      summary: {
        plain:
          "shangow forked a repo errodringer/ransomware to new repo shangow/ransomware",
        md:
          "[shangow](https://github.com/shangow) forked a repo [errodringer/ransomware](https://github.com/errodringer/ransomware) to new repo [shangow/ransomware](https://github.com/shangow/ransomware)",
      },
      actor: {
        plain: "shangow forked",
        md: "[shangow](https://github.com/shangow) forked",
      },
      result: "a repo",
      subject: {
        plain: [["errodringer/ransomware"]],
        md: [
          [
            "[errodringer/ransomware](https://github.com/errodringer/ransomware)",
          ],
        ],
      },
      target: {
        plain: [["to new repo shangow/ransomware"]],
        md: [
          [
            "to new repo [shangow/ransomware](https://github.com/shangow/ransomware)",
          ],
        ],
      },
    },
    GollumEvent: {
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
    IssueCommentEvent: {
      summary: {
        plain:
          "timfitzzz created comment 751514653 on issue set up test mongodb database in timfitzzz/stemmy",
        md:
          "[timfitzzz](https://github.com/timfitzzz) created comment [751514653](https://github.com/timfitzzz/stemmy/issues/13#issuecomment-751514653) on issue [set up test mongodb database](https://github.com/timfitzzz/stemmy/issues/13) in [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)",
      },
      actor: defaultActorTestStrings("created"),
      result: "comment",
      subject: {
        plain: [
          [
            "751514653",
            "done, will include settings in commit. env file needed for creds and test server configuration.",
          ],
        ],
        md: [
          [
            "[751514653](https://github.com/timfitzzz/stemmy/issues/13#issuecomment-751514653)",
            "done, will include settings in commit. env file needed for creds and test server configuration.",
          ],
        ],
      },
      target: {
        plain: [["on issue set up test mongodb database"]],
        md: [
          [
            "on issue [set up test mongodb database](https://github.com/timfitzzz/stemmy/issues/13)",
          ],
        ],
      },
      parent: {
        plain: [["in timfitzzz/stemmy"]],
        md: [["in [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)"]],
      },
    },
    IssuesEvent: {
      summary: {
        plain:
          "timfitzzz closed issue set up test mongodb database in timfitzzz/stemmy",
        md:
          "[timfitzzz](https://github.com/timfitzzz) closed issue [set up test mongodb database](https://github.com/timfitzzz/stemmy/issues/13) in [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)",
      },
      actor: defaultActorTestStrings("closed"),
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
    MemberEvent: {
      summary: {
        plain: "timfitzzz granted access for user rf- to timfitzzz/stemmy",
        md:
          "[timfitzzz](https://github.com/timfitzzz) granted access for user [rf-](https://github.com/rf-) to [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)",
      },
      actor: defaultActorTestStrings("granted"),
      result: "access",
      subject: {
        plain: [["for user rf-"]],
        md: [["for user [rf-](https://github.com/rf-)"]],
      },
      target: {
        plain: [["to timfitzzz/stemmy"]],
        md: [["to [timfitzzz/stemmy](https://github.com/timfitzzz/stemmy)"]],
      },
    },
    PublicEvent: {
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
    PullRequestEvent: {
      summary: {
        plain:
          "timfitzzz closed pull request Bringing up to date with current version in timfitzzz/gatsby-theme-localization",
        md:
          "[timfitzzz](https://github.com/timfitzzz) closed pull request [Bringing up to date with current version](https://github.com/timfitzzz/gatsby-theme-localization/pull/1) in [timfitzzz/gatsby-theme-localization](https://github.com/timfitzzz/gatsby-theme-localization)",
      },
      actor: defaultActorTestStrings("closed"),
      result: "pull request",
      subject: {
        plain: [["Bringing up to date with current version"]],
        md: [
          [
            "[Bringing up to date with current version](https://github.com/timfitzzz/gatsby-theme-localization/pull/1)",
          ],
        ],
      },
      target: {
        plain: [[""]],
        md: [[""]],
      },
      parent: {
        plain: [["in timfitzzz/gatsby-theme-localization"]],
        md: [
          [
            "in [timfitzzz/gatsby-theme-localization](https://github.com/timfitzzz/gatsby-theme-localization)",
          ],
        ],
      },
    },
    PullRequestReviewCommentEvent: {
      summary: {
        plain:
          "paq added a comment 575624667 on pull request avm2: Implement ByteArray in ruffle-rs/ruffle",
        md:
          "[paq](https://github.com/paq) added a comment [575624667](https://github.com/ruffle-rs/ruffle/pull/3213#discussion_r575624667) on pull request [avm2: Implement ByteArray](https://github.com/ruffle-rs/ruffle/pull/3213) in [ruffle-rs/ruffle](https://github.com/ruffle-rs/ruffle)",
      },
      actor: {
        plain: "paq added",
        md: "[paq](https://github.com/paq) added",
      },
      result: "a comment",
      subject: {
        plain: [
          [
            "575624667",
            'It seems that `coerce_to_string` is necessary here as well.\r\n\r\nTest code\r\n```as\r\nimport flash.utils.ByteArray;\r\nimport flash.utils.Endian;\r\n\r\nclass A {\r\n    public function A() {}\r\n    public function toString():String {\r\n        return "shift-jis";\r\n    }\r\n}\r\n\r\nvar test = new ByteArray();\r\ntest.writeMultiByte("次", new A());\r\ntest.position = 0;\r\ntrace(test.readMultiByte(2, "shift-jis"));\r\n```\r\n\r\nFlash player prints `次`.\r\nRuffle prints `谺`.\r\n',
          ],
        ],
        md: [
          [
            "[575624667](https://github.com/ruffle-rs/ruffle/pull/3213#discussion_r575624667)",
            'It seems that `coerce_to_string` is necessary here as well.\r\n\r\nTest code\r\n```as\r\nimport flash.utils.ByteArray;\r\nimport flash.utils.Endian;\r\n\r\nclass A {\r\n    public function A() {}\r\n    public function toString():String {\r\n        return "shift-jis";\r\n    }\r\n}\r\n\r\nvar test = new ByteArray();\r\ntest.writeMultiByte("次", new A());\r\ntest.position = 0;\r\ntrace(test.readMultiByte(2, "shift-jis"));\r\n```\r\n\r\nFlash player prints `次`.\r\nRuffle prints `谺`.\r\n',
          ],
        ],
      },
      target: {
        plain: [["on pull request avm2: Implement ByteArray"]],
        md: [
          [
            "on pull request [avm2: Implement ByteArray](https://github.com/ruffle-rs/ruffle/pull/3213)",
          ],
        ],
      },
      parent: {
        plain: [["in ruffle-rs/ruffle"]],
        md: [["in [ruffle-rs/ruffle](https://github.com/ruffle-rs/ruffle)"]],
      },
    },
    PullRequestReviewEvent: {
      summary: {
        plain:
          "Grandolf49 added a review 589944777 of a pull request (470196126) in openMF/android-client",
        md:
          "[Grandolf49](https://github.com/Grandolf49) added a review [589944777](https://github.com/openMF/android-client/pull/1539#pullrequestreview-589944777) of [a pull request](https://github.com/openMF/android-client/pull/1539) in [openMF/android-client](https://github.com/openMF/android-client)",
      },
      actor: {
        plain: "Grandolf49 added",
        md: "[Grandolf49](https://github.com/Grandolf49) added",
      },
      result: "a review",
      subject: {
        plain: [
          [
            "589944777",
            "@robustTechie We'll need to remove the `mifosng-android/gradle/wrapper/gradle-wrapper.jar` as well!",
          ],
        ],
        md: [
          [
            "[589944777](https://github.com/openMF/android-client/pull/1539#pullrequestreview-589944777)",
            "@robustTechie We'll need to remove the `mifosng-android/gradle/wrapper/gradle-wrapper.jar` as well!",
          ],
        ],
      },
      target: {
        plain: [["of a pull request (470196126)"]],
        md: [
          [
            "of [a pull request](https://github.com/openMF/android-client/pull/1539)",
          ],
        ],
      },
      parent: {
        plain: [["in openMF/android-client"]],
        md: [
          [
            "in [openMF/android-client](https://github.com/openMF/android-client)",
          ],
        ],
      },
    },
    PushEvent: {
      summary: {
        plain:
          "timfitzzz pushed commit d4e5d71da8b6cd7b169c090458142527eeb3c0af to timfitzzz/nursefornyc",
        md:
          "[timfitzzz](https://github.com/timfitzzz) pushed commit [d4e5d71da8b6cd7b169c090458142527eeb3c0af](https://github.com/timfitzzz/nursefornyc/commits/d4e5d71da8b6cd7b169c090458142527eeb3c0af) to [timfitzzz/nursefornyc](https://github.com/timfitzzz/nursefornyc)",
      },
      actor: defaultActorTestStrings("pushed"),
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
    ReleaseEvent: {
      summary: {
        plain:
          "arzrasel published a release EasySwiftUIKit in arzrasel/EasySwiftUIKit",
        md:
          "[arzrasel](https://github.com/arzrasel) published a release [EasySwiftUIKit](https://github.com/arzrasel/EasySwiftUIKit/releases/tag/1.0.3.04) in [arzrasel/EasySwiftUIKit](https://github.com/arzrasel/EasySwiftUIKit)",
      },
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
    WatchEvent: {
      summary: {
        plain:
          "timfitzzz started watching repository mohebifar/react-use-context-selector",
        md:
          "[timfitzzz](https://github.com/timfitzzz) started watching repository [mohebifar/react-use-context-selector](https://github.com/mohebifar/react-use-context-selector)",
      },
      actor: defaultActorTestStrings("started"),
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
  }

  describe(`${event.type} language generation`, () => {
    // let paths = eventPaths[event.type]

    function isDefined(prop) {
      return !!(
        testStrings &&
        testStrings[event.type] &&
        testStrings[event.type][prop] &&
        testStrings[event.type][prop].plain &&
        testStrings[event.type][prop].md
      )
    }

    describe(`${event.type} actor-verb generator`, () => {
      it("should have actor-verb test strings defined", () => {
        expect(isDefined("actor")).toBe(true)
      })

      if (isDefined("actor")) {
        it("should return the correct strings in both plain and md formats", () => {
          expect(getActorVerbText(event)).toEqual(
            testStrings[event.type].actor.plain
          )
          expect(getActorVerbText(event, { md: true })).toEqual(
            testStrings[event.type].actor.md
          )
        })
      }
    })

    // console.log(getEntityText(event, "subject"))

    describe(`${event.type} entity text generator`, () => {
      entityRoles
        .filter(role => !!paths[role]) // only test roles actually defined for this entity
        .forEach(role => {
          it(`should have test strings defined for ${role} entity`, () => {
            expect(isDefined(role)).toBe(true)
          })

          if (isDefined(role)) {
            describe(`${event.type} ${role} text generator`, () => {
              describe("plaintext output", () => {
                let plaintext: string[][] = getEntityText(event, role)

                plaintext.forEach((set, i) => {
                  // console.log(set)
                  let [summary, ...content] = set
                  describe(`the summary text for item ${i}`, () => {
                    it("should match expected text", () => {
                      expect(summary).toEqual(
                        testStrings[event.type][role]["plain"][i][0]
                      )
                    })
                  })

                  if (content && content.length > 0) {
                    if (Array.isArray(content)) {
                      content.forEach((contentLine, j) => {
                        describe(`the content line ${j}`, () => {
                          it("should match expected text", () => {
                            expect(contentLine).toEqual(
                              testStrings[event.type][role]["plain"][i][j + 1]
                            )
                          })
                        })
                      })
                    } else {
                      describe(`the content line 1`, () => {
                        it("should match expected text", () => {
                          expect(content).toEqual(
                            testStrings[event.type][role]["plain"][i][1]
                          )
                        })
                      })
                    }
                  }
                })
              })

              describe("markdown output", () => {
                let md: string[][] = getEntityText(event, role, { md: true })

                md.forEach((set, i) => {
                  let [summary, ...content] = set
                  describe(`the summary text for item ${i}`, () => {
                    it("should match expected text", () => {
                      expect(summary).toEqual(
                        testStrings[event.type][role]["md"][i][0]
                      )
                    })
                  })

                  if (content && content.length > 0) {
                    if (Array.isArray(content)) {
                      content.forEach((contentLine, j) => {
                        describe(`the content line ${j}`, () => {
                          it("should match expected text", () => {
                            expect(contentLine).toEqual(
                              testStrings[event.type][role]["md"][i][j + 1]
                            )
                          })
                        })
                      })
                    } else {
                      describe(`the content line 1`, () => {
                        it("should match expected text", () => {
                          expect(content).toEqual(
                            testStrings[event.type][role]["md"][i][1]
                          )
                        })
                      })
                    }
                  }
                })
              })
            })
          }
        })
    })

    describe("event summary line generation", () => {
      it("should have test strings defined for the plaintext summary", () => {
        expect(testStrings[event.type].summary.plain).toBeDefined()
      })

      if (testStrings[event.type].summary.plain) {
        it("should generate the expected plaintext summary for the event", () => {
          let summary = getEventSummary(event, { md: false })
          expect(summary).toEqual(testStrings[event.type].summary.plain)
        })
      }

      it("should have test strings defined for the markdown summary", () => {
        expect(testStrings[event.type].summary.md).toBeDefined()
      })

      if (testStrings[event.type].summary.md) {
        it("should generate the expected md summary for the event", () => {
          let summary = getEventSummary(event, { md: true })
          expect(summary).toEqual(testStrings[event.type].summary.md)
        })
      }
    })
  })
})
