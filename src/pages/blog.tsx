import SectionsLayout from "../layouts/SectionsLayout"

import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { WindowConfig } from "hooks/useWindowConfig"

export default function Blog({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { w } = WindowConfig.useContainer()
  const { current } = state

  return (
    <StaticQuery
      query={graphql`
        query BlogPostQuery {
          allMdx(filter: { fileAbsolutePath: { regex: "/content/blog/" } }) {
            edges {
              node {
                fields {
                  route
                }
                frontmatter {
                  title
                }
                code {
                  body
                }
                excerpt(pruneLength: 300)
              }
            }
          }
        }
      `}
      render={data => (
        <SectionsLayout
          windowWidth={w}
          current={current}
          sectionTitle={"blog"}
          location={location}
        >
          {data.allMdx.edges.map(edge => (
            <>
              <div>
                <Link to={edge.node.fields.route}>
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
