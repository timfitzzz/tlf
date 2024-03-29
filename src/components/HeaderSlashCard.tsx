// UI Libraries
import React, { useEffect, useMemo, useState } from "react"
import { Flex } from "rebass"
import styled from "styled-components"
import { Location } from "history"
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion"

// social SVGs
import InstagramIcon from "../../static/assets/media/instagram.svg"
import LinkedInIcon from "../../static/assets/media/linkedin.svg"
import GithubIcon from "../../static/assets/media/github.svg"
import TwitterIcon from "../../static/assets/media/twitter.svg"
import EmailIcon from "../../static/assets/media/email.svg"

// Gatsby Lifecycle
import TransitionLink from "gatsby-plugin-transition-link"

// UI
import { LayoutComponents, theme } from "Theme"
import { TRANSITION_DURATION, MIN_WIDTH } from "Theme"

const transitions = {
  MenuCardFadeContainer: {
    fadedOut: {
      duration: 0.5,
    },
    fadedIn: {
      duration: 0.5,
    },
  },
  MenuCardContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.1,
      duration: TRANSITION_DURATION * 0.6,
      ease: "easeIn",
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.3,
      duration: TRANSITION_DURATION * 0.4,
      ease: "easeOut",
    },
  },
  MenuCard: {
    expanded: {
      delay: TRANSITION_DURATION * 0.6,
      duration: TRANSITION_DURATION * 0.3,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.2,
      duration: TRANSITION_DURATION * 0.5,
      times: [0, 0.2, 1],
    },
  },
  MenuMiddle: {
    expanded: {
      delay: TRANSITION_DURATION * 0.3,
      duration: TRANSITION_DURATION * 0.3,
      ease: "easeIn",
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.4,
      duration: TRANSITION_DURATION * 0.3,
      ease: "easeOut",
    },
  },
  MenuMiddleColumn: {
    expanded: {
      delay: TRANSITION_DURATION * 0.3,
      duration: TRANSITION_DURATION * 0.3,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.3,
      duration: TRANSITION_DURATION * 0.5,
    },
  },
  PortraitPhotoColumn: {
    expanded: {
      delay: TRANSITION_DURATION * 0.3,
      duration: TRANSITION_DURATION * 0.3,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.25,
      duration: TRANSITION_DURATION * 0.5,
      times: [0, 0.1, 1],
    },
  },
  TextContainers: {
    expanded: {
      delay: TRANSITION_DURATION * 0.8,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: 0,
    },
  },
  TopNavNameContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0,
      duration: TRANSITION_DURATION * 0.3,
      times: [0, 0.1, 1],
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.3,
      delay: TRANSITION_DURATION * 0.5,
      times: [0, 0.9, 1],
    },
  },
  SocialIconsContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.9,
      duration: TRANSITION_DURATION * 0.1,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: 0,
    },
  },
  PortraitPhotoBox: {
    expanded: {
      delay: TRANSITION_DURATION * 0.8,
      duration: TRANSITION_DURATION * 0.2,
      times: [0, 0.2, 1],
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: TRANSITION_DURATION * 0.0,
    },
  },
  PortraitPhoto: {
    expanded: {
      delay: TRANSITION_DURATION * 0.8,
      duration: TRANSITION_DURATION * 0.2,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
      delay: TRANSITION_DURATION * 0.0,
    },
  },
  MenuContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.0,
      duration: TRANSITION_DURATION * 1,
      times: [0, 0.1, 0.3, 0.7, 0.9, 1],
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.0,
      duration: TRANSITION_DURATION,
      times: [0, 0.1, 0.4, 0.7, 0.9, 0.95, 1],
    },
  },
  MenuPositionContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0.5,
      duration: TRANSITION_DURATION * 0.1,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.7,
      duration: TRANSITION_DURATION * 0.1,
    },
  },
}

