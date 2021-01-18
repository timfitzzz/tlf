// UI Libraries
import React, { useEffect, useMemo, useState } from "react"
import { Flex } from "rebass"
import styled from "styled-components"
import { Location } from "history"
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion"

// Gatsby Lifecycle
import TransitionLink from "gatsby-plugin-transition-link"

// UI
import { LayoutComponents, theme } from "Theme"
import { TRANSITION_DURATION, MIN_WIDTH } from "Theme"

const transitions = {
  MenuCardContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.1,
      duration: TRANSITION_DURATION * 0.3,
      // when: "beforeChildren",
      // staggerChildren: TRANSITION_DURATION / 20,
      // delayChildren: TRANSITION_DURATION * 0.8,
      // staggerDirection: 1,
      ease: "easeIn",
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.4,
      duration: TRANSITION_DURATION * 0.4,
      // when: "afterChildren",
      // staggerChildren: TRANSITION_DURATION / 20,
      ease: "easeOut",
    },
  },
  MenuCard: {
    expanded: {
      delay: TRANSITION_DURATION * 0.4,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.2,
      duration: TRANSITION_DURATION * 0.2,
      // duration: TRANSITION_DURATION * 0.8,
    },
  },
  MenuMiddle: {
    expanded: {
      delay: TRANSITION_DURATION * 0.2,
      duration: TRANSITION_DURATION * 0.3,
      ease: "easeIn",
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.6,
      duration: TRANSITION_DURATION * 0.3,
      ease: "easeOut",
    },
  },
  MenuMiddleColumn: {
    expanded: {
      delay: TRANSITION_DURATION * 0.2,
      duration: TRANSITION_DURATION * 0.7,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.3,
      duration: TRANSITION_DURATION * 0.3,
    },
  },
  TextContainers: {
    expanded: {
      delay: TRANSITION_DURATION * 0.65,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: 0,
    },
  },
  IconContainers: {
    expanded: {
      delay: TRANSITION_DURATION * 0.65,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: 0,
    },
  },
  PortraitPhotoBox: {
    expanded: {
      delay: TRANSITION_DURATION * 0.25,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: TRANSITION_DURATION * 0.1,
    },
  },
  PortraitPhoto: {
    expanded: {
      delay: TRANSITION_DURATION * 0.65,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: TRANSITION_DURATION * 0.1,
    },
  },
  MenuContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.0,
      duration: TRANSITION_DURATION * 1,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      // times: [
      //   0,
      //   TRANSITION_DURATION * 0.25,
      //   TRANSITION_DURATION * 0.5,
      //   TRANSITION_DURATION * 0.75,
      //   TRANSITION_DURATION,
      // ],
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.1,
      duration: TRANSITION_DURATION * 0.9,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      // times: [
      //   0,
      //   TRANSITION_DURATION * 0.25,
      //   TRANSITION_DURATION * 0.5,
      //   TRANSITION_DURATION * 0.75,
      //   TRANSITION_DURATION,
      // ],
    },
  },
  MenuPositionContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.5,
      duration: TRANSITION_DURATION * 0.1,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.5,
      duration: TRANSITION_DURATION * 0.1,
    },
  },
}

const getMenuCardContainerVariants = (
  windowWidth: number,
  windowHeight: number
): { expanded: TargetAndTransition; contracted: TargetAndTransition } => {
  // function getWidthTween(percentageOfMargin) {
  //   if (windowWidth) {
  //     return MIN_WIDTH + (windowWidth - MIN_WIDTH) * percentageOfMargin
  //   }
  // }

  let variants = {
    expanded: {
      width: windowWidth ? [null, MIN_WIDTH] : MIN_WIDTH,
      // display: "flex",
      // flexDirection: "column",

      marginTop: windowHeight
        ? [null, (windowHeight - 300) / 2 + "px"]
        : "auto",

      transition: transitions.MenuCardContainer.expanded,
    },
    contracted: {
      width: windowWidth ? [null, windowWidth - 16] : "100%",
      marginTop: "8px",
      // flexDirection: "row-reverse",
      transition: transitions.MenuCardContainer.contracted,
    },
  }

  return variants
}

const MenuCardContainer = styled(motion.div).attrs(
  (p: { windowWidth: number; windowHeight: number }) => ({
    variants: getMenuCardContainerVariants(p.windowWidth, p.windowHeight),
  })
)<{ windowWidth: number; windowHeight: number }>`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
`

