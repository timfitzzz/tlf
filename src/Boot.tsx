import { MDXProvider } from "@mdx-js/tag"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { LayoutComponents, Theme } from "./Theme"
import { Location as LocationProvider } from "@reach/router"
import { MenuRootContainer } from "./components/MenuRootContainer"
import BodyContainer from "components/BodyContainer"

// TODO: Need to create gatsby-plugin-react-head
// import { HeadProvider } from "react-head"

export const Boot: React.FunctionComponent<{
  children: any
}> = ({ children }) => {
  return (
    <LocationProvider>
      {location => (
        <StateProvider>
          <MDXProvider components={LayoutComponents}>
            <Theme>
              <WindowConfig.Provider>
                <BodyContainer>
                  <MenuRootContainer location={location.location} />
                  {children}
                </BodyContainer>
              </WindowConfig.Provider>
            </Theme>
          </MDXProvider>
        </StateProvider>
      )}
    </LocationProvider>
  )
}

export default Boot
