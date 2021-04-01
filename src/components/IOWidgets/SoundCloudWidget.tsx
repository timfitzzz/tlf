import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { PlayButton, Progress, Timer } from "react-soundplayer/components"
import { withSoundCloudAudio } from "react-soundplayer/addons"
import ReactMarkdown from "react-markdown"
import TurndownService from "turndown"
import { DateTime } from "luxon"
import {
  IODescriptionContainer,
  IOEntryContainer,
  IOItemHeader,
} from "./IOCommon"
import SoundCloudIcon from "../../../static/assets/media/soundcloud.svg"

const SoundCloudPlayerWidgetContainer = styled(IOEntryContainer)`
  flex-direction: row;
  flex-wrap: wrap;
`

export const CustomPlayerArtContainer = styled.div`
  min-width: 100%;
  height: fit-content;
  display: inherit;
  border: 2px solid ${(p) => p.theme.palette.lightBackground};
  border-radius: 3px;
  box-sizing: inherit;

  > img {
    width: 100%;
    display: block;
  }
`

export const CustomPlayerColumnContainer = styled.div`
  @media screen and (max-width: 560px) {
    min-width: 100%;
  }

  @media screen and (min-width: 561px) {
    &:first-of-type {
      padding-right: 8px;
      width: auto;
      min-width: 53%;
      max-width: 53%;
    }

    &:last-of-type {
      width: 45%;
    }
  }
`

export const CustomPlayerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4px;
`

export const CustomPlayerControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const CustomTimer = styled(Timer)`
  font-size: 11px;
  margin-left: 4px;
  margin-top: auto;
  margin-bottom: auto;
`

export const CustomPlayButton = styled(PlayButton)`
  height: 15px;
  width: 12px;
  padding: 0px;
  display: flex;
  border: unset;
  background-color: unset;
  cursor: pointer;

  svg {
    height: 10px;
    width: 12px;
    margin: auto auto auto 0;
  }
`

export const PlayerLabel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const ArtistContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`

export const ArtistLink = styled.a`
  display: inherit;
`

export const ArtistLogo = styled.img`
  width: 50px;
  height: 50px;
  padding: 16px;
`

export const ArtistName = styled.div``

export const CustomProgress = styled(Progress)`
  box-sizing: border-box;
  border-radius: 3px;
  margin-bottom: 4px;
  margin-top: 0px;
  background-color: ${(p) => p.theme.palette.darkBackground};
  background-image: url(${(p) => p.waveformUrl});
  background-size: 100% 100%;
  width: 100%;
  height: 50px;
  overflow: hidden;
  cursor: pointer;

  > div {
    border-radius: 3px 0 0 3px;
    background-color: ${(p) => p.theme.palette.lightBackground}88;
    height: 100%;
    transition: width 0.2s ease-in;
    cursor: pointer;
  }
`

const SoundCloudPlayerContainer = styled.div`
  margin-top: 8px;
`

export const SoundCloudPlayer = withSoundCloudAudio(
  ({ track, currentTime, duration, setArtworkUrl, ...props }) => {
    setArtworkUrl(track)

    return (
      <SoundCloudPlayerContainer>
        <CustomPlayerDetailsContainer>
          <CustomProgress
            value={(currentTime / duration) * 100 || 0}
            waveformUrl={track && track.waveform_url}
            {...props}
          ></CustomProgress>
          <CustomPlayerControlsContainer>
            <CustomPlayButton {...props} backgroundImgUrl={""} />
            <CustomTimer
              duration={track ? track.duration / 1000 : 0}
              currentTime={currentTime}
              {...props}
            />
          </CustomPlayerControlsContainer>
        </CustomPlayerDetailsContainer>
      </SoundCloudPlayerContainer>
    )
  }
)

export const SoundCloudPlayerWidget = ({
  URI,
  date,
  title,
  tags,
  description,
  source,
  setFilters,
  className,
}: {
  URI: string
  date: string
  title: string
  tags: string[]
  description: string
  source: string
  setFilters: (options: { tags: string[]; sources: string[] }) => void
  className?: string
}) => {
  const dateString = DateTime.fromFormat(
    date,
    "yyyy/MM/dd HH:mm:ss ZZZ"
  ).toLocaleString(DateTime.DATE_HUGE)

  let [mdDesc, setMdDesc] = useState<string | null>(null)
  let [mainArtworkURL, setMainArtworkURL] = useState<string | null>(null)

  function setArtworkUrl(track) {
    if (track && track.artwork_url) {
      setMainArtworkURL(
        track.artwork_url.slice(0, track.artwork_url.length - 9) +
          "t500x500.jpg"
      )
    } else if (track && track.user && track.user.avatar_url) {
      setMainArtworkURL(
        track.user.avatar_url.slice(0, track.user.avatar_url.length - 9) +
          "t500x500.jpg"
      )
    } else {
      setMainArtworkURL(null)
    }
  }

  useEffect(() => {
    const turndownService = new TurndownService()
    setMdDesc(turndownService.turndown(description))
  }, [description])

  return (
    <SoundCloudPlayerWidgetContainer className={className}>
      <CustomPlayerColumnContainer>
        <IOItemHeader
          URI={URI}
          date={dateString}
          title={title}
          tags={tags}
          source={source}
          icon={SoundCloudIcon}
          setFilters={setFilters}
        />
        <SoundCloudPlayer
          resolveUrl={URI}
          clientId={process.env.GATSBY_SC_APIKEY}
          date={date}
          setArtworkUrl={setArtworkUrl}
        />
        <IODescriptionContainer>
          {mdDesc && <ReactMarkdown>{mdDesc || ""}</ReactMarkdown>}
        </IODescriptionContainer>
      </CustomPlayerColumnContainer>
      <CustomPlayerColumnContainer>
        <CustomPlayerArtContainer>
          <img src={mainArtworkURL ? mainArtworkURL : ""} />
        </CustomPlayerArtContainer>
      </CustomPlayerColumnContainer>
    </SoundCloudPlayerWidgetContainer>
  )
}
