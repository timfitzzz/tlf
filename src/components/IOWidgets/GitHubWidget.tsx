import React from "react"
import styled from "styled-components"
import {
  IODescriptionContainer,
  IOEntryContainer,
  IOItemHeader,
} from "./IOCommon"
import { MDXRenderer } from "gatsby-plugin-mdx"
import GithubIcon from "../../../static/assets/media/github.svg"

const GitHubWidgetBody = styled.div`
  font-size: 12px;
  overflow: wrap;
  div {
    ul {
      padding-left: 5px;

      li {
        padding-left: 5px;

        blockquote {
          margin: 5px;

          p {
            font-size: 12px;
            /* padding-left: 22px;
            text-indent: -22px; */

            img {
              width: 40%;
              margin-right: 8px;
              border: 1px solid lightgray;
            }
          }
        }

        pre {
          font-size: 10px;
          margin-left: 8px;
          white-space: pre-wrap; /* css-3 */
          white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
          white-space: -pre-wrap; /* Opera 4-6 */
          white-space: -o-pre-wrap; /* Opera 7 */
          word-wrap: break-word; /* Internet Explorer 5.5+ */
        }

        p {
          font-size: 12px;
        }
      }
    }
  }
`

export const GitHubWidget = ({ date, title, body, tags }) => {
  return (
    <IOEntryContainer>
      <IOItemHeader
        date={date}
        title={title}
        tags={tags}
        source={"github"}
        icon={GithubIcon}
      />
      <IODescriptionContainer>
        <GitHubWidgetBody>
          <MDXRenderer>{body}</MDXRenderer>
        </GitHubWidgetBody>
      </IODescriptionContainer>
    </IOEntryContainer>
  )
}