const MenuCardVariants: {
  expanded: TargetAndTransition
  contracted: TargetAndTransition
} = {
  expanded: {
    height: "300px",
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
    transitionEnd: {
      flexDirection: "column",
    },
    transition: transitions.MenuCard.expanded,
  },
  contracted: {
    height: "75px",
    borderTopLeftRadius: "35px",
    borderBottomLeftRadius: "35px",
    transitionEnd: {
      flexDirection: "row-reverse",
    },
    transition: transitions.MenuCard.contracted,
  },
}

const MenuCard = styled(motion.div).attrs(() => ({
  variants: MenuCardVariants,
}))`
  width: 100%;
  background-color: ${p => p.theme.palette.darkBackground};
  border-radius: 16px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const MenuMiddleVariants = {
  expanded: {
    height: [null, 150, 201, 253],
    width: 288,
    paddingTop: 6,
    marginLeft: "8px",
    alignItems: "inherit",
    transition: transitions.MenuMiddle.expanded,
  },
  contracted: {
    height: [null, 170, 115, 75],
    marginLeft: "7px",
    width: 86,
    paddingTop: 6,
    transition: transitions.MenuMiddle.contracted,
  },
}

const MenuMiddle = styled(motion.div).attrs(() => ({
  variants: MenuMiddleVariants,
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: "100%";
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`

