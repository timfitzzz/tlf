import SectionsLayout from "../layouts/SectionsLayout"
import React from "react"
import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
import { Helmet } from "react-helmet"

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
    </SectionsLayout>
  )
}
