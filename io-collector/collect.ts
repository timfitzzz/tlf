const fs = require("fs")
const frontmatter = require("@github-docs/frontmatter")
const { ioCollectorOptions } = require("./config")
const { collectGithub, collectSoundCloud } = require("./collectors/index")

export interface IioRecordsListItem {
  date: Date
  templateKey: string
  data: { [key: string]: any }
  content: string
  errors: string[]
}

export interface ICollector {
  [key: string]: any
  mdxFolder: string
  ioRecordsList: IioRecordsListItem[]
}

const collectors = {
  github: collectGithub as ICollector,
  soundcloud: collectSoundCloud as ICollector,
}

/// get io records list
export const ioRecordsList = fs.readdirSync(`./content/io`).map(file => {
  let fileContent = fs.readFileSync(`./content/io/${file}`, "utf8")
  let { data, content, errors } = frontmatter(fileContent)
  return {
    date: new Date(data.date),
    templateKey: data.templateKey,
    data,
    content,
    errors,
  }
})

export function collect() {
  ioCollectorOptions.collectors.forEach((collector: ICollector) => {
    let config = {
      ...collector.config,
      mdxFolder: ioCollectorOptions.mdxFolder,
      ioRecordsList,
    }
    collectors[collector.name](config)
  })
}