const MenuMiddleColumnVariants = {
  expanded: {
    opacity: [null, 0, 0.2, 0.6, 0.9, 1],
    width: [null, "0%", "25%", "50%", "75%", "100%"],
    display: "flex",
    height: "100%",
    transition: transitions.MenuMiddleColumn.expanded,
  },
  contracted: {
    opacity: [null, 1, 0.9, 0.6, 0.2, 0],
    width: [null, "100%", "60%", "40%", "15%", "0%"],
    display: "flex",
    height: "0%",
    transition: transitions.MenuMiddleColumn.contracted,
    transitionEnd: {
      display: "none",
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
    borderRadius: "1px",
    border: "0px",
    backgroundColor: theme.palette.darkBackground, //"rgba(0,0,0,1)",
    transition: transitions.PortraitPhotoBox.expanded,
  },
  contracted: {
    height: "60px",
    borderRadius: "50%",
    border: "1px solid white",
    backgroundColor: "rgba(255,255,255,1)",
    transition: transitions.PortraitPhotoBox.contracted,
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

const PortraitPhotoVariants = {
  expanded: {
    width: "120px",
    height: "230px",
    borderRadius: "0px",
    transition: transitions.PortraitPhoto.expanded,
  },
  contracted: {
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    transition: transitions.PortraitPhoto.contracted,
  },
}

const PortraitPhoto = styled(motion.img).attrs(() => ({
  variants: PortraitPhotoVariants,
}))<{ currentAnimate: string }>`
  mask-image: linear-gradient(
    to bottom,
    ${p => p.theme.palette.darkBackground} 90%,
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
    paddingTop: 4,
    opacity: 1,
    transition: transitions.TextContainers.expanded,
  },
  contracted: {
    lineHeight: "0px",
    paddingTop: 0,
    opacity: 0,
    transition: transitions.TextContainers.contracted,
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
  margin-bottom: 8px;
  font-size: 28px;
  overflow: visible;
  color: white;
`

const DescH2 = motion.custom(LayoutComponents.h2compact)

const MenuPositionContainer = styled(motion.div).attrs(() => ({
  variants: {
    expanded: {
      justifyContent: "flex-start",
      transition: transitions.MenuPositionContainer.expanded,
    },
    contracted: {
      justifyContent: "flex-end",
      transition: transitions.MenuPositionContainer.contracted,
    },
  },
}))`
  display: flex;
  width: 304px;
`

const MenuContainerVariants = {
  expanded: {
    opacity: [null, 0, 0, 0, 0, 1],
    height: [75, 75, 0, 0, 50, 50],
    width: [304, 304, 0, 0, 304, 304],
    transition: transitions.MenuContainer.expanded,
  },
  contracted: {
    opacity: [1, 0, 0, 0, 0, 1],
    height: [50, 50, 0, 0, 75, 75],
    transition: transitions.MenuContainer.contracted,
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
  color: ${p => (p.$isCurrent ? p.theme.palette.highlightText : "white")};
  margin: auto 8px auto 8px;
  padding: 8px 16px;
  height: 20px;
`

const HomeNavLink = styled(TransitionLink)``

export const HeaderSlashCard = ({
  data,
  location,
  windowWidth,
  windowHeight,
}: {
  data: any
  location: Location
  windowWidth: number
  windowHeight: number
}) => {
  const [currentPath, setCurrentPath] = useState<string>(location.pathname)
  const [lastPath, setLastPath] = useState<string>(currentPath)

  function getMenuAnimate(currentPath) {
    return currentPath === "/" ? "expanded" : "contracted"
  }

  const animate = useMemo(() => getMenuAnimate(currentPath), [currentPath])

  function getMenuInitial(currentPath, lastPath) {
    return currentPath == lastPath
      ? false
      : lastPath === "/"
      ? "expanded"
      : "contracted"
  }

  const initial = useMemo(() => getMenuInitial(currentPath, lastPath), [
    currentPath,
    lastPath,
  ])

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
    if (currentPath === "/") {
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

  useEffect(() => {
    setLastPath(currentPath)
    setCurrentPath(location.pathname)
  }, [location.pathname])

  // useEffect(() => {
  //   if (windowWidth) {
  //     console.log("setting width ", windowWidth, ", prev width ", width)
  //     setWidth(windowWidth)
  //   }
  // }, [windowWidth])

  return (
    <>
      {windowWidth && (
        <MenuCardContainer
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          animate={animate}
          initial={initial}
          layout
        >
          <MenuCard>
            <MenuContainer>
              <MenuPositionContainer>
                <AnimatePresence>
                  {data.allMdx.edges.map((edge, index) => {
                    let {
                      node: {
                        frontmatter: { title, path },
                      },
                    } = edge

                    if (path === null || path === "") {
                      path = "/"
                    } else {
                      path = `/${path}`
                      return (
                        <TopNavLink
                          to={`${path}`}
                          key={index}
                          $isCurrent={currentPath === path ? true : undefined}
                          entry={{
                            delay: TRANSITION_DURATION * 0.75,
                            length: TRANSITION_DURATION * 0.25,
                            state: {
                              initial: getNextInitial(path),
                              animate: getNextAnimate(path),
                            },
                          }}
                          exit={{
                            length: TRANSITION_DURATION,
                            state: {
                              initial: getCurrentInitial(),
                              animate: getExitAnimate(path),
                            },
                          }}
                        >
                          {title}
                        </TopNavLink>
                      )
                    }
                    // }
                  })}
                </AnimatePresence>
                <TopNavLink
                  to={`/blog`}
                  $isCurrent={
                    currentPath.indexOf(`/blog`) !== -1 ? true : undefined
                  }
                  entry={{
                    length: TRANSITION_DURATION * 0.5,
                    state: {
                      initial: getNextAnimate("/blog"),
                    },
                  }}
                  exit={{
                    length: TRANSITION_DURATION * 0.5,
                    state: {
                      initial: getCurrentInitial(),
                      animate: getExitAnimate("/blog"),
                    },
                  }}
                >
                  Blog
                </TopNavLink>
              </MenuPositionContainer>
            </MenuContainer>
            <MenuMiddle>
              <MenuMiddleColumn>
                <NameContainer>
                  <Name>Tim L. Fitzgerald</Name>
                </NameContainer>
                <DescriptionContainer>
                  <DescH2
                    initial={initial || getCurrentInitial()}
                    variants={getTextContainerVariants(16)}
                  >
                    programmer
                  </DescH2>
                  <DescH2
                    initial={initial || getCurrentInitial()}
                    variants={getTextContainerVariants(16)}
                  >
                    sysadmin
                  </DescH2>
                  <DescH2
                    initial={initial || getCurrentInitial()}
                    variants={getTextContainerVariants(16)}
                  >
                    systems engineer
                  </DescH2>
                  <DescH2
                    initial={initial || getCurrentInitial()}
                    variants={getTextContainerVariants(16)}
                  >
                    useful human
                  </DescH2>
                </DescriptionContainer>
              </MenuMiddleColumn>
              <HomeNavLink
                to={"/"}
                key={"indexlink"}
                disabled={currentPath === "/" ? true : false}
                $isCurrent={false}
                entry={{
                  length: TRANSITION_DURATION,
                  state: {
                    initial: getNextInitial("/"),
                    animate: getNextAnimate("/"),
                  },
                }}
                exit={{
                  length: TRANSITION_DURATION,
                  state: {
                    initial: getCurrentInitial(),
                    animate: getExitAnimate("/"),
                  },
                }}
              >
                <PortraitPhotoBox>
                  <PortraitPhoto
                    currentAnimate={animate}
                    src="/assets/media/tim-photo-cutout-bw.png"
                  />
                </PortraitPhotoBox>
              </HomeNavLink>
            </MenuMiddle>
          </MenuCard>
        </MenuCardContainer>
      )}
    </>
  )
}
