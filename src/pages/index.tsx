import SectionsLayout from "../layouts/SectionsLayout"
import React from "react"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { Helmet } from "react-helmet"
import ProjectButton from "../components/ProjectButton"
import styled from "styled-components"

const ButtonIcon = styled.img``

const ProjectHeader = styled.div`
  padding-top: 16px;
  padding-bottom: 8px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  font-weight: 700;
  text-transform: lowercase;
  color: ${(p) => p.theme.palette.lightBackground};
`

export default function Home({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { current } = state

  // console.log("transitionstate: ", mount, current, exit, entry)

  return (
    <SectionsLayout current={current} sectionTitle={"Home"} location={location}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tim L. Fitzgerald</title>
        <link rel="canonical" href="https://timfitz.dev" />
      </Helmet>
      <ProjectHeader className={"projectsHeader"}>
        Current Projects - august 11th, 2021
      </ProjectHeader>
      <ProjectButton
        url={"https://sandyforcouncil.com"}
        Logo={<ButtonIcon src={"assets/media/sandy-header-logo-en.png"} />}
        name={"Sandy Nurse for New York City Council"}
        description={
          "Campaign site for primary-winning 2021 NY City Council candidate Sandy Nurse"
        }
      />
      <ProjectButton
        url={"https://clipstime.manapool.nyc"}
        Logo={
          <ButtonIcon
            src={"https://clipstime.manapool.nyc/android-chrome-512x512.png"}
          />
        }
        name={"ClipsTime!"}
        description={
          "More harmonious media-sharing between Twitch streamers and their audiences"
        }
      />
    </SectionsLayout>
  )
}
