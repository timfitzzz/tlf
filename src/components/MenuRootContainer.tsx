import { Location, LocationState } from "history"
import { graphql, StaticQuery } from "gatsby"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import { HeaderSlashCard } from "./HeaderSlashCard"

export const MenuRootContainer = ({
  location,
}: {
  location: Location<LocationState>
}) => {
  const { w, h } = WindowConfig.useContainer()

  return (
    <StaticQuery
      query={graphql`
        query SectionsQuery {
          allMdx(filter: { fileAbsolutePath: { regex: "/content/mdx/" } }) {
            edges {
              node {
                fields {
                  route
                }
                frontmatter {
                  title
                  path
                }
                code {
                  body
                }
              }
            }
          }
        }
      `}
      render={data => (
        <HeaderSlashCard
          windowWidth={w}
          windowHeight={h}
          data={data}
          location={location}
        />
      )}
    />
  )
}
