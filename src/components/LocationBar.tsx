import { WindowLocation } from "@reach/router"
import { motion } from "framer-motion"
import { WindowConfig } from "hooks/useWindowConfig"
import React, { useState } from "react"
import styled from "styled-components"
import { SelectableSource, SelectableTag } from "./IOWidgets/IOCommon"

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
}))`
  display: flex;
`

export const LocationBarContainer = styled(motion.div).attrs(() => ({
  // variants: {
  //   open: {
  //     transition: transitions.LocationBarContainer.open,
  //     height: 64,
  //   },
  //   closed: {
  //     transition: transitions.LocationBarContainer.closed,
  //     height: 32,
  //   },
  // },
}))<{ windowWidth: number }>`
  margin-top: 8px;
  max-width: ${(p) => (p.windowWidth ? `${p.windowWidth - 16}px` : "100%")};
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
  // variants: {
  //   open: {
  //     transition: transitions.LocationBarBody.open,
  //     borderTopLeftRadius: "16px",
  //     borderBottomLeftRadius: "16px",
  //     borderTopRightRadius: "16px",
  //     borderBottomRightRadius: "16px",
  //   },
  //   closed: {
  //     transition: transitions.LocationBarBody.closed,
  //     borderTopLeftRadius: "16px",
  //     borderBottomLeftRadius: "16px",
  //     borderTopRightRadius: "16px",
  //     borderBottomRightRadius: "16px",
  //   },
  // },
}))`
  flex-direction: row;
  flex-wrap: no-wrap;
  /* width: 100%; */
  height: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  background-color: ${(p) => p.theme.palette.lightBackground};
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  /* margin-left: auto;
  margin-right: auto; */
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  justify-content: left;
`

export const LocationBarSectionsContainer = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  margin-left: 0px;
  display: flex;
  > div {
    &:last-of-type {
      padding-right: 0px;
    }
  }
`

export const LocationBarSectionContainer = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-left: 0;
`

export const LocationBarPathContainer = styled(motion.div).attrs(() => ({}))`
  color: white;
  font-size: 14px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 0;
  height: fit-content;
  padding-right: 16px;
  margin-right: 0;
`

export interface ILocationBar {
  path: string[]
  initial: string
  animate: string
  location: WindowLocation
  tags?: string[]
  sources?: string[]
  filters?: { tags: string[]; sources: string[] }
  toggleFilter?: (type: "source" | "tag", value: string) => void
}

const LocationBarTagMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const LocationBarSourceMenu = styled.div`
  display: flex;
  flex-wrap: no-wrap;
`

const LocationBarTypeTitle = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 8px;
  color: white;
  margin-right: 8px;
`

// const LocationBarVerticalDivider = styled.div`
//   height: 20px;
//   width: 2px;
//   background-color: white;
//   margin-top: auto;
//   margin-bottom: auto;
//   margin-left: 8px;
//   margin-right: 16px;
// `

export const LocationBar = ({
  path,
  initial,
  animate,
  tags,
  sources,
  filters,
  toggleFilter,
}: ILocationBar) => {
  const { w } = WindowConfig.useContainer() as { h: number; w: number }
  const [open /* setOpen */] = useState<boolean>(false)

  function isSelected(type: string, value: string) {
    type = type + "s"

    return (filters && filters[type] && filters[type].indexOf(value) !== -1) ||
      !filters ||
      filters[type].length == 0
      ? true
      : false
  }

  return (
    <LocationBarFadeContainer initial={initial} animate={animate}>
      <LocationBarContainer windowWidth={w} animate={open ? "open" : "closed"}>
        <LocationBarBody animate={open ? "open" : "closed"}>
          <LocationBarPathContainer>{path}</LocationBarPathContainer>
          <LocationBarSectionsContainer>
            <LocationBarSectionContainer>
              <LocationBarTypeTitle>sources</LocationBarTypeTitle>
              {sources && (
                <LocationBarSourceMenu>
                  {sources
                    .reduce((arr, source): string[] => {
                      if (source && arr.indexOf(source) === -1) {
                        arr.push(source)
                        return arr
                      } else {
                        return arr
                      }
                    }, [] as string[])
                    .map((source) => (
                      <SelectableSource
                        source={source}
                        selected={isSelected("source", source)}
                        selectSource={
                          toggleFilter
                            ? () => toggleFilter("source", source)
                            : () => {}
                        }
                      />
                    ))}
                </LocationBarSourceMenu>
              )}
            </LocationBarSectionContainer>

            {/* {sources && tags && <LocationBarVerticalDivider />} */}
            <LocationBarSectionContainer>
              <LocationBarTypeTitle>tags</LocationBarTypeTitle>
              {tags && (
                <LocationBarTagMenu>
                  {tags
                    .reduce((arr, tag): string[] => {
                      if (tag && arr.indexOf(tag) === -1) {
                        arr.push(tag)
                        return arr
                      } else {
                        return arr
                      }
                    }, [] as string[])
                    .map((tag) => (
                      <SelectableTag
                        tagName={tag}
                        selected={isSelected("tag", tag)}
                        selectTag={
                          toggleFilter
                            ? () => toggleFilter("tag", tag)
                            : () => {}
                        }
                      ></SelectableTag>
                    ))}
                </LocationBarTagMenu>
              )}
            </LocationBarSectionContainer>
          </LocationBarSectionsContainer>
        </LocationBarBody>
      </LocationBarContainer>
    </LocationBarFadeContainer>
  )
}
