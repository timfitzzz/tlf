import { Location, LocationState } from "history"
import { graphql, StaticQuery } from "gatsby"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import { HeaderSlashCard } from "./HeaderSlashCard"
import InternalProvider from "gatsby-plugin-transition-link/context/InternalProvider"

export const MenuRootContainer = ({
  location,
}: {
  location: Location<LocationState>
}) => {
  const { w } = WindowConfig.useContainer()

  return (
    <InternalProvider>
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
          <HeaderSlashCard windowWidth={w} data={data} location={location} />
        )}
      />
    </InternalProvider>
  )
}
