// @ts-check

/**
 * Since this file is shared with NetlifyCMS it must be .jsx
 */

import React, { Fragment } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Button } from "rebass/styled-components"
import { Row, Column, Section } from "./components/elements";
import { CVColumn, CVDatesDisplay, CVRow, CVSectionTitle, CVEmployer, CVDates, CVJobTitle, CVLocation, CVDescription, CVSection, CVEntryContainer, CVDescriptionListItem, CVDescriptionList } from './ContentUIComponents';

const colors = {
  gold: 'gold',
  gray: 'gray',
  spectralMaroon: 'rgba(71, 19, 55, 1)',
  spectralRed: '#b13254',
  spectralDarkOrange: '#ff5349',
  spectralOrange: '#ff7249',
  spectralLightOrange: '#ff9248'
}

export const theme = {
  // TODO: https://rebassjs.org/theming
  fonts: {
    title1: `"Asap Condensed", Arial, Helvetica, sans-serif`,
    title2: `"Asap", Arial, Helvetica, sans-serif`,
    body: `"Asap Condensed", Arial, Helvetica, sans-serif`,
    bodyB: `"Poppins", Arial, Helvetica, sans-serif`,
    body2: `"Crimson Text", Times New Roman, serif`
  },
  colors,
  palette: {
    darkBackground: colors.spectralMaroon,
    highlightText: colors.spectralOrange,
    lightBackground: colors.spectralRed,
  }

}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: ${theme.fonts.body};
    background-color: white;
    color: black;
    overflow-y: visible;
    font-weight: 200;
    letter-spacing: 1px;
    font-size: 16px;
    height: 100%;
    min-height: 100%;
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;
  }
  
  body {
    padding: 4px;
    margin: 0px;
    height: 100%;
    min-height: 100%;
  }

   #___gatsby {
    height: 100%;
    min-height: 100%;
    width: 100%;
    min-width: 100%;

  }
  /*
  #gatsby-focus-wrapper {
    height: 100%;
    min-height: 100%;
    display: flex;
  }

  .tl-edges {
    width: 100%;
    height: 100%;
  }

  .tl-wrapper {
    width: 100%;
    height: 100%;
  } */

  h1 {
    font-family: "Asap Condensed", Arial, Helvetica, sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
  }

  h2 {
    font-family: "Asap", Arial, Helvetica, sans-serif;
  }

  h3 {
    font-family: "Asap Condensed", Arial, Helvetica, sans-serif;
  }

  /* .tl-edges {
    width: 100% !important;
    overflow: inherit !important;
  } */
`

export const LayoutComponents = {
  h1: styled.h1`
    font-size: 20px;
  `,
  p: styled.p`
    font-size: 16px;
  `,
  h2compact: styled.h2`
    font-size: 15px;
    margin: 2px 0px;
    padding: 0px;
    line-height: 20px;
    font-weight: 400;
  `,
  h3: styled.h3`
    font-family: "Asap Condensed", Helvetica, sans-serif;
  `,
  bodyContainer: styled.div`
    background-color: white;
    display: flex;

    flex-direction: column;
    margin: auto auto;
    align-items: top;
    height: 100%;
    width: 100%;
    max-width: 1000px;
    
  `
}

export const TRANSITION_DURATION = 1
export const MIN_WIDTH = 304
export const MIN_HEIGHT = 568

export const UIComponents = {
  Button: props => <Button {...props}>{props.children}</Button>,
  CVSectionTitle: props => <CVSectionTitle {...props}>{props.children}</CVSectionTitle>,
  CVEmployer: props => <CVEmployer {...props}>{props.children}</CVEmployer>,
  CVDates: props => <CVDates {...props}>{props.children}</CVDates>,
  CVJobTitle: props => <CVJobTitle {...props}>{props.children}</CVJobTitle>,
  CVLocation: props => <CVLocation {...props}>{props.children}</CVLocation>,
  CVDescription: props => <CVDescription {...props}>{props.children}</CVDescription>,
  CVSection: props => <CVSection {...props}>{props.children}</CVSection>,
  CVEntryContainer: props => <CVEntryContainer {...props}>{props.children}</CVEntryContainer>,
  CVRow: props => <CVRow {...props}>{props.children}</CVRow>,
  CVDescriptionList: props => <CVDescriptionList {...props}>{props.children}</CVDescriptionList>,
  CVDescriptionListItem: props => <CVDescriptionListItem {...props}>{props.children}</CVDescriptionListItem>,
  Row: props => <Row {...props}>{props.children}</Row>,
  Column: props => <Column {...props}>{props.children}</Column>,
  Section: props => <Section {...props}>{props.children}</Section>,
  CVDatesDisplay: props => <CVDatesDisplay {...props}>{props.children}</CVDatesDisplay>,
  CVColumn: props => <CVColumn {...props}>{props.children}</CVColumn>
}



export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
