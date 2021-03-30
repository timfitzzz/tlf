import SectionsLayout from "../layouts/SectionsLayout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { ISectionEdge } from "../types"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import React from "react"
import { WindowLocation } from "@reach/router"
import { graphql, StaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
const CVPDF = require("../../static/assets/media/tim.l.fitzgerald.resume.march.2020.pdf") as string

export default function CV({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { current } = state

  return (
    <SectionsLayout
      current={current}
      sectionTitle={"CV"}
      location={location}
      downloadUrl={CVPDF}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tim L. Fitzgerald - CV</title>
        <link rel="canonical" href="https://timfitz.dev/cv" />
      </Helmet>
      <StaticQuery
        query={graphql`
          query cvQuery {
            allMdx(
              filter: { fileAbsolutePath: { regex: "/content/mdx/cv.mdx/" } }
            ) {
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
          }
        `}
        render={(data) => (
          <MDXRenderer key={Math.random().toString()}>
            {data.allMdx.edges.filter((edge: ISectionEdge) => {
              return edge.node.frontmatter.title === "CV" ? true : false
            })[0]?.node.body || ""}
          </MDXRenderer>
        )}
      />
    </SectionsLayout>
  )
}
