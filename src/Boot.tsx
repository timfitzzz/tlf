import { MDXProvider } from "@mdx-js/react"
import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { LayoutComponents, Theme } from "./Theme"
import * as ContentUIComponents from "./ContentUIComponents"
import { Location as LocationProvider } from "@reach/router"
import { MenuRootContainer } from "./components/MenuRootContainer"
import BodyContainer from "components/BodyContainer"

export const Boot: React.FunctionComponent<{
  children: any
}> = ({ children }) => {
  return (
    <LocationProvider>
      {(location) => (
        <StateProvider>
          <MDXProvider
            components={{ ...LayoutComponents, ...ContentUIComponents }}
          >
            <Theme>
              <WindowConfig.Provider>
                <BodyContainer>
                  <MenuRootContainer location={location.location} />
                  {children !== 0 ? children : null}
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
