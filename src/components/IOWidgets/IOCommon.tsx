import React from "react"
import styled from "styled-components"

export const IODescriptionContainer = styled.div`
  margin-top: 8px;
`

export const IODate = styled.div`
  font-size: 14px;
  font-variant: small-caps;
`

export const IOTitleBar = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 4px;

  &:first-of-type {
    margin-top: 8px;
  }
`

export const IODescription = styled.div`
  font-size: 14px;
`

export const IOEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 8px; */
  /* padding: 16px; */
  /* border: 2px solid ${p => p.theme.palette.lightBackground};
  border-radius: 16px; */
  box-sizing: border-box;
  width: 100%;
  max-width: 330px;
  margin-left: auto;
  margin-right: auto;
`

export const IOTitle = styled.div`
  font-family: ${p => p.theme.fonts.title1};
  font-weight: 700;
  font-size: 16px;
  margin-right: auto;
  margin-left: 0;
`

export const IOTags = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: auto;
  margin-left: 0;
  flex-wrap: wrap;
`

export const Source = ({
  // source,
  className,
  icon,
}: {
  icon: string
  source?: string
  className?: string
}) => {
  let Icon = icon
  return (
    <div className={className}>
      <Icon />
    </div>
  )
}

export const IOSource = styled(Source)`
  margin-right: 0;
  margin-left: auto;

  svg {
    height: 15px;
  }
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

export const IOTag = styled(Tag)`
  font-size: 12px;
  color: white;
  padding: 4px;
  height: 12px;
  border-radius: 5px;
  margin-right: 4px;
  background-color: ${p =>
    p.theme.tagColors[p.tag.toLowerCase()]
      ? p.theme.tagColors[p.tag.toLowerCase()]
      : p.theme.tagColors.default};
`

export const IOItemHeader = ({
  date,
  title,
  tags,
  source,
  className,
  icon,
}: {
  date: string
  title: string
  tags: string[]
  source: string
  icon: any
  className?: string
}) => {
  return (
    <div className={className}>
      <IOTitleBar>
        <IODate>{date}</IODate>
        <IOSource source={source} icon={icon} />
      </IOTitleBar>
      <IOTitleBar>
        <IOTitle>{title}</IOTitle>
      </IOTitleBar>
      <IOTitleBar>
        <IOTags>
          {tags.map(tag => (
            <IOTag tag={tag} key={tag + title} />
          ))}
        </IOTags>
      </IOTitleBar>
    </div>
  )
}
