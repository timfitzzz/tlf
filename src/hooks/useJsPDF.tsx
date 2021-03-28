// import React, { useMemo } from 'react'
// import { jsPDFOptions } from 'jspdf'
// import html2canvas from 'html2canvas'

// interface IUseJsPDF {
//   ref: React.MutableRefObject<HTMLDivElement> | null
//   options: jsPDFOptions
//   scale: number
// }

// interface OUseJsPDF {
//   saveAsPDF: () => void;
// }

// export const useJsPDF = ({ref, options, scale}: IUseJsPDF): OUseJsPDF => {
//   const isBrowser = typeof window === "undefined"

//   const saveAsPdf = useMemo(() => isBrowser && ref ? () => {

//       const targetComponent = ref.current || ref

//       if(!targetComponent) {
//         throw new Error('Target ref must be provided and attached to a component.')
//       }

//       html2canvas(targetComponent, {
//         logging: false,
//         useCORS: true,
//         scale
//       }).then((canvas) => {

//         let imgData = canvas.toDataURL('image/jpeg');
//         const pdf = new JsPdf(options);

//       })

//   } : () => {}, [isBrowser])

//   return { saveAsPDF }

// }

// export default useJsPDF
