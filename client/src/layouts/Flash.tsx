import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../styles/animations";
import { Box } from "@material-ui/core";
import ThemeWrapper from "./ThemeWrapper";
import { SuspenseImg } from "../utils/SuspenseImg";
import { User, Mode, Children } from "../logic/types";
import { images } from "./images";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: "#000",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -100,
    },
    screen: {
      position: "fixed",
      height: "100vh",
      width: "100%",
      zIndex: -50,
      backgroundColor: "#000",
      transformStyle: "preserve-3d",
      overflow: "hidden",
      transform: "translateY(-4rem)",
      animation: `$no-transform 2s .5s cubic-bezier(0, .5, 0, 1) forwards`,
      border: "none",
      "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, .75), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .98) 90.5%, rgba(0, 0, 0, 1))",
      },
    },
    bgImg: {
      backgroundColor: "#000",
      objectFit: "cover",
      height: "100vh",
      width: "100%",
      color: "white",
    },
    blur: {
      filter: "blur(25px)",
      overflow: "hidden",
    },
    blurOff: {
      filter: "blur(25px)",
      animation: `$no-filter .15s linear forwards`,
      // animation: `$no-filter .15s cubic-bezier(0, 0, .2, 1) forwards`,
    },
    ...animations,
  })
);

interface Props {
  user: User;
  mode: Mode;
  setMode: any;
  appId: string;
  header?: any;
  footer?: any;
  bgIndex?: number;
  children?: Children;
}

// Use Theme nesting
const Flash = ({
  user,
  mode,
  setMode,
  appId,
  header,
  footer,
  bgIndex,
  children,
}: Props) => {
  const classes = useStyles(appId);
  interface Img {
    jpg: string;
    png: string;
    min: string;
  }
  // Pick an image if appId matches any of the defined image lists, else undefined
  let img: Img | undefined;
  if (bgIndex) {
    Object.entries(images).forEach(([key, imgArr]) => {
      if (key === appId) {
        img = imgArr[bgIndex];
      }
    });
  }

  return (
    <ThemeWrapper mode={mode} appId={appId}>
      <Box className={classes.bg}>
        {/* Background: picture and after effects */}
        {img && bgIndex ? (
          <Box className={classes.screen}>
            <SuspenseImg
              alt={`background-${appId}`}
              img={{
                img: img?.png || "",
                className: `${classes.bgImg} ${classes.blurOff}`,
              }}
              fallback={{
                img: img?.min || "",
                className: `${classes.bgImg} ${classes.blur}`,
              }}
            />
          </Box>
        ) : undefined}

        {/* Header */}
        {header}

        {/* Main content */}
        {children}

        {/* Footer needs to be outside of grid for the ticker to work correctly */}
        {footer}
      </Box>
    </ThemeWrapper>
  );
};

export default Flash;
