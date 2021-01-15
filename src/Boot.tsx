import { MDXProvider } from "@mdx-js/tag"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { LayoutComponents, Theme } from "./Theme"
import { Location, LocationState } from "history"
import { MenuRootContainer } from "./components/MenuRootContainer"

// TODO: Need to create gatsby-plugin-react-head
// import { HeadProvider } from "react-head"

export const Boot: React.FunctionComponent<{
  element: any
  location: Location<LocationState>
}> = ({ element, location }) => {
  return (
    <StateProvider>
      <MDXProvider components={LayoutComponents}>
        <Theme>
          <WindowConfig.Provider>
            <LayoutComponents.bodyContainer>
              <MenuRootContainer location={location} />
              {element}
            </LayoutComponents.bodyContainer>
          </WindowConfig.Provider>
        </Theme>
      </MDXProvider>
    </StateProvider>
  )
}
