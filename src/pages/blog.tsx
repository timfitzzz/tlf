import SectionsLayout from "../layouts/SectionsLayout"

import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"

export default function Blog({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { current } = state

  return (
    <StaticQuery
      query={graphql`
        query BlogPostsQuery {
          allMdx(filter: { fileAbsolutePath: { regex: "/content/blog/" } }) {
            edges {
              node {
                excerpt(pruneLength: 300)
                fields {
                  route
                }
                frontmatter {
                  title
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
          sectionTitle={"blog"}
          location={location}
        >
          {data.allMdx.edges.map(edge => (
            <>
              <div>
                <Link to={`/blog${edge.node.fields.route}`}>
                  {edge.node.frontmatter.title}
                </Link>
              </div>
              <div>{edge.node.excerpt}</div>
            </>
          ))}
        </SectionsLayout>
      )}
    />
  )
}
