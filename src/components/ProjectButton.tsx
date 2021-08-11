import React from "react"
import styled from "styled-components"

export const ProjectButton = styled(
  ({
    name,
    description,
    Logo,
    url,
    className,
  }: {
    className?: string
    name: string
    description: string
    Logo: JSX.Element
    url: string
  }) => {
    return (
      <div className={className}>
        <a href={url} target={"_blank"}>
          <div className={"innerContainer"}>
            <div className={"imgContainer"}>{Logo}</div>
            <div className={"textContainer"}>
              <div className={"nameContainer"}>{name}</div>
              <div className={"descriptionContainer"}>{description}</div>
            </div>
          </div>
        </a>
      </div>
    )
  }
)`
  margin-left: auto;
  margin-right: auto;
  max-width: 304px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 8px !important;

  border: 1px solid ${(p) => p.theme.palette.lightBackground};
  &:hover {
    box-shadow: 2px 2px 1px ${({ theme }) => theme.palette.darkBackground};
    background-color: ${(p) => p.theme.palette.lightBackground};
    a {
      color: white;
    }
  }
  border-radius: 16px;

  a {
    text-decoration: none;
  }

  .innerContainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-items: space-between;
    padding: 8px;
    box-sizing: border-box;
  }

  .imgContainer {
    width: 60px;
    padding: 8px;
    margin: auto;
    display: inline-block;

    background-color: white;
    border-radius: 8px;
  }

  img {
    display: inline-block;
    width: 100%;
    object-fit: contain;
    object-position: center;
  }

  .textContainer {
    margin-left: 8px;
    text-decoration: none !important;
  }

  .nameContainer {
    font-size: 0.9em;
    font-weight: 700;
    letter-spacing: 0px;
    text-decoration: none !important;
  }

  .descriptionContainer {
    padding-top: 4px;
    text-decoration: none !important;
    font-size: 0.8em;
    letter-spacing: 0px;
  }
`

export default ProjectButton
