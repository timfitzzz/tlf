// UI Libraries
import React from "react"
import { Flex } from "rebass"
import styled from "styled-components"
import { Location } from "history"
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion"

// Gatsby Lifecycle
import TransitionLink from "gatsby-plugin-transition-link"

// UI
import { LayoutComponents } from "Theme"
import { TRANSITION_DURATION, MIN_WIDTH } from "Theme"

const transitions = {
  MenuCardContainer: {
    expanded: {
      delay: TRANSITION_DURATION * 0,
      duration: TRANSITION_DURATION * 0.2,
      // when: "beforeChildren",
      // staggerChildren: TRANSITION_DURATION / 20,
      // delayChildren: TRANSITION_DURATION * 0.8,
      // staggerDirection: 1,
      ease: "easeIn",
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.8,
      // when: "afterChildren",
      // staggerChildren: TRANSITION_DURATION / 20,
      ease: "easeOut",
    },
  },
  MenuCard: {
    expanded: {
      delay: TRANSITION_DURATION * 0.2,
      duration: TRANSITION_DURATION * 0.3,
    },
    contracted: {
      // duration: TRANSITION_DURATION * 0.8,
    },
  },
  MenuMiddle: {
    expanded: {
      // delay: TRANSITION_DURATION * 0.7,
      duration: TRANSITION_DURATION * 0.1,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.8,
      duration: TRANSITION_DURATION * 0.05,
    },
  },
  MenuMiddleColumn: {
    expanded: {
      // delay: TRANSITION_DURATION * 0.7,
      duration: TRANSITION_DURATION * 0.1,
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.8,
      duration: TRANSITION_DURATION * 0.05,
    },
  },
  TextContainers: {
    expanded: {
      // delay: TRANSITION_DURATION * 0.8,
      duration: TRANSITION_DURATION * 0.05,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.1,
    },
  },
  PortraitPhotoBox: {
    expanded: {
      // delay: TRANSITION_DURATION * 0.85,
      duration: TRANSITION_DURATION * 0.15,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
    },
  },
  PortraitPhoto: {
    expanded: {
      // delay: TRANSITION_DURATION * 0.85,
      duration: TRANSITION_DURATION * 0.15,
    },
    contracted: {
      duration: TRANSITION_DURATION * 0.2,
    },
  },
  MenuContainer: {
    expanded: {
      //delay: TRANSITION_DURATION * 0.4,
      duration: TRANSITION_DURATION * 0.6,
      // times: [
      //   0,
      //   TRANSITION_DURATION * 0.25,
      //   TRANSITION_DURATION * 0.5,
      //   TRANSITION_DURATION * 0.75,
      //   TRANSITION_DURATION,
      // ],
    },
    contracted: {
      delay: TRANSITION_DURATION * 0.4,
      duration: TRANSITION_DURATION * 0.6,
      // times: [
      //   0,
      //   TRANSITION_DURATION * 0.25,
      //   TRANSITION_DURATION * 0.5,
      //   TRANSITION_DURATION * 0.75,
      //   TRANSITION_DURATION,
      // ],
    },
  },
}

const getMenuCardContainerVariants = (
  windowWidth: number
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

      // marginTop: "auto",
      // marginBottom: "auto",
      transition: transitions.MenuCardContainer.expanded,
    },
    contracted: {
      width: windowWidth ? [null, windowWidth - 16] : "100%",
      // marginTop: "unset",
      // marginBottom: "unset",
      // flexDirection: "row-reverse",
      transition: transitions.MenuCardContainer.contracted,
    },
  }

  return variants
}

const MenuCardContainer = styled(motion.div).attrs(
  (p: { windowWidth: number }) => ({
    variants: getMenuCardContainerVariants(p.windowWidth),
  })
)<{ windowWidth: number }>`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const MenuCardVariants: {
  expanded: TargetAndTransition
  contracted: TargetAndTransition
} = {
  expanded: {
    height: "300px",
    transitionEnd: {
      flexDirection: "column",
    },
    transition: transitions.MenuCard.expanded,
  },
  contracted: {
    height: "75px",
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
  background-color: black;
  border-radius: 16px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const MenuMiddleVariants = {
  expanded: {
    height: [null, 253, 253, 253],
    width: 288,
    transition: transitions.MenuMiddle.expanded,
  },
  contracted: {
    height: [null, 62, 62, 62],
    marginLeft: "16px",
    width: 86,
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
    width: [null, "0%", "20%", "60%", "90%", "100%"],
    display: "flex",
    height: "100%",
    transition: transitions.MenuMiddleColumn.expanded,
  },
  contracted: {
    opacity: [null, 1, 0.9, 0.6, 0.2, 0],
    width: [null, "100%", "90%", "60%", "20%", "0%"],
    display: "none",
    height: "0%",
    transition: transitions.MenuMiddleColumn.contracted,
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
    backgroundColor: "rgba(0,0,0,1)",
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
    height: "250px",
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
    opacity: [null, 0, 0, 0, 1],
    height: [0, 0, 0, 75, 75],
    transition: transitions.MenuContainer.expanded,
  },
  contracted: {
    opacity: [0, 0, 0, 0, 1],
    height: 75,
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
  color: ${p => (p.$isCurrent ? "gold" : "white")};
  margin: auto 8px auto 8px;
  padding: 8px 16px;
  height: 20px;
`

const HomeNavLink = styled(TransitionLink)``

export const Menu = ({
  data,
  location,
  animate,
  initial,
  windowWidth,
}: {
  data: any
  location: Location
  animate: string
  initial: string
  windowWidth: number
}) => {
  let currentPath = location.pathname

  // const [width, setWidth] = useState<number>(windowWidth)

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
  // useEffect(() => {
  //   if (windowWidth) {
  //     console.log("setting width ", windowWidth, ", prev width ", width)
  //     setWidth(windowWidth)
  //   }
  // }, [windowWidth])

  return (
    <MenuCardContainer
      windowWidth={windowWidth}
      animate={animate}
      initial={initial || getCurrentInitial()}
      layout
    >
      <MenuCard layout>
        <MenuContainer>
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
                      appearAfter: TRANSITION_DURATION,
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
                    preventScrollJump
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
            $isCurrent={currentPath.indexOf(`/blog`) !== -1 ? true : undefined}
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
        </MenuContainer>
        <MenuMiddle>
          <MenuMiddleColumn>
            <NameContainer>
              <Name>Tim L. Fitzgerald</Name>
            </NameContainer>
            <DescriptionContainer>
              <DescH2
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                programmer
              </DescH2>
              <DescH2
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                sysadmin
              </DescH2>
              <DescH2
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
              >
                systems engineer
              </DescH2>
              <DescH2
                initial={initial || getCurrentInitial()}
                variants={getTextContainerVariants(20)}
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
              <PortraitPhoto src="/assets/media/tim-photo-cutout-bw.png" />
            </PortraitPhotoBox>
          </HomeNavLink>
        </MenuMiddle>
      </MenuCard>
    </MenuCardContainer>
  )
}
