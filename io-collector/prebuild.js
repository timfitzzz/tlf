// const axios = require("axios")
// const fs = require("fs")
// const frontmatter = require("@github-docs/frontmatter")
// const { Octokit } = require("@octokit/rest")
// const { DateTime } = require('luxon')

// // let auth =
// //   process.env.GATSBY_GHREAD_API_KEY ||
// //   "04a9b0d7c9cacb9ea6399846086f478716557b4d"
// // let username = process.env.GATSBY_GHREAD_USERNAME || "timfitzzz"
// // let mdxFolder = `./content/io/`

// // const ioMdxSchema = {
// //   properties: {
// //     templateKey: {
// //       type: "string",
// //       required: true,
// //     },
// //     source: {
// //       type: "string",
// //       required: true,
// //     },
// //     title: {
// //       type: "string",
// //     },
// //     date: {
// //       type: "string",
// //       required: true,
// //     },
// //     description: {
// //       type: "string",
// //     },
// //     URI: {
// //       type: "string",
// //     },
// //     tags: {
// //       type: "array",
// //     },
// //   },
// // }

// // function fetchSoundCloudResource(resource, userID, clientID) {
// //   const url = `https://api.soundcloud.com/users/${userID}${resource}?client_id=${clientID}`
// //   return axios.get(url)
// // }
// // /// get io records list
// // let ioRecordsList = fs.readdirSync(`./content/io`).map(file => {
// //   let fileContent = fs.readFileSync(`./content/io/${file}`, "utf8")
// //   let {data, content, errors } = frontmatter(fileContent)
// //   // if (errors) {
// //   //   console.log(file, errors)
// //   // }
// //   return {
// //     date: new Date(data.date),
// //     templateKey: data.templateKey,
// //     data,
// //     content,
// //     errors,
// //   }
// // })


// // async function getNewGithubRecords() {

// //   // console.log(ioRecordsList)

// //   var lastUpdatedRecord = ioRecordsList
// //     .filter(record => record.templateKey === "github")
// //     .sort((a, b) => new Date(b.date) - new Date(a.date))[0]

// //   console.log(`latest existing github record date: ${lastUpdatedRecord ? lastUpdatedRecord.date : 'none'}`)

// //   var lastUpdated = lastUpdatedRecord
// //     ? new Date(lastUpdatedRecord.date)
// //     : new Date("1/1/1970")

// //   var userEvents = []
// //   var done = false
// //   var page = 1

// //   var octokit = new Octokit({
// //     auth,
// //   })

// //   while (!done) {

// //     let eventsPageConfig = {
// //       method: 'get',
// //       url: `https://api.github.com/users/timfitzzz/events?page=${page}`,
// //       headers: {
// //         'Authorization': `Bearer ${auth}`
// //       }
// //     } 
    
// //     let eventsPage = await axios(eventsPageConfig)



// //     let newEvents = eventsPage.data.filter(
// //       event => {
// //         // console.log(new Date(event.created_at), lastUpdated)
// //         return !!(new Date(event.created_at) > lastUpdated)
// //       }
// //     )

// //     console.log(`found ${newEvents.length} new items on page ${page}`)

// //     if (newEvents.length == 0) {
// //       // console.log("no new events")
// //       done = true
// //     } else {
// //       // console.log("found events: ", newEvents)
// //       newEvents.forEach(event => userEvents.push(event))
// //       page++
// //     }
// //   }

// //   return userEvents
// // }

// // function parseNewGithubRecords(newRecords) {

// //   let sortedRecords = newRecords.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
// //   let weeks = []
// //   let currentWeekIndex = 0

// //   sortedRecords.forEach((record, i) => {

// //     // console.log(weeks)

// //     if (i == 0) {
// //       weeks[0] = [record]
// //     } else {
// //       let createdAt = DateTime.fromISO(record.created_at)
// //       let weekStart = DateTime.fromISO(weeks[currentWeekIndex][0].created_at)
// //       let differenceFromFirstRecord = createdAt.diff(weekStart, ["days"]).days

// //       // console.log(differenceFromFirstRecord)

// //       if (createdAt.diff(weekStart, ["days"]).days > 7) {
// //         currentWeekIndex++
// //         weeks[currentWeekIndex] = [record]
// //       } else {
// //         weeks[currentWeekIndex].push(record)
// //       }
// //     }
// //   })

// //   return weeks

// // }

// // function writeNewRecords(weeks) {

// //     weeks.forEach(week => {

// //       function generateTitle() {

// //         let startDateString = DateTime.fromISO(week[0].created_at).toLocaleString(DateTime.DATE_FULL)
// //         let endDateString = week.length > 1 ? DateTime.fromISO(week[week.length-1].created_at).toLocaleString(DateTime.DATE_FULL) : null

// //         return `${startDateString} ${endDateString && `to ${endDateString}: ${week.length} git events`}`

// //       }


// //       weekFile = "---\r\n"
// //       weekFile += "templateKey: github\r\n"
// //       weekFile += "source: github\r\n"
// //       weekFile += `title: '${generateTitle()}'\r\n`
// //       weekFile += `date: ${week[week.length - 1].created_at}\r\n`
// //       weekFile += `description: week of GitHub activity\r\n`
// //       weekFile += `URI: ${week[0].actor.url}\r\n`
// //       weekFile += `tags: \r\n`
// //       weekFile += `  - GitHub\r\n`
// //       weekFile += `data: ${JSON.stringify(week)}\r\n`
// //       weekFile += `---\r\n`
// //       weekFile += `\r\n` 
// //       week.forEach(event => {

// //         let actorText = `[${event.actor.display_login}](${event.actor.url})`
// //         let repoText = event.repo ? `[${event.repo.url}](${event.repo.name})` : null
// //         let eventVerb = ""
        
// //         switch (event.type) {
// //           case 'PushEvent':
// //             eventVerb = `  - ${actorText} pushed a commit to ${repoText}: \r\n`
// //             event.payload.commits.forEach(commit => eventVerb += `  > ${commit.message}\r\n`)
// //             break;
// //           case 'WatchEvent':
// //             eventVerb = `  - ${actorText} ${event.payload.action} watching a repository: ${repoText}\r\n`
// //             break;
// //           case 'IssuesEvent':
// //             let issueText = `[${event.payload.title}](${event.payload.html_url})`
// //             eventVerb = `  - ${actorText} ${event.payload.action} an issue: ${issueText}\r\n`
// //             eventVerb += `  > ${event.payload.body}\r\n`
// //             break;
// //           case 'IssueCommentEvent':
// //             eventVerb = `  - ${actorText} ${event.payload.action} an issue on ${repoText}\r\n`
// //             eventVerb += `  > #${event.payload.issue.number}: ${event.payload.issue.title}\r\n`
// //             break;
// //           default:
// //             break;
// //         }
// //         weekFile += eventVerb
// //       })

// //       let dateString = DateTime.fromISO(week[week.length - 1].created_at).toFormat(`yyyy-MM-dd`)

// //       fs.writeFileSync(`${mdxFolder}${dateString}-${week.length}_gh_events.mdx`, weekFile)

// //     })

// // }




// // let eventsPageConfig2 = {
// //   method: 'get',
// //   url: `https://api.github.com/users/timfitzzz/events`,
// //   headers: {
// //     'Authorization': `Bearer ${auth}`
// //   },
// //   // params: {
// //   //   page: 1
// //   // }
// // } 


// // axios(eventsPageConfig2).then((res) => console.log(res))


// // axios(eventsPageConfig2).then((res) => console.log(res.data))