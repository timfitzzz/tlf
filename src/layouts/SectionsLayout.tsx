import React, { ReactNode } from "react"
import { Box } from "rebass/styled-components"
import styled from "styled-components"
import { TRANSITION_DURATION } from "../Theme"
import { WindowLocation } from "@reach/router"
import { AnimatePresence, motion } from "framer-motion"
import { LocationBar } from "components/LocationBar"

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
  // width: 100%;
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

const InnerBodyFadeContainer = styled(motion.div).attrs(() => ({
  variants: {
    fadedOut: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    fadedIn: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  },
}))``

const InnerBodyContainer = styled(motion.div).attrs(() => ({
  variants: InnerBodyContainerVariants,
}))`
  margin: 8px;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: inline-block;
  width: 100%;
`

export default ({
  sectionTitle,
  location,
  current,
  title,
  children,
  tags,
  visibleTags,
}: {
  sectionTitle: string
  current: any
  location: WindowLocation
  title?: string
  children?: ReactNode[] | ReactNode
  tags?: string[]
  visibleTags?: string[]
}) => {
  const animate =
    current && current.state && current.state.animate
      ? current.state.animate
      : null

  const initial =
    current && current.state && current.state.initial
      ? current.state.initial
      : null

  // const allMdxQuery = graphql`
  //   query MainSectionsQuery {
  //     allMdx(filter: { fileAbsolutePath: { regex: "/content/mdx/" } }) {
  //       edges {
  //         node {
  //           fields {
  //             route
  //           }
  //           frontmatter {
  //             title
  //             path
  //           }
  //           code {
  //             body
  //           }
  //         }
  //       }
  //     }
  //   }
  // `

  return (
    <>
      {location.pathname !== "/" && (
        <LocationBar
          path={[sectionTitle, title]}
          initial={current && current.state ? "fadedOut" : "fadedIn"}
          animate={"fadedIn"}
          location={location}
          tags={tags}
          visibleTags={visibleTags}
        />
      )}
      <InnerBodyFadeContainer
        initial={current && current.state ? "fadedOut" : "fadedIn"}
        animate={"fadedIn"}
      >
        <InnerBodyContainer initial={initial} animate={animate} layout>
          <AnimatePresence>
            {location.pathname !== "/" && (
              <ContentContainer
                initial={initial}
                animate={animate}
                layout
                key={sectionTitle + "ContentContainer"}
              >
                {children}
              </ContentContainer>
            )}
          </AnimatePresence>
        </InnerBodyContainer>
      </InnerBodyFadeContainer>
    </>
  )
}
