// import React, { useEffect, useState } from "react"
// import styled from "styled-components"
// import useAxios from "axios-hooks"
// import { PNG } from "pngjs/browser"

// export const WaveForm = ({
//   url,
//   className,
// }: {
//   url: string
//   className?: string
// }) => {
//   let [{ data }] = useAxios(url, { responseType: 'arraybuffer '})
//   let [png, setPng] = useState<PNG | null>(null)

//   useEffect(() => {
//     if (data) {
//       let Reader = new PNG(data)
//       Reader.parse((err, png) => {
//         if (err) throw err
//         else setPng(png)
//       })
//     }
//   }, data)

//   return <div className={className}>{png}</div>
// }
