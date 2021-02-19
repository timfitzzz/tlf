/* eslint-disable */

const axios = require("axios")
const fs = require("fs")

var getConfig = () => ({
  method: "get",
  url: `https://api.github.com/events`,
  headers: {
    Authorization: "Bearer 04a9b0d7c9cacb9ea6399846086f478716557b4d",
  },
})

export default async function getTestEventsForGithub(
  eventTypes: string[],
  foundTypes: string[] = [],
  nextPage: number = 1
) {
  function allFound(): boolean {
    return eventTypes.reduce((acc, type) => {
      if (foundTypes.indexOf(type) === -1) {
        return false
      } else {
        return acc
      }
    }, true)
  }

  if (allFound()) {
    console.log("all types found")
    return
  } else {
    axios(getConfig())
      .then(function(response) {
        response.data.forEach(async event => {
          if (foundTypes.indexOf(event.type) === -1) {
            console.log("found ", event.type, ", writing")
            foundTypes.push(event.type)
            fs.writeFileSync(
              `${__dirname}/ghevents/${event.type}.json`,
              JSON.stringify(event)
            )
            console.log(`wrote ${event.type}`)
          }
          await new Promise(r => setTimeout(r, 10000))
          return getTestEventsForGithub(eventTypes, foundTypes, nextPage++)
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

// console.log("starting with the following types logged: ", foundTypes)
// console.log(
//   "looking for the following types: ",
//   eventTypes.filter(type => !!(foundTypes.indexOf(type) === -1))
// )

// // .split(".")[0]

// // foundTypes = foundTypes.concat(retrievedTypes)

// getTestEventsForGithub(eventTypes, foundTypes)

// retrievedTypes.

// timTestEvents.forEach(event => {
//   if (foundTypes.indexOf(event.type) === -1) {
//     foundTypes.push(event.type)
//     fs.writeFileSync(
//       __dirname + "/ghevents/" + event.type + ".json",
//       JSON.stringify(event)
//     )
//   }
// })
