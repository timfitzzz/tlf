import SectionsLayout from "../layouts/SectionsLayout"

import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { SoundCloudPlayerWidget } from "components/IOWidgets/SoundCloudWidget"
import { GitHubWidget } from "components/IOWidgets/GitHubWidget"

export default function IO({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { current } = state

  const [visibleTags /* setVisibleTags */] = useState<string[]>([])

  return (
    <StaticQuery
      query={graphql`
        query IOQuery {
          allMdx(filter: { fileAbsolutePath: { regex: "/content/io/" } }) {
            edges {
              node {
                id
                excerpt(pruneLength: 300)
                fields {
                  route
                }
                frontmatter {
                  title
                  source
                  URI
                  templateKey
                  date
                  description
                  tags
                }
                body
              }
            }
          }
        }
      `}
      render={(data) => (
        <SectionsLayout
          current={current}
          sectionTitle={"io"}
          location={location}
          tags={data.allMdx.edges.map((edge) => edge.node.frontmatter.tags)}
          visibleTags={visibleTags}
        >
          {data.allMdx.edges
            .sort((edgeA, edgeB) => {
              return (
                new Date(edgeB.node.frontmatter.date).getTime() -
                new Date(edgeA.node.frontmatter.date).getTime()
              )
            })
            .map((edge) => (
              <div key={edge.node.id + "brief"}>
                {/* <div>
                <Link to={edge.node.fields.route}>
                  {edge.node.frontmatter.title}
                </Link>
              </div> */}
                <>
                  {
                    {
                      soundcloud: (
                        <SoundCloudPlayerWidget {...edge.node.frontmatter} />
                      ),
                      github: (
                        <GitHubWidget
                          body={edge.node.body}
                          {...edge.node.frontmatter}
                        />
                      ),
                    }[edge.node.frontmatter.templateKey]
                  }
                </>
              </div>
            ))}
        </SectionsLayout>
      )}
    />
  )
}