const getMenuCardContainerVariants = (
  windowWidth: number,
  windowHeight: number
): {
  expanded: TargetAndTransition
  contracted: TargetAndTransition
  fadeIn: { opacity: [number, number] }
} => {
  let variants = {
    expanded: {
      width: windowWidth ? [null, MIN_WIDTH] : MIN_WIDTH,

      marginTop: windowHeight
        ? [null, (windowHeight - 520) / 2 + "px"]
        : "auto",

      transition: transitions.MenuCardContainer.expanded,
    },
    contracted: {
      width: windowWidth ? [null, windowWidth - 16] : "100%",
      marginTop: "8px",
      transition: transitions.MenuCardContainer.contracted,
    },
    fadeIn: {
      opacity: [0, 1],
    },
  }

  return variants as {
    expanded: TargetAndTransition
    contracted: TargetAndTransition
    fadeIn: { opacity: [number, number] }
  }
}

const MenuCardFadeContainer = styled(motion.div).attrs(() => ({
  variants: {
    fadedIn: {
      opacity: 0,
      transition: transitions.MenuCardFadeContainer.fadedIn,
    },
    fadedOut: {
      opacity: 1,
      transition: transitions.MenuCardFadeContainer.fadedOut,
    },
  },
}))``

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
    height: [null, "75px", "75px"],
    borderTopLeftRadius: [null, "35px", "35px"],
    borderBottomLeftRadius: [null, "35px", "35px"],
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
  background-color: ${(p) => p.theme.palette.darkBackground};
  border-radius: 16px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const MenuMiddleVariants = {
  expanded: {
    height: [null, 150, 201, 253],
    width: 288,
    marginLeft: "8px",
    alignItems: "inherit",
    justifyContent: "end",
    transition: transitions.MenuMiddle.expanded,
  },
  contracted: {
    height: [null, 170, 115, 75],
    marginLeft: "7px",
    width: 200,
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
  margin-top: 0;
  margin-bottom: auto;
  z-index: 10;
`

const MenuMiddleColumnVariants = {
  expanded: {
    opacity: [null, 0, 0.2, 0.6, 0.9, 1],
    width: [null, 0, 20, 40, 50, 165],
    height: "100%",
    transition: transitions.MenuMiddleColumn.expanded,
    display: "flex",
  },
  contracted: {
    width: [null, 0],
    height: [null, "0%"],
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
  background-color: transparent;
`

const PortraitPhotoColumn = styled(motion.div).attrs(() => ({
  variants: {
    expanded: {
      width: 144,
      marginTop: 8,
      transition: transitions.PortraitPhotoColumn.expanded,
    },
    contracted: {
      width: 62,
      marginTop: [null, 6, 6, 6],
      transition: transitions.PortraitPhotoColumn.contracted,
    },
  },
}))``

const PortraitPhotoBoxVariants = {
  expanded: {
    height: 231,
    width: 120,
    borderRadius: "1px",
    border: "0px",
    paddingLeft: 16,
    backgroundColor: [
      null,
      theme.palette.darkBackground,
      theme.palette.darkBackground,
    ],
    marginLeft: [null, -36],
    marginTop: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      -10,
      -20,
      -30,
      -35,
      -40,
      -45,
      -50,
    ],
    position: "absolute",
    transition: transitions.PortraitPhotoBox.expanded,
  },
  contracted: {
    height: "60px",
    width: 60,
    borderRadius: "50%",
    border: "1px solid white",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: [null, 0],
    marginTop: [null, -25, 0, 0, 0, 0, 0],
    transition: transitions.PortraitPhotoBox.contracted,
    paddingLeft: [null, null, null, 0],
    position: "relative",
  },
}

const PortraitPhotoBox = styled(motion.div).attrs(() => ({
  variants: PortraitPhotoBoxVariants,
}))`
  overflow: visible;
  align-content: center;
  text-align: center;
  margin-bottom: 0;
  margin-right: auto;
  margin-left: auto;
`

const PortraitPhotoVariants = {
  expanded: {
    width: "170px",
    height: "272px",
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
    ${(p) => p.theme.palette.darkBackground} 90%,
    rgba(0, 0, 0, 0)
  );
  object-fit: cover;
  object-position: top;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
`

const DescriptionContainer = styled.div`
  margin-top: 76px;
  margin-left: 16px;
  margin-right: auto;
  margin-bottom: 8px;
  position: absolute;
  color: white;
  z-index: 10;
  background-color: transparent;
  overflow: visible;
`

const getTextContainerVariants = (lineHeight: number) => ({
  expanded: {
    lineHeight: `${lineHeight}px`,
    opacity: 1,
    transition: transitions.TextContainers.expanded,
  },
  contracted: {
    lineHeight: "0px",
    opacity: 0,
    transition: transitions.TextContainers.contracted,
  },
})

const NameContainer = styled(motion.div).attrs(() => ({
  variants: getTextContainerVariants(28),
}))`
  margin-left: 16px;
  margin-right: auto;
  z-index: 10;
`

const Name = styled.h1`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 28px;
  overflow: visible;
  color: white;
  z-index: 20;
`

const TopNavNameContainer = styled(motion.div).attrs(
  (p: { windowWidth: number }) => ({
    variants: {
      expanded: {
        paddingTop: 0,
        opacity: [null, 0, 0],
        transition: transitions.TopNavNameContainer.expanded,
        width: 0,
      },
      contracted: {
        paddingTop: 0,
        opacity: [null, 0, 1],
        transition: transitions.TopNavNameContainer.contracted,
        width: 120,
      },
    },
    windowWidth: p.windowWidth,
  })
)`
  ${(p) =>
    p.windowWidth && p.windowWidth < 360
      ? `
      width: 0px!important;
    `
      : `
    `}
  margin-left: 16px;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
`

const TopNavName = styled.div<{ windowWidth: number }>`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 16px;
  overflow: visible;
  color: white;

  ${(p) =>
    p.windowWidth && p.windowWidth < 440
      ? `
    display: none;
  `
      : `
    display: inherit;
  `}
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

// times: [0, 0.1, 0.4, 0.7, 0.9, 0.95, 1],
const MenuContainerVariants = {
  expanded: {
    opacity: [null, 0, 0, 0, 0, 1],
    height: [75, 75, 0, 0, 0, 50],
    width: [304, 304, 0, 0, 0, 304],
    transition: transitions.MenuContainer.expanded,
    marginTop: 6,
  },
  contracted: {
    opacity: [null, 0, 0, 0, 0, 1, 1],
    height: [null, 0, 0, 0, 75, 75, 75],
    transition: transitions.MenuContainer.contracted,
    marginTop: [null, 4, 2, 0, 0, 0, 0],
  },
}

const MenuContainer = styled(motion.custom(Flex)).attrs(() => ({
  variants: MenuContainerVariants,
}))`
  flex-direction: row;
  max-width: 500px;
`

const SocialIconsContainer = styled(motion.div).attrs(() => ({
  variants: {
    expanded: {
      height: "auto",
      transition: transitions.SocialIconsContainer.expanded,
    },
    contracted: {
      height: "0px",
      transition: transitions.SocialIconsContainer.contracted,
    },
  },
}))`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  margin-bottom: 16px;
  margin-left: 12px;
  width: 125px;
  justify-content: space-around;
  overflow: hidden;

  svg {
    fill: white;
    width: 16px;
    &:hover {
      fill: ${(p) => p.theme.palette.highlightText};
    }
  }
`

interface TopNavLinkProps {
  readonly iscurrent: boolean
}

const TopNavLink = styled(TransitionLink)<TopNavLinkProps>`
  text-decoration: none;
  color: ${(p) => (p.$isCurrent ? p.theme.palette.highlightText : "white")};
  margin: auto 8px auto 8px;
  padding: 8px 16px;
  height: 20px;

  &:hover {
    color: ${(p) => p.theme.palette.highlightText};
  }
`

const HomeNavLink = styled(TransitionLink)``

export const HeaderSlashCard = ({
  headerImageUrl,
  data,
  location,
  windowWidth,
  windowHeight,
}: {
  headerImageUrl: string
  data: any
  location: Location
  windowWidth: number
  windowHeight: number
}) => {
  const [currentPath, setCurrentPath] = useState<string>(location.pathname)
  const [initialLoad, setInitialLoad] = useState<boolean>(true)
  const [lastPath, setLastPath] = useState<string>(currentPath)

  function getMenuAnimate(currentPath) {
    return currentPath === "/" ? "expanded" : "contracted"
  }

  const animate = useMemo(() => getMenuAnimate(currentPath), [currentPath])
  const animateOpacity = initialLoad ? "fadedOut" : false
  const initialOpacity = initialLoad ? "fadedIn" : "fadedOut"

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
    if (lastPath !== currentPath) {
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    setLastPath(currentPath)
    setCurrentPath(location.pathname)
  }, [location.pathname])

  return (
    <AnimatePresence>
      <MenuCardFadeContainer initial={initialOpacity} animate={animateOpacity}>
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
                              delay:
                                currentPath === "/" ||
                                path === "/" ||
                                path === ""
                                  ? TRANSITION_DURATION * 0.9
                                  : TRANSITION_DURATION * 0.25,
                              length: TRANSITION_DURATION * 0.1,
                              state: {
                                initial: getNextInitial(path),
                                animate: getNextAnimate(path),
                              },
                            }}
                            exit={{
                              length:
                                currentPath === "/"
                                  ? TRANSITION_DURATION * 0.1
                                  : TRANSITION_DURATION * 0.1,
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
                    to={`/io`}
                    $isCurrent={
                      currentPath.indexOf(`/io`) !== -1 ? true : undefined
                    }
                    entry={{
                      delay:
                        currentPath === "/"
                          ? TRANSITION_DURATION * 0.75
                          : TRANSITION_DURATION * 0.1,
                      length: TRANSITION_DURATION * 0.2,
                      state: {
                        initial: getNextInitial("/io"),
                        animate: getNextAnimate("/io"),
                      },
                    }}
                    exit={{
                      length:
                        currentPath === "/"
                          ? TRANSITION_DURATION
                          : TRANSITION_DURATION * 0.1,
                      state: {
                        initial: getCurrentInitial(),
                        animate: getExitAnimate("/io"),
                      },
                    }}
                  >
                    I/O
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
                      systems engineer
                    </DescH2>
                    <DescH2
                      initial={initial || getCurrentInitial()}
                      variants={getTextContainerVariants(16)}
                    >
                      software engineer
                    </DescH2>
                    <DescH2
                      initial={initial || getCurrentInitial()}
                      variants={getTextContainerVariants(16)}
                    >
                      useful human
                    </DescH2>
                  </DescriptionContainer>
                  <SocialIconsContainer>
                    <a
                      href={"https://github.com/timfitzzz"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <GithubIcon />
                    </a>
                    <a
                      href={"https://twitter.com/timfitzzz"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <TwitterIcon />
                    </a>
                    <a
                      href={"https://instagram.com/diceytroop"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href={"https://linkedin.com/in/timlfitzgerald"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <LinkedInIcon />
                    </a>
                    <a
                      href={"mailto:timothyliamfitzgerald@gmail.com"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <EmailIcon />
                    </a>
                  </SocialIconsContainer>
                </MenuMiddleColumn>
                <PortraitPhotoColumn>
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
                      length: TRANSITION_DURATION * 0.5,
                      state: {
                        initial: getCurrentInitial(),
                        animate: getExitAnimate("/"),
                      },
                    }}
                  >
                    <PortraitPhotoBox>
                      <PortraitPhoto
                        currentAnimate={animate}
                        src={headerImageUrl}
                      />
                    </PortraitPhotoBox>
                  </HomeNavLink>
                </PortraitPhotoColumn>
                <AnimatePresence>
                  {animate === "contracted" && (
                    <TopNavNameContainer windowWidth={windowWidth}>
                      <TopNavName windowWidth={windowWidth}>
                        Tim L. Fitzgerald
                      </TopNavName>
                    </TopNavNameContainer>
                  )}
                </AnimatePresence>
              </MenuMiddle>
            </MenuCard>
          </MenuCardContainer>
        )}
      </MenuCardFadeContainer>
    </AnimatePresence>
  )
}
