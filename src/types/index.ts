// eslint-disable @typescript-eslint/interface-name-prefix
export interface ISectionEdge {
  node: {
    frontmatter: {
      title: string
    }
    code: {
      body: string
    }
  }
  title: string
  pathName: string
  body: string
}
