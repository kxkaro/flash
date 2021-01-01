import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../../styles/animations";
import { Grid, Typography, Tooltip, Hidden } from "@material-ui/core";
import { Header } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      marginTop: "2vh",
      paddingLeft: ".5em",
      paddingRight: ".5em",
      color: "rgba(255, 255, 255, .6)",
      opacity: 0,
      transform: "translateY(2em)",
      animation: `$no-transform 2s 3s cubic-bezier(0, .5, 0, 1) forwards`,
    },
    cardHeaderTitle: {
      textTransform: "uppercase",
      fontSize: theme.fontSizes.secondary,
      fontWeight: "bold",
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.tertiary,
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: theme.fontSizes.quaternary,
      },
      marginTop: "1vh",
      marginBottom: "1vh",
      "&$underline": {
        position: "relative",
        color: "rgba(255, 255, 255, .87)",
        "&::after": {
          content: "''",
          position: "absolute",
          width: "2.5em",
          borderBottom: ".15em solid",
          borderBottomColor: theme.palette.secondary.main,
          left: 0,
          bottom: "-.1em",
          zIndex: 10,
        },
      },
    },
    underline: {},
    breadCrumbsContainer: {
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    breadCrumbsText: {
      fontSize: theme.fontSizes.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.tertiary,
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: theme.fontSizes.quaternary,
      },
      color: "white",
      marginRight: ".5em",
      "&$active": {
        opacity: 1,
      },
      "&$inactive": {
        opacity: 0.6,
        cursor: "pointer",
      },
      "&:hover": {
        opacity: 1,
      },
    },
    active: {},
    inactive: {},
    ...animations,
  })
);

interface Props {
  init?: boolean;
  current: Header;
  next: Header;
  play?: boolean;
  index: number;
  setIndex: any;
  seqLen: number;
  onBreadClick: any;
  sequences?: Array<string>;
  currentSequence: string;
}

export const NavTitles = ({
  init = true,
  current,
  next,
  play = true,
  index,
  setIndex,
  seqLen,
  onBreadClick,
  sequences,
  currentSequence,
}: Props) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      justify="space-between"
      xs={12}
      className={`${classes.cardHeader} ${
        init ? classes.pauseAnim : undefined
      }`}
    >
      <Grid
        item
        xs={12}
        sm={8}
        // md={4}
        className={`${classes.cardHeaderTitle} ${classes.underline}`}
      >
        <Typography
          color="inherit"
          component="span"
          className={classes.cardHeaderTitle}
          noWrap
        >
          {current.titlePrimary}
        </Typography>
        {current?.titleSecondary && (
          <>
            <Typography
              color="secondary"
              component="span"
              className={classes.cardHeaderTitle}
            >
              {" // "}
            </Typography>
            <Typography
              color="inherit"
              component="span"
              className={classes.cardHeaderTitle}
              noWrap
            >
              {current.titleSecondary}
            </Typography>
          </>
        )}
      </Grid>

      <Hidden only="xs">
        <Grid item xs={4} className={classes.breadCrumbsContainer}>
          {current?.titleSecondaryShort && (
            <Tooltip
              title={current.titleSecondary || current.titleSecondaryShort}
              placement="top"
              arrow
            >
              <Typography
                color="inherit"
                component="span"
                className={classes.breadCrumbsText}
              >
                {current.titleSecondaryShort}
              </Typography>
            </Tooltip>
          )}

          {sequences &&
            sequences.map((sequence, i) => (
              <Tooltip
                key={i}
                title={
                  sequence === currentSequence
                    ? sequence
                    : `Change to ${sequence}`
                }
                placement="top"
                arrow
              >
                <Typography
                  color="inherit"
                  component="span"
                  className={`${classes.breadCrumbsText} ${
                    sequence === currentSequence
                      ? classes.active
                      : classes.inactive
                  }`}
                  onClick={() => setIndex(i === 0 ? 0 : 6)} // TODO: Implement correct logic
                >
                  {sequence}
                </Typography>
              </Tooltip>
            ))}
        </Grid>
      </Hidden>
    </Grid>
  );
};
