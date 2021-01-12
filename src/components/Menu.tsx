import React, { useEffect, useState } from "react"
import { Flex } from "rebass"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from "styled-components"
import { LayoutComponents } from "../Theme"
import { WindowLocation } from "@reach/router"
import { motion } from "framer-motion"

const TRANSITION_DURATION = 1

const getMenuCardContainerVariants = (windowWidth: number) => ({
  expanded: {
    width: "310px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    height: "75px",
    width: windowWidth
      ? windowWidth < 1000
        ? `${windowWidth - 16}px`
        : `1000px`
      : "100%",
    flexDirection: "row-reverse",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
})

const MenuCardContainer = styled(motion.div).attrs(
  (p: { windowWidth: number }) => ({
    variants: getMenuCardContainerVariants(p.windowWidth),
  })
)<{ windowWidth: number }>`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const getMenuCardVariants = (windowWidth: number) => ({
  expanded: {
    width: "310px",
    height: "480px",
    flexDirection: "column",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    width: windowWidth
      ? windowWidth < 1000
        ? `${windowWidth - 16}px`
        : `1000px`
      : "100%",
    height: "75px",
    flexDirection: "row-reverse",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
})

const MenuCard = styled(motion.div).attrs((p: { windowWidth: number }) => ({
  variants: getMenuCardVariants(p.windowWidth),
}))<{ windowWidth: number }>`
  /* width: 310px;
  height: 480px; */
  background-color: black;
  border-radius: 16px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const MenuMiddleVariants = {
  expanded: {
    // marginLeft: "auto",
    // marginRight: "auto",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    marginLeft: "16px",
    // marginRight: "auto",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
}

const MenuMiddle = styled(motion.div).attrs(() => ({
  variants: MenuMiddleVariants,
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* margin-left: 16px; */
  max-width: "100%";
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`

const MenuMiddleColumnVariants = {
  expanded: {
    opacity: [null, 0, 0.2, 0.6, 0.9, 1],
    width: [null, "0%", "20%", "60%", "90%", "100%"],
    display: "flex",
    height: "100%",
    transition: {
      duration: 0.5 * TRANSITION_DURATION,
      when: "beforeChildren",
    },
  },
  contracted: {
    opacity: [null, 1, 0.9, 0.6, 0.2, 0],
    width: [null, "100%", "90%", "60%", "20%", "0%"],
    display: "none",
    height: "0%",
    transition: {
      duration: 0.5 * TRANSITION_DURATION,
      when: "afterChildren",
    },
  },
}

const MenuMiddleColumn = styled(motion.div).attrs(() => ({
  variants: MenuMiddleColumnVariants,
}))`
  flex-direction: column;
`

const PortraitPhotoBoxVariants = {
  expanded: {
    height: "unset",
    // maxWidth: "0px",
    borderRadius: "1px",
    border: "0px",
    backgroundColor: "rgba(0,0,0,1)",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    height: "60px",
    // maxWidth: "800px",
    borderRadius: "50%",
    border: "1px solid white",
    backgroundColor: "rgba(255,255,255,1)",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
}

const PortraitPhotoBox = styled(motion.div).attrs(() => ({
  variants: PortraitPhotoBoxVariants,
}))`
  overflow: visible;
  align-content: center;
  text-align: center;
  margin-bottom: 0;
  margin-right: 24px;
`

// ${p =>
//   !p.expand &&
//   `
//   height: 60px;
//   max-width: 800px;
//   flex-direction: row;
//   border-radius: 50%;
//   border: 1px solid white;
//   background-color: white;
// `}

const PortraitPhotoVariants = {
  expanded: {
    width: "120px",
    height: "250px",
    borderRadius: "0px",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
}

const PortraitPhoto = styled(motion.img).attrs(() => ({
  variants: PortraitPhotoVariants,
}))`
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  );
  object-fit: cover;
  object-position: top;
  overflow: hidden;
`

const DescriptionContainer = styled.div`
  margin-left: 16px;
  margin-right: auto;
  margin-bottom: 8px;
  color: white;
`

const getTextContainerVariants = (lineHeight: number) => ({
  expanded: {
    lineHeight: `${lineHeight}px`,
    opacity: [1],
    transition: {
      duration: 0.5 * TRANSITION_DURATION,
    },
  },
  contracted: {
    lineHeight: "0px",
    opacity: [0],
    transition: {
      duration: 0.5 * TRANSITION_DURATION,
    },
  },
})

const NameContainer = styled(motion.div).attrs(() => ({
  variants: getTextContainerVariants(28),
}))`
  margin-left: 16px;
  margin-right: auto;
`

const Name = styled.h1`
  margin-top: 8px;
  margin-bottom: 0px;
  font-size: 28px;
  overflow: visible;
  color: white;
`

const DescH2 = motion.custom(LayoutComponents.h2compact)

const MenuContainerVariants = {
  expanded: {
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  contracted: {
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
}

const MenuContainer = styled(motion.custom(Flex)).attrs(() => ({
  variants: MenuContainerVariants,
}))`
  margin-top: 8px;
  flex-direction: row;
  max-width: 500px;
`

interface TopNavLinkProps {
  readonly iscurrent: boolean
}

const TopNavLink = styled(TransitionLink)<TopNavLinkProps>`
  text-decoration: none;
  color: ${p => (p.$isCurrent ? "gold" : "white")};
  /* background-color: ${p => (p.isCurrent ? "gold" : "white")}; */
  margin: auto 8px auto 8px;
  /* border: 1px solid;
  border-color: ${p => (p.isCurrent ? "gold" : "clear")};
  border-radius: 8px; */
  padding: 8px 16px;
  height: 20px;
`

export const Menu = ({
  data,
  sectionTitle,
  location,
  animate,
  initial,
  windowWidth,
}: {
  data: any
  sectionTitle: string
  location: WindowLocation
  animate: string
  initial: string
  windowWidth: number
}) => {
  // function handleTransitionTrigger(destinationPath: string) {
  //   console.log("handled transition trigger")
  //   if (destinationPath !== location.pathname) {
  //     switch (destinationPath) {
  //       case "/":
  //         setAnimate("expanded")
  //       default:
  //         setAnimate("contracted")
  //     }
  //   }
  // }

  const [width, setWidth] = useState<number>(windowWidth)

  function getNextInitial(path) {
    if (path === "/") {
      if (animate === "expanded") {
        return "expanded"
      } else {
        return "contracted"
      }
    } else {
      return "contracted"
    }
  }

  function getNextAnimate(path) {
    if (path === "/") {
      return "expanded"
    } else {
      return "contracted"
    }
  }

  function getCurrentInitial() {
    if (sectionTitle === "Home") {
      return "expanded"
    } else {
      return "contracted"
    }
  }

  function getExitAnimate(path) {
    if (path === "/") {
      return "expanded"
    } else {
      return "contracted"
    }
  }

  // function getAnimateValue() {
  //   console.log(entry)
  //   console.log(exit)
  //   console.log(transitionStatus)
  //   if (entry || exit) {
  //     switch (transitionStatus) {
  //       case "entering":
  //         return entry
  //           ? entry.state.animate
  //             ? entry.state.animate
  //             : null
  //           : null
  //       case "exiting":
  //         return exit ? (exit.state.animate ? exit.state.animate : null) : null
  //     }
  //   } else {
  //     return null
  //   }
  // }

  useEffect(() => {
    if (windowWidth) {
      setWidth(windowWidth)
    }
  }, [windowWidth])

  // console.log(getAnimateValue())

  return (
    <MenuCardContainer
      windowWidth={width}
      animate={animate}
      initial={initial || getCurrentInitial()}
      transition={{
        duration: TRANSITION_DURATION,
      }}
      layout
    >
      <MenuCard
        windowWidth={width}
        initial={initial || getCurrentInitial()}
        transition={{
          duration: TRANSITION_DURATION,
        }}
        layout
      >
        <MenuContainer>
          {data.allMdx.edges.map((edge, index) => {
            let {
              node: {
                frontmatter: { title, path },
              },
            } = edge

            if (path === null) {
              path = "/"
            } else {
              path = `/${path}`
            }
            return (
              <TopNavLink
                to={`${path}`}
                key={index}
                $isCurrent={location.pathname === path ? true : undefined}
                entry={{
                  length: 1,
                  state: {
                    initial: getNextInitial(path),
                    animate: getNextAnimate(path),
                  },
                }}
                exit={{
                  length: 1,
                  state: {
                    initial: getCurrentInitial(),
                    animate: getExitAnimate(path),
                  },
                }}
              >
                {title}
              </TopNavLink>
            )
          })}
          <TopNavLink
            to={`/blog`}
            $isCurrent={
              location.pathname.indexOf(`/blog`) !== -1 ? true : undefined
            }
            entry={{
              length: 1,
              state: {
                initial: getNextAnimate("/blog"),
              },
            }}
            exit={{
              length: 1,
              state: {
                initial: getCurrentInitial(),
                animate: getExitAnimate("/blog"),
              },
            }}
            // enter={entryTransition}
          >
            Blog
          </TopNavLink>
        </MenuContainer>
        <MenuMiddle
          inherit={true}
          initial={initial || getCurrentInitial()}
          layout
        >
          <MenuMiddleColumn
            inherit={true}
            initial={initial || getCurrentInitial()}
            layout
          >
            <NameContainer
              inherit={true}
              initial={initial || getCurrentInitial()}
              transition={{ when: "afterChildren" }}
            >
              <Name>Tim L. Fitzgerald</Name>
            </NameContainer>
            <DescriptionContainer>
              <DescH2
                inherit={true}
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                programmer
              </DescH2>
              <DescH2
                inherit={true}
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                sysadmin
              </DescH2>
              <DescH2
                inherit={true}
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                systems engineer
              </DescH2>
              <DescH2
                inherit={true}
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                useful human
              </DescH2>
            </DescriptionContainer>
          </MenuMiddleColumn>
          <PortraitPhotoBox
            inherit={true}
            initial={initial || getCurrentInitial()}
            layout
          >
            <PortraitPhoto
              inherit={true}
              src="assets/media/tim-photo-cutout-bw.png"
              initial={initial || getCurrentInitial()}
            />
          </PortraitPhotoBox>
        </MenuMiddle>
      </MenuCard>
    </MenuCardContainer>
  )
}
