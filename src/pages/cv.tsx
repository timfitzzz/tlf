import SectionsLayout from "../layouts/SectionsLayout"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import React from "react"
import { WindowLocation } from "@reach/router"

export default function CV({ location }: { location: WindowLocation }) {
  const state = useTransitionState()
  const { current } = state

  return (
    <SectionsLayout current={current} sectionTitle={"CV"} location={location} />
  )
}
