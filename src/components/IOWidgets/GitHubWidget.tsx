// prettier-ignore
import React from "react"
import styled from "styled-components"
import {
  IODescriptionContainer,
  IOEntryContainer,
  IOItemHeader,
} from "./IOCommon"
import { MDXRenderer } from "gatsby-plugin-mdx"
import GithubIcon from "../../../static/assets/media/github.svg"
import { DateTime } from "luxon"
//prettier-ignore

const NaiveMDXRenderer = styled(MDXRenderer)`


`

const GithubWidgetContainer = styled(IOEntryContainer)``

const GitHubWidgetBody = styled.div`
  font-size: 12px !important;
  overflow: wrap;
  display: flex;
  flex-direction: column;

  a {
    font-weight: 500;
  }

  p {
    font-size: 14px;
    margin-top: 8x;
    margin-bottom: 8px;
    margin-block-start: 4px;
    margin-block-end: 4px;
  }

  ul {
    margin-top: 4px;
    padding-left: 19px;
    margin-bottom: 8px;
    font-size: 12px;
    li {
      padding-left: 0px;
      padding-bottom: 6px;
      line-height: 14px;

      blockquote {
        margin: 5px;

        img {
          width: 30%;
          margin-right: 8px;
          border: 1px solid lightgray;
        }
      }
      img {
        width: 30%;
        margin-right: 8px;
        border: 1px solid lightgray;
        float: left;
      }

      pre {
        font-size: 12px;
        margin-left: 8px;
        white-space: pre-wrap; /* css-3 */
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
      }

      p {
        font-size: 12px !important;
        &:first-of-type {
          margin-top: 4px;
          margin-bottom: 0px;
          margin-left: 0px;
        }

        &:nth-of-type(even) {
          margin-top: 4px;
          margin-left: 4px;
        }

        &:nth-of-type(odd) {
          margin-top: 4px;
          margin-left: 4px;
        }

        &:last-of-type {
          margin-bottom: 8px;
          margin-top: 4px;
        }

        &:only-of-type {
          margin-top: 0px;
          margin-bottom: 0px;
        }

        code {
          display: block;
          margin: 8px;
        }
      }
    }
  }
`

export const GitHubWidget = ({ date, title, body, tags, URI, setFilters }) => {
  const dateString = DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)

  return (
    <GithubWidgetContainer>
      <IOItemHeader
        date={dateString}
        title={title}
        tags={tags}
        source={"github"}
        icon={GithubIcon}
        URI={URI}
        setFilters={setFilters}
      />
      <IODescriptionContainer>
        <GitHubWidgetBody>
          <NaiveMDXRenderer>{body}</NaiveMDXRenderer>
        </GitHubWidgetBody>
      </IODescriptionContainer>
    </GithubWidgetContainer>
  )
}
