const path = require("path")

export const ioMdxSchema = {
  properties: {
    templateKey: {
      type: "string",
      required: true,
    },
    source: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
    },
    date: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    URI: {
      type: "string",
    },
    tags: {
      type: "array",
    },
  },
}

const collectors = [
  {
    name: "github",
    config: {
      personalAccessToken: process.env.GATSBY_GITHUB_PAT || "000",
      username: process.env.GATSBY_GITHUB_USERNAME || "timfitzzz",
    },
  },
  {
    name: "soundcloud",
    config: {
      apiKey: process.env.GATSBY_SC_APIKEY,
      usersToScrape: ["parker-bird", "dicey-troop"],
    },
  },
]

export const ioCollectorOptions = {
  collectors,
  mdxFolder: path.resolve(`./content/io/`),
}
