import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, IconButton, Typography, Tooltip } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "rgba(255, 255, 255, .6)",
      "&:hover": {
        color: "rgba(255, 255, 255, .87)",
      },
    },
    playIcon: {
      // border: "solid 2px rgba(226, 226, 226)",
      borderRadius: "100px",
      height: 36,
      width: 36,
      "&$play": {
        color: "#000",
        backgroundColor: "rgba(226, 226, 226)",
        marginLeft: "1em",
        marginRight: "1em",
        "&:hover": {
          backgroundColor: "#FFF",
          color: theme.palette.secondary.main,
        },
      },
    },
    play: {},
    duration: {
      display: "flex",
      alignItems: "center",
    },
  })
);

interface Props {
  play: boolean;
  setPlay: any;
  index: number;
  length: number;
  setIndex: any;
}

export const PlayerButtons = ({
  play,
  setPlay,
  index,
  length,
  setIndex,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      {/* Play button */}
      <Tooltip
        title={play ? "Pause slideshow" : "Play slideshow"}
        aria-label={play ? "pause slideshow" : "play slideshow"}
        arrow
      >
        <IconButton
          color="inherit"
          aria-label="play/pause"
          onClick={() => (play ? setPlay(false) : setPlay(true))}
          className={`${classes.playIcon} ${classes.play}`}
        >
          {play ? (
            <PauseIcon fontSize="small" />
          ) : (
            <PlayArrowIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      {/* Previous, next, slide number */}
      <Box className={classes.duration}>
        <Tooltip title="Previous slide" aria-label="previous slide" arrow>
          <IconButton
            color="inherit"
            aria-label="previous"
            onClick={() =>
              setIndex(index > 0 ? index - 1 : length - 1)
            }
            className={classes.icon}
          >
            <SkipPreviousIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={`Slide ${index + 1} out of ${length}`}
          aria-label="slide number"
          arrow
        >
          <Typography variant="body2" style={{ margin: "0 1em" }}>
            {index + 1} / {length}
          </Typography>
        </Tooltip>

        <Tooltip title="Next slide" aria-label="next slide" arrow>
          <IconButton
            color="inherit"
            aria-label="next"
            onClick={() =>
              setIndex((index < length - 1 ? index + 1 : 0))
            }
            className={classes.icon}
          >
            <SkipNextIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
