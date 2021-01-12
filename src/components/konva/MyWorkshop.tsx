// import React from "react"
// import { Backdrop } from "./BusinessCard/Backdrop"
// import { Stage, Layer, Line, Rect, Circle, Image } from "react-konva"
// import { useWindowConfig } from "hooks/useWindowConfig"
// import useImage from "use-image"

// const MyWorkshop = ({ fullScreen }: { fullScreen: boolean }) => {
//   let dimensions = useWindowConfig()

//   let [timStanding] = useImage("assets/media/tim-photo-cutout-bw.png")

//   let h: number
//   let w: number
//   if (dimensions) {
//     h = dimensions.h
//     w = dimensions.w
//   }

//   let imageScale = timStanding ? (0.25 * h) / timStanding.naturalHeight : 1

//   console.log(imageScale)

//   return (
//     <>
//       {dimensions && h && w && fullScreen && (
//         <Stage height={h} width={w}>
//           <Layer>
//             <Backdrop h={h} w={w} />
//             <Image
//               image={timStanding}
//               scale={{ x: imageScale, y: imageScale }}
//             />
//           </Layer>
//         </Stage>
//       )}
//     </>
//   )
// }

// export default MyWorkshop
