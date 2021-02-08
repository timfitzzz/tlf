import { IOMDXRecord } from "./types"

function escapeString(string: string): string {
  return string.replace(/["]/g, (c: '"') => ({ '"': '\\"' }[c]))
}

export function generateIOMDXFileContents(recordObject: IOMDXRecord): string {
  let IOMDXFile = `---\r\n`
  IOMDXFile += `templateKey: ${recordObject.templateKey}\r\n`
  IOMDXFile += `source: ${recordObject.source}\r\n`
  IOMDXFile += `title: "${escapeString(recordObject.title)}"\r\n`
  IOMDXFile += `date: ${recordObject.date}\r\n`
  IOMDXFile += `description: "${escapeString(
    recordObject.description ? recordObject.description : ""
  )}"\r\n`
  IOMDXFile += `URI: ${recordObject.URI}\r\n`
  IOMDXFile += `tags: \r\n`
  recordObject.tags.forEach(tag => (IOMDXFile += `  - '${tag}'\r\n`))
  // IOMDXFile += `data: ${recordObject.data}\r\n`
  IOMDXFile += `---\r\n`
  IOMDXFile += `\r\n`
  recordObject.body.forEach(bodyLine => (IOMDXFile += `${bodyLine}\r\n`))

  return IOMDXFile
}
