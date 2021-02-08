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

  // console.log(process.env.GATSBY_SC_APIKEY)

  return (
    <StaticQuery
      query={graphql`
        query BlogPostQuery {
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
                code {
                  body
                }
              }
            }
          }
        }
      `}
      render={data => (
        <SectionsLayout
          current={current}
          sectionTitle={"io"}
          location={location}
          tags={data.allMdx.edges.map(edge => edge.node.frontmatter.tags)}
          visibleTags={visibleTags}
        >
          {data.allMdx.edges.map(edge => (
            <div key={edge.node.id + "brief"}>
              {/* <div>
                <Link to={edge.node.fields.route}>
                  {edge.node.frontmatter.title}
                </Link>
              </div> */}
              <div style={{ marginBottom: "24px" }}>
                {
                  {
                    soundcloud: (
                      <SoundCloudPlayerWidget
                        body={edge.node.code.body}
                        {...edge.node.frontmatter}
                      />
                    ),
                    github: (
                      <GitHubWidget
                        body={edge.node.code.body}
                        {...edge.node.frontmatter}
                      />
                    ),
                  }[edge.node.frontmatter.templateKey]
                }
              </div>
            </div>
          ))}
        </SectionsLayout>
      )}
    />
  )
}
