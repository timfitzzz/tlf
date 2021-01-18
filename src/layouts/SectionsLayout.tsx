import { graphql, StaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import { Box } from "rebass/styled-components"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { ISectionEdge } from "../types"
import styled from "styled-components"
import { TRANSITION_DURATION } from "../Theme"
import { WindowLocation } from "@reach/router"
import { AnimatePresence, motion } from "framer-motion"

const ContentContainerVariants = {
  expanded: {
    opacity: [null, 0.8, 0.5, 0.2, 0.0, 0.0, 0],
    // height: "0px",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    // height: "unset",
    opacity: [null, 0.1, 0.3, 0.6, 0.75, 0.9, 1],
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
}

const ContentContainer = styled(motion.custom(Box)).attrs(() => ({
  variants: ContentContainerVariants,
}))`
  margin: 8px 8px 8px 8px;
  padding: 8px 16px 8px 8px;
  width: 100%;
  height: 100%;
  display: block;
  color: ${p => p.theme.palette.darkBackground};
`

const InnerBodyContainerVariants = {
  expanded: {
    marginTop: "8px",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    marginTop: "8px",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
}

const InnerBodyContainer = styled(motion.div).attrs(() => ({
  variants: InnerBodyContainerVariants,
}))`
  margin: 8px;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`

export default ({
  sectionTitle,
  location,
  current,
  children,
}: {
  sectionTitle: string
  current: any
  location: WindowLocation
  children?: ReactNode[] | ReactNode
}) => {
  const animate =
    current && current.state && current.state.animate
      ? current.state.animate
      : null

  const initial =
    current && current.state && current.state.initial
      ? current.state.initial
      : null

  return (
    <StaticQuery
      query={graphql`
        query MainSectionsQuery {
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
        <InnerBodyContainer initial={initial} animate={animate} layout>
          <AnimatePresence>
            {location.pathname !== "/" && (
              <ContentContainer
                initial={initial}
                animate={animate}
                layout
                key={sectionTitle + "ContentContainer"}
              >
                <MDXRenderer key={Math.random().toString()}>
                  {data.allMdx.edges.filter((edge: ISectionEdge) => {
                    return edge.node.frontmatter.title === sectionTitle
                      ? true
                      : false
                  })[0]?.node.code.body || ""}
                </MDXRenderer>
                {children}
              </ContentContainer>
            )}
          </AnimatePresence>
        </InnerBodyContainer>
      )}
    />
  )
}
