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
  const { w, h } = WindowConfig.useContainer() as { h: number; w: number }
  // eslint-disable-next-line

  return (
    <StaticQuery
      query={graphql`
        query timImageAndSectionsQuery {
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
                body
              }
            }
          }
          allImageSharp(
            filter: { resize: { src: { regex: "/(tim-photo-cutout-bw)/" } } }
          ) {
            edges {
              node {
                id
                resize(width: 240) {
                  src
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <HeaderSlashCard
          headerImageUrl={data.allImageSharp.edges[0].node.resize.src}
          windowWidth={w}
          windowHeight={h}
          data={data}
          location={location}
        />
      )}
    />
  )
}
