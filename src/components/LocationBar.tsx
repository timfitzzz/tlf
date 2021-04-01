import { WindowLocation } from "@reach/router"
import { motion } from "framer-motion"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import styled from "styled-components"
import { SelectableSource, SelectableTag } from "./IOWidgets/IOCommon"
import SaveIcon from "../../static/assets/media/download.svg"

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

export const LocationBarContainer = styled.div<{ windowWidth: number }>`
  margin-top: 8px;
  max-width: ${(p) => (p.windowWidth ? `${p.windowWidth - 20}px` : "100%")};
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  box-sizing: border-box;
  height: 100%;
`

export const LocationBarBody = styled.div`
  flex-direction: row;
  flex-wrap: no-wrap;
  height: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border: 2px solid ${(p) => p.theme.palette.darkBackground};
  background-color: white;
  display: flex;
  color: ${(p) => p.theme.palette.darkBackground};
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  justify-content: left;
  > div {
    &:last-of-type {
      padding-right: 0px;
    }
  }
`

export const LocationBarSectionsContainer = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
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

  &:last-of-type {
    margin-left: 12px;
  }
`

export const LocationBarPathContainer = styled.div`
  color: ${(p) => p.theme.palette.darkBackground};
  font-size: 16px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 0;
  height: fit-content;
  padding-right: 16px;
  margin-right: 0;
  font-family: ${(p) => p.theme.fonts.title1};
  font-weight: 700;
  padding-top: 2px;
  padding-bottom: 2px;
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
  setFilters?: (filters: { tags: string[]; sources: string[] } | null) => void
  downloadUrl?: string
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
  padding-top: 0px;
  padding-bottom: 2px;
  font-size: 14px;
  line-height: 10px;
  color: ${(p) => p.theme.palette.darkBackground};
  margin-right: 4px;
  font-variant: small-caps;
  height: fit-content;
`

const ClearFiltersButton = styled.div<{ activated: boolean }>`
  font-size: 10px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0;
  margin-left: auto;
  padding-left: 12px;
  color: ${(p) =>
    p.activated ? p.theme.palette.darkBackground : "transparent"};
  cursor: pointer;
  display: flex;
`

const PdfDownloadButton = styled.a`
  cursor: pointer;
  text-decoration: none;
  margin-left: 4px;
  margin-top: auto;
  margin-bottom: auto;

  svg {
    fill: ${(p) => p.theme.palette.darkBackground};
    height: 18px;
    margin-top: auto;
    margin-bottom: auto;
    display: block;
  }
`

export const LocationBar = ({
  path,
  initial,
  animate,
  tags,
  sources,
  filters,
  toggleFilter,
  setFilters,
  downloadUrl,
}: ILocationBar) => {
  const { w } = WindowConfig.useContainer() as { h: number; w: number }

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
      <LocationBarContainer windowWidth={w}>
        <LocationBarBody>
          <LocationBarPathContainer>{path}</LocationBarPathContainer>
          {tags || sources ? (
            <LocationBarSectionsContainer>
              {sources && (
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
              )}
              {tags && (
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
              )}
            </LocationBarSectionsContainer>
          ) : (
            <></>
          )}
          {tags && sources ? (
            <ClearFiltersButton
              activated={!(typeof filters === "undefined")}
              onClick={() => {
                setFilters && setFilters(null)
              }}
            >
              ✖
            </ClearFiltersButton>
          ) : (
            <></>
          )}
          {downloadUrl ? (
            <PdfDownloadButton href={downloadUrl} download>
              <SaveIcon />
            </PdfDownloadButton>
          ) : (
            <></>
          )}
        </LocationBarBody>
      </LocationBarContainer>
    </LocationBarFadeContainer>
  )
}
