import { WindowLocation } from "@reach/router"
import { useTransitionState } from "gatsby-plugin-transition-link/hooks"
// import { Sans } from "components/ui/Typography"
// import { Link } from "gatsby"
import React from "react"
// import { Box, Flex } from "rebass/styled-components"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import SectionsLayout from "./SectionsLayout"
import styled from "styled-components"
import { motion } from "framer-motion"
import { graphql } from "gatsby"

export const BlogPageContainer = styled(motion.div).attrs(() => ({}))``

export interface IBlogPage {
  location: WindowLocation
  data: any
}

export default function BlogPage({ location, data }: IBlogPage) {
  const state = useTransitionState()
  const { current } = state

  const {
    mdx: {
      // id,
      // excerpt,
      code: { body },
      // fields: { route },
      frontmatter: { title /* date, description, tags  */ },
      // html,
    },
  } = data

  return (
    <SectionsLayout
      current={current}
      sectionTitle={"blog"}
      location={location}
      title={title}
    >
      <BlogPageContainer>
        {title}
        <MDXRenderer key={Math.random().toString()}>{body}</MDXRenderer>
      </BlogPageContainer>
    </SectionsLayout>
  )
}

// export default ({ children }: { }) => {
//   return (
//     <div>
//       <Flex>
//         <Box mr="20px">
//           <Box mb="20px">
//             <Link to="/">
//               <Sans>Home</Sans>
//             </Link>
//           </Box>
//         </Box>
//         {children}
//       </Flex>
//     </div>
//   )
// }

export const pageQuery = graphql`
  query BlogQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 100)
      bodyText: excerpt
      code {
        body
      }
      fields {
        route
      }
      frontmatter {
        title
        date
        description
        tags
      }
      html
    }
  }
`
