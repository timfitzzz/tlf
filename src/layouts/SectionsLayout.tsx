import { graphql, StaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import { Box } from "rebass/styled-components"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { ISectionEdge } from "../types"
import styled from "styled-components"
import { LayoutComponents } from "../Theme"
import { Menu } from "components/Menu"
import { WindowLocation } from "@reach/router"
import { motion } from "framer-motion"

const ContentContainerVariants = {
  expanded: {
    opacity: [null, 0.95, 0.9, 0.6, 0.4, 0.1, 0],
    transition: {
      duration: 1,
    },
  },
  contracted: {
    height: "100%",
    opacity: 1,
    transition: {
      duration: 1,
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
`

const InnerBodyContainerVariants = {
  expanded: {
    height: "480px",
  },
  contracted: {
    height: "inherit",
  },
}

const InnerBodyContainer = styled(motion.div).attrs(() => ({
  variants: InnerBodyContainerVariants,
}))`
  margin: 8px;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
`

export default ({
  sectionTitle,
  location,
  current,
  windowWidth,
  children,
}: {
  sectionTitle: string
  current: any
  location: WindowLocation
  windowWidth: number
  children?: ReactNode[] | ReactNode
}) => {
  // if (exit || entry) {
  //   debugger
  // }

  const animate =
    current && current.state && current.state.animate
      ? current.state.animate
      : null

  // (function() {
  //   switch (transitionStatus) {
  //     case "entering":
  //       return entry.state.animate
  //     case "exiting":
  //       return exit.state.animate
  //     case "entered":
  //       return entry.state.animate
  //     case "exited":
  //       return exit.state.animate
  //   }
  // })()

  const initial =
    current && current.state && current.state.initial
      ? current.state.initial
      : null

  // (function() {
  //   switch (transitionStatus) {
  //     case "entering":
  //       return entry.state.initial
  //     case "exiting":
  //       return exit.state.initial
  //     case "entered":
  //       return entry.state.initial
  //     case "exited":
  //       return exit.state.initial
  //   }
  // })()
  //   exit && exit.state.animate
  //     ? exit.state.animate
  //     : entry && entry.state.animate
  //     ? entry.state.animate
  //     : null
  // const initial = exit ? exit.state.initial : entry ? entry.state.initial : null

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
        <LayoutComponents.bodyContainer>
          <InnerBodyContainer initial={initial} animate={animate}>
            <Menu
              windowWidth={windowWidth}
              data={data}
              location={location}
              sectionTitle={sectionTitle}
              animate={animate}
              initial={initial}
            />
            <ContentContainer initial={initial} animate={animate} layout>
              <MDXRenderer key={Math.random().toString()}>
                {data.allMdx.edges.filter((edge: ISectionEdge) => {
                  return edge.node.frontmatter.title === sectionTitle
                    ? true
                    : false
                })[0]?.node.code.body || ""}
              </MDXRenderer>
              {children}
            </ContentContainer>
          </InnerBodyContainer>

          {/* <MyWorkshop fullScreen={true} /> */}
          {/* <LeftFlexColumn flexDirection={"column"}>
                <LeftColumnContentsBox>
                  <Box>
                    <Name>Tim L. Fitzgerald</Name>
                  </Box>
                  <DescriptionContainer>
                    <LayoutComponents.h2compact>
                      programmer
                    </LayoutComponents.h2compact>
                    <LayoutComponents.h2compact>
                      sysadmin
                    </LayoutComponents.h2compact>
                    <LayoutComponents.h2compact>
                      systems engineer
                    </LayoutComponents.h2compact>
                    <LayoutComponents.h2compact>
                      useful human
                    </LayoutComponents.h2compact>
                  </DescriptionContainer>
                  <PortraitPhotoBox>
                    <PortraitPhoto src="assets/media/tim-photo-cutout-bw.png" />
                  </PortraitPhotoBox>
                </LeftColumnContentsBox>
              </LeftFlexColumn>
              <RightColumnContainer>
                
                
              </RightColumnContainer> */}
        </LayoutComponents.bodyContainer>
      )}
    />
  )
}
