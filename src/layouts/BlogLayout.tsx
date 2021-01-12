import { Sans } from "components/ui/Typography"
import { Link } from "gatsby"
import React from "react"
import { Box, Flex } from "rebass/styled-components"

export default ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      <Flex>
        <Box mr="20px">
          <Box mb="20px">
            <Link to="/">
              <Sans>Home</Sans>
            </Link>
          </Box>
        </Box>
        {children}
      </Flex>
    </div>
  )
}
