import React from "react"
import styled from "styled-components"
import Icons from "../Icons"

export const IODescriptionContainer = styled.div`
  margin-top: 4px;
  p {
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

export const IODate = styled.div`
  font-size: 16px;
  font-variant: small-caps;
  margin-top: auto;
  margin-bottom: auto;
`

export const IOTitleBar = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 4px;

  &:first-of-type {
    margin-top: 0px;
  }
`

export const IODescription = styled.div``

export const IOEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 8px; */
  /* padding: 16px; */
  /* border: 2px solid ${(p) => p.theme.palette.lightBackground};
  border-radius: 16px; */
  box-sizing: border-box;
  width: 100%;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
`

export const IOTitle = styled.div`
  font-family: ${(p) => p.theme.fonts.title1};
  font-weight: 700;
  font-size: 16px;
  margin-right: auto;
  margin-left: 0;

  @media screen and (max-width: 560px) {
  }

  @media screen and (min-width: 561px) {
    font-size: 20px;
  }
`

export const IOTagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: auto;
  margin-left: 8px;
  flex-wrap: wrap;
  margin-top: auto;
  margin-bottom: auto;
`

export const Tag = ({
  tag,
  className,
}: {
  tag: string
  className?: string
}) => {
  return <div className={className}>{tag}</div>
}

export const IOTag = styled(Tag)<{ selected: boolean }>`
  font-size: 10px;

  padding: 2px 4px 2px 4px;
  height: 12px;
  border-radius: 5px;
  margin-top: 2px;
  margin-bottom: 2px;

  /* background-color: ${(p) =>
    p.theme.tagColors[p.tag.toLowerCase()]
      ? p.theme.tagColors[p.tag.toLowerCase()]
      : p.theme.tagColors.default}; */
  cursor: pointer;
  ${(p) =>
    p.selected
      ? `
      background-color: ${
        p.theme.tagColors[p.tag.toLowerCase()]
          ? p.theme.tagColors[p.tag.toLowerCase()]
          : p.theme.tagColors.default
      };
      color: white;
      border: 1px solid transparent;
  `
      : `
  
      color: ${
        p.theme.tagColors[p.tag.toLowerCase()]
          ? p.theme.tagColors[p.tag.toLowerCase()]
          : p.theme.tagColors.default
      };
      border: 1px solid ${
        p.theme.tagColors[p.tag.toLowerCase()]
          ? p.theme.tagColors[p.tag.toLowerCase()]
          : p.theme.tagColors.default
      };
      background-color: white;
  `}
`
const SelectableTagContainer = styled.div<{
  selected: boolean
  onClick: () => void
}>`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 4px;

  &:last-of-type {
    margin-right: 0px;
  }
`

export const SelectableTag = ({
  tagName,
  selected,
  selectTag,
  className,
}: {
  tagName: string
  selected: boolean
  selectTag: () => void
  className?: string
}) => {
  return (
    <SelectableTagContainer selected={selected} onClick={selectTag}>
      <IOTag className={className} selected={selected} tag={tagName} />
    </SelectableTagContainer>
  )
}

export const Source = ({
  // source,
  className,
  icon,
  URI,
}: {
  icon: string
  URI?: string
  className?: string
}) => {
  let Icon = icon
  return (
    <div className={className}>
      <a href={URI}>
        <Icon />
      </a>
    </div>
  )
}

export const IOSource = styled(Source)`
  margin-right: 6px;
  margin-left: 0px;
  padding-left: 0px;

  @media screen and (max-width: 560px) {
    svg {
      width: 14px;
      height: 14px;
      margin-bottom: -1px;
    }
  }

  @media screen and (min-width: 561px) {
    svg {
      margin-top: 1px;
      width: 18px;
      height: 21px;
    }
  }
`

const SourceIconContainer = styled.div<{
  selected: boolean
  onClick: () => void
}>`
  display: flex;
  margin-right: 4px;
  height: 21px;
  width: 21px;
  margin-top: auto;
  margin-bottom: auto;
  ${(p) =>
    p.selected
      ? `
    fill: color: ${(p) => p.theme.palette.darkBackground};
  `
      : `
      fill: gray;

  `}

  @media screen and (max-width: 560px) {
    width: 17px;
    height: 20px;

    svg {
      width: 17px;
      height: 20px;
    }
  }

  @media screen and (min-width: 561px) {
    height: 21px;
    width: 18px;

    svg {
      width: 18px;
      height: 21px;
    }
  }
`

export const SelectableSource = ({
  source,
  selected,
  selectSource,
  className,
}: {
  source: string
  selected: boolean
  selectSource: () => void
  className?: string
}) => {
  let Icon = Icons[source]

  return (
    <SourceIconContainer
      className={className}
      onClick={selectSource}
      selected={selected}
    >
      <Icon />
    </SourceIconContainer>
  )
}

export const IOItemHeader = ({
  date,
  title,
  tags,
  className,
  icon,
  URI,
  setFilters,
}: {
  date: string
  title: string
  tags: string[]
  source: string
  icon: any
  URI: string
  className?: string
  setFilters?: (filters: { tags: string[]; sources: string[] }) => void
}) => {
  return (
    <div className={className}>
      <IOTitleBar>
        <IODate>{date}</IODate>
        <IOTagsContainer>
          {tags.map((tag) => (
            <SelectableTag
              tagName={tag}
              key={tag + title}
              selected={true}
              selectTag={() => {
                setFilters && setFilters({ sources: [], tags: [tag] })
              }}
            />
          ))}
        </IOTagsContainer>
      </IOTitleBar>
      <IOTitleBar>
        <IOSource icon={icon} URI={URI} />
        <IOTitle>{title}</IOTitle>
      </IOTitleBar>
    </div>
  )
}
