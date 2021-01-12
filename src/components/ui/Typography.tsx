import styled from "styled-components"

export interface Typography {
  size?: string
}

export const Sans = styled.div<Typography>`
  font-family: "Open Sans Condensed";
`

export const Serif = styled.div<Typography>`
  font-family: "Times New Roman", Times, serif;
`

const NavTitle = styled(Sans as any)`
    
`
