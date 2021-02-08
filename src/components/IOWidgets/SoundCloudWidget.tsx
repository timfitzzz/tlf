import React from "react"
import styled from "styled-components"
import { PlayButton, Progress, Timer } from "react-soundplayer/components"
import { withSoundCloudAudio } from "react-soundplayer/addons"
import { DateTime } from "luxon"
import {
  IODescription,
  IODescriptionContainer,
  IOEntryContainer,
  IOItemHeader,
} from "./IOCommon"
import SoundCloudIcon from "../../../static/assets/media/soundcloud.svg"

// export const CustomPlayerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* margin: 8px; */
//   /* padding: 16px; */
//   /* border: 2px solid ${p => p.theme.palette.lightBackground};
//   border-radius: 16px; */
//   box-sizing: border-box;
//   width: 100%;
//   max-width: 330px;
//   min-width: 300px;
// `

export const CustomPlayerArtContainer = styled.div`
  width: 100%;
  /* height: 330px; */
  display: inherit;
  border: 2px solid lightgray;
  border-radius: 3px;
  box-sizing: inherit;

  > img {
    width: 100%;
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
`

export const CustomPlayButton = styled(PlayButton).attrs(p => ({
  backgroundImgUrl: p.backgroundImgUrl,
}))<{
  backgroundImgUrl: string
}>`
  height: 13px;
  width: 13px;
  padding: 0px;
  display: flex;

  svg {
    height: 9px;
    width: 10px;
    margin: 0px;
  }
  /* background-image: url(${p => p.backgroundImgUrl}); */
`

export const PlayerLabel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

// export const TrackName = styled.div`
//   font-family: ${p => p.theme.fonts.title1};
//   font-weight: 700;
//   font-size: 12px;
//   margin-right: 0;
//   margin-left: auto;
// `

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
  background-color: ${p => p.theme.palette.darkBackground};
  background-image: url(${p => p.waveformUrl});
  background-size: 100% 100%;
  width: 100%;
  height: 50px;
  overflow: hidden;
  cursor: pointer;


/* 
  ::before {
    content: "";
    position: absolute
  } */

  > div {
    border-radius: 3px 0 0 3px;
    /* background-image: url(${p => p.waveformUrl});
    background-color: 'orange'; */
    background-color: ${p => p.theme.palette.lightBackground}88;
    height: 100%;
    transition: width 0.2s ease-in;
    cursor: pointer;

  }
`
export const SoundCloudPlayer = withSoundCloudAudio(
  ({ track, currentTime, duration, ...props }) => {
    // console.log(track)

    function getMainArtworkUrl() {
      if (track && track.artwork_url) {
        return (
          track.artwork_url.slice(0, track.artwork_url.length - 9) +
          "t500x500.jpg"
        )
      } else if (track && track.user && track.user.avatar_url) {
        return (
          track.user.avatar_url.slice(0, track.user.avatar_url.length - 9) +
          "t500x500.jpg"
        )
      } else {
        return ""
      }
    }

    return (
      <IOEntryContainer>
        <CustomPlayerArtContainer>
          <img src={getMainArtworkUrl()} />
        </CustomPlayerArtContainer>

        <CustomPlayerDetailsContainer>
          <CustomProgress
            value={(currentTime / duration) * 100 || 0}
            waveformUrl={track && track.waveform_url}
            {...props}
          ></CustomProgress>
          <CustomPlayerControlsContainer>
            <CustomPlayButton
              {...props}
              backgroundImgUrl={getMainArtworkUrl()}
            />
            <CustomTimer
              duration={track ? track.duration / 1000 : 0}
              currentTime={currentTime}
              {...props}
            />
          </CustomPlayerControlsContainer>
          {/* <TopSectionContainer>
            <ArtistContainer>
              <ArtistLink
                href={track && track.user && track.user.permalink_url}
              >
                <ArtistLogo
                  src={
                    track &&
                    track.user &&
                    track.user.avatar_url.slice(
                      0,
                      track.user.avatar_url.length - 9
                    ) + "t500x500.jpg"
                  }
                />
                <PlayerLabel className="custom-player-title"></PlayerLabel>
              </ArtistLink>
            </ArtistContainer>
          </TopSectionContainer> */}
        </CustomPlayerDetailsContainer>
      </IOEntryContainer>
    )
  }
)

const SoundCloudPlayerWidgetContainer = styled.div`
  width: 50%;
  max-width: 330px;
  min-width: 250px;
  margin-left: auto;
  margin-right: auto;
`

export const SoundCloudPlayerWidget = ({
  URI,
  date,
  title,
  tags,
  description,
  source,
}) => {
  const dateString = DateTime.fromFormat(
    date,
    "yyyy/MM/dd HH:mm:ss ZZZ"
  ).toLocaleString(DateTime.DATE_HUGE)

  return (
    <SoundCloudPlayerWidgetContainer>
      <IOItemHeader
        date={dateString}
        title={title}
        tags={tags}
        source={source}
        icon={SoundCloudIcon}
      />
      <SoundCloudPlayer
        resolveUrl={URI}
        clientId={process.env.GATSBY_SC_APIKEY}
        date={date}
      />
      <IODescriptionContainer>
        <IODescription>{description}</IODescription>
      </IODescriptionContainer>
    </SoundCloudPlayerWidgetContainer>
  )
}
