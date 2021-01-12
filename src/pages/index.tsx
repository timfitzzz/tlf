import SectionsLayout from "../layouts/SectionsLayout"
import React from "react"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { useWindowConfig } from "hooks/useWindowConfig"

export default function Home({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { w } = useWindowConfig()
  const { mount, current, exit, entry } = state

  console.log("transitionstate: ", mount, current, exit, entry)

  return (
    <SectionsLayout
      windowWidth={w}
      current={current}
      sectionTitle={"Home"}
      location={location}
    />
  )
}
