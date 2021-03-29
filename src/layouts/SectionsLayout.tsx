import React, { ReactNode, useState } from "react"
import { Box } from "rebass/styled-components"
import styled from "styled-components"
import { TRANSITION_DURATION } from "../Theme"
import { WindowLocation } from "@reach/router"
import { AnimatePresence, motion } from "framer-motion"
import { LocationBar } from "components/LocationBar"
import { IOQueryData } from "pages/io"
// import Pdf from "react-to-pdf"

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

const CustomAnimatePresence = styled(AnimatePresence)`
  overflow: display;
`

const ContentContainer = styled(motion.custom(Box)).attrs(() => ({
  variants: ContentContainerVariants,
}))`
  margin: 8px 8px 8px 8px;
  padding: 0px 8px 8px 8px;
  // width: 100%;
  height: 100%;
  display: block;
  overflow: display;
  color: ${(p) => p.theme.palette.darkBackground};

  > div {
    margin-top: 24px;

    &:first-of-type {
      margin-top: 16px;
    }
  }
`

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
  // variants: InnerBodyContainerVariants,
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
  data,
  filters,
  setFilters,
  downloadUrl,
}: {
  sectionTitle: string
  current: any
  location: WindowLocation
  title?: string
  children?: ReactNode[] | ReactNode
  data?: IOQueryData
  // tags?: string[]
  // sources?: string[]
  filters?: { tags: string[]; sources: string[] }
  setFilters?: (state: { tags: string[]; sources: string[] } | null) => void
  downloadUrl?: string
}) => {
  // const ref = useRef(null)

  const animate =
    current && current.state && current.state.animate
      ? current.state.animate
      : null

  const initial =
    current && current.state && current.state.initial
      ? current.state.initial
      : null

  const getTags = (edges: IOQueryData["allMdx"]["edges"]): string[] =>
    edges
      .map((edge) => edge.node.frontmatter.tags)
      .reduce((acc, tags) => [...acc, ...tags], [])

  const getSources = (edges: IOQueryData["allMdx"]["edges"]): string[] =>
    edges.map((edge) => edge.node.frontmatter.source)

  const [metaTypes, _setMetaTypes] = useState<{
    tags: string[]
    sources: string[]
  }>({
    tags: data ? getTags(data.allMdx.edges) : [],
    sources: data ? getSources(data.allMdx.edges) : [],
  })

  function toggleFilter(type: "tag" | "source", value: string): void {
    let thisType = type === "tag" ? "tags" : "sources"
    let otherType = type === "tag" ? "sources" : "tags"

    if (filters && filters[thisType] && setFilters) {
      let valIndex = filters[thisType].indexOf(value)
      if (valIndex !== -1) {
        if (filters[otherType].length > 0) {
          setFilters({
            tags: thisType === "tags" ? [] : filters.tags,
            sources: thisType === "sources" ? [] : filters.sources,
          })
        } else {
          setFilters(null)
        }
      } else {
        setFilters({
          tags: thisType === "tags" ? [value] : filters.tags,
          sources: thisType === "sources" ? [value] : filters.sources,
        })
      }
    } else if (setFilters) {
      setFilters({
        tags: thisType === "tags" ? [value] : [],
        sources: thisType === "sources" ? [value] : [],
      })
    }

    //
    // console.log(`toggling ${type} filter for ${value}`)
    // console.log(
    //   filters,
    //   filters ? filters[thisType] : "no filters set",
    //   setFilters
    // )
    // if (filters && filters[thisType] && setFilters) {
    //   let valIndex = filters[thisType].indexOf(value)
    //   if (valIndex !== -1) {
    //     console.log("removing filter")
    //     if (filters[thisType].length === 1 && filters[otherType].length === 0) {
    //       console.log(
    //         `found filter ${thisType} length is 1, other is 0, setting null`
    //       )
    //       setFilters(null)
    //     } else if (filters[thisType].length === metaTypes[thisType].length) {
    //       console.log(
    //         `found filter ${thisType} length is same as known metaType length`
    //       )
    //       if (filters[otherType].length === 0) {
    //         console.log(
    //           "there are no other filters in the other type, so setting null"
    //         )
    //         setFilters(null)
    //       } else {
    //         console.log(
    //           "there are other filters in the other type, so setting this type to 0 length"
    //         )
    //         setFilters({
    //           ...filters,
    //           [thisType]: [],
    //         })
    //       }
    //     } else {
    //       setFilters({
    //         ...filters,
    //         [thisType]: filters[thisType].filter((val) => val !== value),
    //       })
    //     }
    //   } else {
    //     console.log("adding filter")
    //     setFilters({
    //       ...filters,
    //       [thisType]:
    //         valIndex === -1
    //           ? [...filters[thisType], value]
    //           : filters[thisType].filter((val) => val !== value),
    //     })
    //   }
    // } else if ((setFilters && type === "source") || "tag") {
    //   setFilters!({
    //     sources: type === "source" ? [value] : [],
    //     tags: type === "source" ? [] : [value],
    //   })
    // }
  }

  return (
    <>
      {
        // window ? (
        //   <Pdf
        //     x={18}
        //     y={18}
        //     imgWidth={8}
        //     pageHeight={11}
        //     scale={3}
        //     targetRef={ref}
        //     filename="timothyliamfitzgerald-resume.pdf"
        //     options={{ orientation: "p", unit: "in", format: [8.5, 11] }}
        //   >
        //     {({ toPdf }) => {
        //       return (
        location.pathname !== "/" && (
          <LocationBar
            path={[sectionTitle, title || ""]}
            initial={current && current.state ? "fadedOut" : "fadedIn"}
            animate={"fadedIn"}
            location={location}
            tags={metaTypes.tags.length > 0 ? metaTypes.tags : undefined}
            sources={
              metaTypes.sources.length > 0 ? metaTypes.sources : undefined
            }
            filters={filters ? filters : undefined}
            toggleFilter={toggleFilter}
            setFilters={setFilters}
            downloadUrl={downloadUrl}
          />
        )
      }
      {/* </Pdf>
      ) : (
        location.pathname !== "/" && (
          <LocationBar
            path={[sectionTitle, title || ""]}
            initial={current && current.state ? "fadedOut" : "fadedIn"}
            animate={"fadedIn"}
            location={location}
            tags={metaTypes.tags.length > 0 ? metaTypes.tags : undefined}
            sources={
              metaTypes.sources.length > 0 ? metaTypes.sources : undefined
            }
            filters={filters ? filters : undefined}
            toggleFilter={toggleFilter}
            setFilters={setFilters}
          />
        )
      )} */}
      <InnerBodyFadeContainer
        initial={current && current.state ? "fadedOut" : "fadedIn"}
        animate={"fadedIn"}
      >
        <InnerBodyContainer initial={initial} animate={animate}>
          <CustomAnimatePresence>
            {location.pathname !== "/" && (
              <ContentContainer
                initial={initial}
                animate={animate}
                key={sectionTitle + "ContentContainer"}
                // ref={ref}
              >
                {children}
              </ContentContainer>
            )}
          </CustomAnimatePresence>
        </InnerBodyContainer>
      </InnerBodyFadeContainer>
    </>
  )
}
