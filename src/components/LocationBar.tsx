import { WindowLocation } from "@reach/router"
import { motion } from "framer-motion"
import { WindowConfig } from "hooks/useWindowConfig"
import React, { useState } from "react"
import styled from "styled-components"

export const transitions = {
  LocationBarFadeContainer: {
    fadedOut: {
      duration: 0.5,
    },
    fadedIn: {
      duration: 0.5,
    },
  },
  LocationBarContainer: {
    open: {},
    closed: {},
  },
  LocationBarBody: {
    open: {},
    closed: {},
  },
  LocationBarContentsContainer: {},
  LocationBarTagContainer: {},
  LocationBarCalendarContainer: {
    open: {},
    closed: {},
  },
}

export const LocationBarFadeContainer = styled(motion.div).attrs(() => ({
  variants: {
    fadedOut: {
      opacity: 0,
      transition: transitions.LocationBarFadeContainer.fadedOut,
    },
    fadedIn: {
      opacity: 1,
      transition: transitions.LocationBarFadeContainer.fadedIn,
    },
  },
}))``

export const LocationBarContainer = styled(motion.div).attrs(() => ({
  variants: {
    open: {
      transition: transitions.LocationBarContainer.open,
      height: 64,
    },
    closed: {
      transition: transitions.LocationBarContainer.closed,
      height: 32,
    },
  },
}))<{ windowWidth: number }>`
  margin-top: 24px;
  /* width: ${(p) => (p.windowWidth ? `${p.windowWidth - 75}px` : "100%")}; */
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  /* margin-right: 8px; */
  margin-bottom: auto;
  box-sizing: border-box;
  height: 100%;
`

export const LocationBarBody = styled(motion.div).attrs(() => ({
  variants: {
    open: {
      transition: transitions.LocationBarBody.open,
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
      borderTopRightRadius: "16px",
      borderBottomRightRadius: "16px",
    },
    closed: {
      transition: transitions.LocationBarBody.closed,
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
      borderTopRightRadius: "16px",
      borderBottomRightRadius: "16px",
    },
  },
}))`
  flex-direction: row;
  /* width: 100%; */
  height: 100%;
  background-color: ${(p) => p.theme.palette.lightBackground};
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
`

export const LocationBarPathContainer = styled(motion.div).attrs(() => ({}))`
  color: white;
  font-size: 14px;
  margin-top: auto;
  margin-bottom: auto;
  height: fit-content;
`

export interface ILocationBar {
  path: string[]
  initial: string
  animate: string
  location: WindowLocation
  tags?: string[]
  visibleTags?: string[]
}

// export const LocationBarPathDisplay = ({path}: {path: string[]}) => {

//   return (

//   )
// }

export const LocationBar = ({
  path,
  initial,
  animate,
}: // location,
// tags,
// visibleTags,
ILocationBar) => {
  const { w } = WindowConfig.useContainer() as { h: number; w: number }

  const [open /* setOpen */] = useState<boolean>(false)

  // console.log(location)

  return (
    <LocationBarFadeContainer initial={initial} animate={animate}>
      <LocationBarContainer windowWidth={w} animate={open ? "open" : "closed"}>
        <LocationBarBody animate={open ? "open" : "closed"}>
          <LocationBarPathContainer>{path}</LocationBarPathContainer>
        </LocationBarBody>
      </LocationBarContainer>
    </LocationBarFadeContainer>
  )
}
