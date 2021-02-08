// @ts-check

const playgroundHastPlugin = require("./src/utils/playgroundHastPlugin")

module.exports = {
  siteMetadata: {
    title: "Tim L. Fitzgerald",
    description: "-- placeholder --",
    author: "timothyliamfitzgerald@gmail.com",
  },
  plugins: [
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],

        // Default layouts are meta wrappers around .mdx pages. Can be useful to
        // share queries across different types of pages.
        defaultLayouts: {
          default: require.resolve("./src/layouts/DefaultLayout.tsx"),
        },

        // MDX AST transformers
        hastPlugins: [playgroundHastPlugin],

        // Imports here are available globally to .mdx files, with the exception
        // of automatically created pages located in /pages. This is a bug in
        // gatsby-mdx. See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/243
        //
        // Also note: For mdx to work in NetlifyCMS, global scope passed in here
        // also be passed into `cms.js`, under the `scope` key.
        //
        globalScope: `
          import { UIComponents } from 'Theme'
          export default {
            ...UIComponents
          }
        `,

        // mdPlugins: [],
        // gatsbyRemarkPlugins: [{}],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-with-attributes`,
      options: {
        fonts: [
          `open sans condensed\:300,300i,700`, // you can also specify font weights and styles
          `asap condensed\:200,400,400i,500,500i,600,600i`,
          `poppins\:200,300,400,400i`,
          `asap\:400,400i,600`,
          `crimson text\:400,400i,600,600i,700,700i`
        ],
        display: 'block',
        attributes: {
          rel: "stylesheet preload prefetch",
        },
      }
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.jsx`,
        enableIdentityWidget: false,
        publicPath: "admin",
        htmlTitle: "Admin",
        manualInit: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "io",
        path: `${__dirname}/content/io/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "sections",
        path: `${__dirname}/content/mdx/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/images`
      }
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/Boot.tsx`)
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/
        }
      }
    }
  ],
}
