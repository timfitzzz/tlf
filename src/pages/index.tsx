import SectionsLayout from "../layouts/SectionsLayout"
import React from "react"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { WindowConfig } from "hooks/useWindowConfig"

export default function Home({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { w, h } = WindowConfig.useContainer()
  const { current } = state

  // console.log("transitionstate: ", mount, current, exit, entry)

  return (
    <SectionsLayout
      windowWidth={w}
      windowHeight={h}
      current={current}
      sectionTitle={"Home"}
      location={location}
    />
  )
}
