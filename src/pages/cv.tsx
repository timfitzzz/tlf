import SectionsLayout from "../layouts/SectionsLayout"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import React from "react"
import { WindowLocation } from "@reach/router"
import { WindowConfig } from "hooks/useWindowConfig"

export default function CV({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { w } = WindowConfig.useContainer()
  const { current } = state

  return (
    <SectionsLayout
      windowWidth={w}
      current={current}
      sectionTitle={"CV"}
      location={location}
    />
  )
}
