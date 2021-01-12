import React from "react"
import { Rect } from "react-konva"

export const Backdrop = ({ h, w }: { h: number; w: number }) => {
  return <Rect height={h} width={w} x={0} y={0} fill={"black"} />
}
