import { WindowConfig } from "hooks/useWindowConfig"
import React from "react"
import styled from "styled-components"

export const BodyContainerDiv = styled.div<{ maxWidth: number }>`
  background-color: white;
  display: flex;

  flex-direction: column;
  margin: auto auto;
  align-items: top;
  height: 100%;
  width: 100%;
  max-width: ${(p) => (p.maxWidth ? p.maxWidth : "1000")}px;
`

export const BodyContainer = ({ children }: { children: any }) => {
  const { w } = WindowConfig.useContainer() as { h: number; w: number }

  return <BodyContainerDiv maxWidth={w}>{children}</BodyContainerDiv>
}

export default BodyContainer
