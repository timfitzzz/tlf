import SectionsLayout from "../layouts/SectionsLayout"

import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { SoundCloudPlayerWidget } from "components/IOWidgets/SoundCloudWidget"
import { GitHubWidget } from "components/IOWidgets/GitHubWidget"
import { Helmet } from "react-helmet"

export interface IOQueryData {
  allMdx: {
    edges: {
      node: {
        id: string
        excerpt: string
        fields: {
          route: string
        }
        frontmatter: {
          title: string
          source: string
          URI: string
          templateKey: string
          date: string
          description: string
          tags: string[]
        }
        body: string
      }
    }[]
  }
}

// interface IOOptions {
//   tags: string[]
//   sources: string[]
// }

export default function IO({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { current } = state

  const [filters, setFilters] = useState<{
    tags: string[]
    sources: string[]
  } | null>(null)

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
      render={(data: IOQueryData) => (
        <SectionsLayout
          current={current}
          sectionTitle={"I/O"}
          location={location}
          data={data}
          filters={filters ? filters : undefined}
          setFilters={setFilters}
        >
          <Helmet>
            <meta charSet="utf-8" />
            <title>Tim L. Fitzgerald - I/O</title>
            <link rel="canonical" href="https://timfitz.dev/io" />
          </Helmet>
          {data.allMdx.edges
            .sort((edgeA, edgeB) => {
              return (
                new Date(edgeB.node.frontmatter.date).getTime() -
                new Date(edgeA.node.frontmatter.date).getTime()
              )
            })
            .filter((edge) => {
              if (!filters) {
                return true
              } else {
                let pass = true
                if (filters.sources.length > 0) {
                  pass =
                    filters.sources.indexOf(edge.node.frontmatter.source) !== -1
                }
                if (pass && filters.tags.length > 0) {
                  pass = edge.node.frontmatter.tags.reduce((acc, tag) => {
                    if (acc) {
                      return true
                    } else {
                      return filters.tags.indexOf(tag) !== -1
                    }
                  }, false as boolean)
                }
                return pass
              }
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
                        <SoundCloudPlayerWidget
                          setFilters={setFilters}
                          {...edge.node.frontmatter}
                        />
                      ),
                      github: (
                        <GitHubWidget
                          body={edge.node.body}
                          setFilters={setFilters}
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
