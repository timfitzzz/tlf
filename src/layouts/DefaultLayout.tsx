// import MDXRenderer from "gatsby-mdx/mdx-renderer"
// import React from "react"
// import { Box } from "rebass"
// import { graphql } from "gatsby"
// import { Serif } from "components/ui/Typography"
// import BlogLayout from "./BlogLayout"

// export default function DocsLayout(props) {
//   const {
//     data: {
//       mdx: {
//         code,
//         frontmatter: { title },
//       },
//     },
//   } = props

//   return (
//     <BlogLayout>
//       <Box p={2}>
//         <Serif size="8">{title}</Serif>
//         <MDXRenderer>{code.body}</MDXRenderer>
//       </Box>
//     </BlogLayout>
//   )
// }

// /**
//  * Query for data for the page. Note that $id is injected in via context from
//  * actions.createPage. See gatsby-node.js for more info.
//  */
// export const pageQuery = graphql`
//   query DocsLayoutQuery($id: String) {
//     mdx(id: { eq: $id }) {
//       id
//       frontmatter {
//         title
//       }
//       code {
//         body
//       }
//     }
//   }
// `
