import { MDXProvider } from "@mdx-js/tag"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { LayoutComponents, Theme } from "./Theme"

// TODO: Need to create gatsby-plugin-react-head
// import { HeadProvider } from "react-head"

export const Boot: React.FunctionComponent<{ element: any }> = ({
  element,
}) => {
  return (
    <StateProvider>
      <MDXProvider components={LayoutComponents}>
        <Theme>
          <WindowConfig.Provider>{element}</WindowConfig.Provider>
        </Theme>
      </MDXProvider>
    </StateProvider>
  )
}
