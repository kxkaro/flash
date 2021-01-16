import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Grid, Slide, Hidden } from "@material-ui/core";
import { Slider } from "./Slider";
import { PlayerButtons } from "./PlayerButtons";
import { PlayerInput } from "./PlayerInput";
import { PlayerSettingsButton } from "./PlayerSettingsButton";
import { SettingsDialog } from "./SettingsDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 100,
      width: "100%",
      height: "8em",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(31, 31, 31, 0)",
      color: "rgba(255, 255, 255, .87)",
      background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .4) 20%, rgba(0, 0, 0, .95) 40%, rgba(0, 0, 0, 1) 100%)`,
      // border: "solid 1px rgba(0, 0, 0, .87)",
    },
    settingsButtonsContainer: {
      paddingRight: "2em",
      paddingLeft: "2em",
      [theme.breakpoints.down("sm")]: {
        paddingRight: "1em",
        paddingLeft: "1em",
      },
    },
  })
);

interface Props {
  appId: string;
  init: boolean;
  play: boolean;
  setPlay: any;
  index: number;
  length: number;
  setIndex: any;
  duration: number;
  setDuration: any;
  labels?: Array<string>;
  sequences: Array<string>;
  bgIndex?: number;
  setBgIndex: any;
}

export const Player = ({
  appId,
  init,
  play,
  setPlay,
  index,
  length,
  setIndex,
  duration,
  setDuration,
  labels,
  sequences,
  bgIndex,
  setBgIndex,
}: Props) => {
  const classes = useStyles();

  /* 
    Users can pin the player to be always shown
  */
  const [pin, setPin]: [boolean, any] = useState(false);

  /* 
    Show player for one second when mouse moves
  */
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show === true) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 1000);

      // Clean up hook
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [show]);

  const onMouseMove = () => {
    if (show !== true) {
      setShow(true);
    }
  };
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, false);

    // Clean up hook
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  /* 
    On player hover - always show player
  */
  const [hover, setHover] = useState(false);
  const onHover = (event: any) => {
    if (hover === false) {
      setHover(true);
    }
  };

  const onOut = (event: any) => {
    if (hover === true) {
      setHover(false);
    }
  };

  /* 
    Settings
  */
  const [openSettings, setOpenSettings] = useState(false);

  const handleSettingsOpen = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  return (
    <>
      <Box onMouseOver={onHover} onMouseOut={onOut}>
        <Slide in={!init ? false : pin || show || hover} direction="up">
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              container
              justify="center"
              alignItems="center"
            >
              {/* Play button, previous, n / length, next */}
              <PlayerButtons
                play={play}
                setPlay={setPlay}
                index={index}
                setIndex={setIndex}
                length={length}
              />

              {/* Slide duration - small version of the component for small screens */}
              <Hidden mdUp only="xs">
                <PlayerSettingsButton
                  pin={pin}
                  setPin={setPin}
                  handleSettingsOpen={handleSettingsOpen}
                />
              </Hidden>
            </Grid>

            {/* Slider (progress indicator) and slide duration - to be hidden on small screens */}
            <Hidden smDown>
              {/* Slider */}
              <Slider
                index={index}
                length={length}
                setIndex={setIndex}
                labels={labels || []}
                bgIndex={bgIndex}
                setBgIndex={setBgIndex}
                sequences={sequences}
              />

              {/* Slide duration for large screens */}
              <Grid
                item
                xs={4}
                md={3}
                container
                justify="space-around"
                alignItems="center"
                className={classes.settingsButtonsContainer}
              >
                {/* Slide duration component */}
                <Hidden mdDown>
                  <PlayerInput duration={duration} setDuration={setDuration} />
                </Hidden>

                {/* Pin and settings icons */}
                <PlayerSettingsButton
                  pin={pin}
                  setPin={setPin}
                  handleSettingsOpen={handleSettingsOpen}
                />
              </Grid>
            </Hidden>
          </Grid>
        </Slide>
      </Box>

      {/* Settings dialog window */}
      <SettingsDialog
        appId={appId}
        openSettings={openSettings}
        handleSettingsClose={handleSettingsClose}
        duration={duration}
        setDuration={setDuration}
        bgIndex={bgIndex}
        setBgIndex={setBgIndex}
      />
    </>
  );
};
