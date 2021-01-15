// @ts-check

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const { Boot } = require("./src/Boot")
const { Location } = require("@reach/router")
const React = require('react')

exports.wrapRootElement = ({element}) => (
  <Location>
    {location => <Boot element={element} {...location} />}
  </Location>
)

exports.shouldUpdateScroll = () => { return [0,0]; };