import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../styles/animations";
import { Link } from "../utils/Link";
import { Box, Grid, Typography, Hidden, Tooltip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Children } from "../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoBar: {
      marginTop: "2vh",
      height: "5vh",
      position: "relative",
      width: "98vw",
    },
    logo: {
      marginTop: "2vh",
      height: "4.5vh",
      display: "block",
      position: "fixed",
      opacity: 0,
      animation: `$no-transform 2s 1s cubic-bezier(0, .5, 0, 1) forwards`,
    },
    topBar: {
      height: "6.5vh",
      color: "rgba(255, 255, 255, .87)",
      maxWidth: "100vw",
      marginTop: "0vh",
      padding: "0 1.5%",
      textTransform: "uppercase",
    },
    title: {
      fontSize: "2em",
      zIndex: 10,
      marginTop: "1vh",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2em",
      },
    },
    subtitle: {
      fontSize: "1.2em",
      [theme.breakpoints.down("sm")]: {
        fontSize: ".6em",
      },
    },
    logoContainer: {
      position: "fixed",
      height: "5vh",
      top: "1vh",
      left: "auto",
      right: "1.5%",
      opacity: 0.87,
      // zIndex: -1,
    },
    iconButton: {
      zIndex: 10,
      marginTop: "1.5vh",
      marginRight: "1vh",
      height: "4vh",
      width: "4vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "solid 1.4px rgba(255, 255, 255, .87)",
      borderRadius: "50px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.vh",
        marginRight: "1vh",
        height: "3vh",
        width: "3vh",
        borderWidth: "1px",
      },
    },
    icon: {
      fontSize: theme.fontSizes.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.tertiary,
      },
    },
    logoSecondary: {
      opacity: 0,
      animation: `$no-transform 2s 1s cubic-bezier(0, .5, 0, 1) forwards`,
      marginRight: ".5%",
      marginLeft: ".5%",
      marginTop: ".5vh",
      marginBottom: 0,
      height: "4vh",
      display: "block",
    },
    ...animations,
  })
);

interface Props {
  children?: Children;
  logos?: boolean;
}

interface TitleProps {
  title: string;
  subtitle?: string;
}

export const TitleBar = ({ title, subtitle }: TitleProps) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      container
      // justify="center"
      alignItems="flex-start"
      className={classes.topBar}
    >
      <Typography color="inherit" className={classes.title}>
        {title}
      </Typography>
      {/* <Typography color="inherit" className={classes.headerSubtitle}>
                    {subtitle}
                </Typography> */}
      {/* <Grid item container justify="flex-end" className={classes.logoContainer}>
        <Img alt="logo" src={logoPrimary} className={classes.logoPrimary} />
      </Grid> */}
    </Grid>
  );
};

interface TitleLogoProps {
  init?: boolean;
  play?: boolean;
  appId: string;
  title: string;
  titleShort?: string;
  subtitle?: string;
  subtitleShort?: string;
  backIcon?: boolean;
}

export const TitleLogoBar = ({
  init = true,
  play = true,
  appId,
  title,
  titleShort,
  subtitle,
  subtitleShort,
  backIcon = false,
}: TitleLogoProps) => {
  const classes = useStyles();

  // TODO:
  // const logos = {
  //   "solar-system": "",
  //   "need-for-speed": "",
  //   default: "",
  // };

  if (!titleShort) {
    titleShort = title;
  }

  return (
    <Grid
      item
      xs={12}
      container
      // justify="center"
      alignItems="flex-start"
      className={classes.topBar}
    >
      <Grid item container alignItems="center" xs={12} sm={8}>
        {backIcon && (
          <Link to="/">
            <Tooltip title="Back to main screen" arrow>
              <Box className={classes.iconButton}>
                <ArrowBackIcon className={classes.icon} />
              </Box>
            </Tooltip>
          </Link>
        )}
        <Hidden smDown>
          <Typography color="inherit" className={classes.title}>
            {title}
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography color="inherit" className={classes.title}>
            {titleShort}
          </Typography>
        </Hidden>
      </Grid>

      <Grid item xs={12}>
        <Hidden smDown>
          <Typography color="inherit" className={classes.subtitle}>
            {subtitle}
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography color="inherit" className={classes.subtitle}>
            {subtitleShort}
          </Typography>
        </Hidden>
      </Grid>

      {/* TODO: Logo is now fixed, change to normal grid behavior  */}
      <Grid
        item
        container
        xs={4}
        justify="flex-end"
        className={classes.logoContainer}
      >
        {/* TODO: */}
        {/* <Hidden smDown>
          {appId !== "DEFAULT" && (
            <Img
              alt={`${appId}-logo`}
              src={logos[appId]}  // TODO:
              className={`${classes.logoSecondary} ${
                init ? classes.pauseAnim : undefined
              }`}
            />
          )}
        </Hidden> */}

        {/* <Img
              alt="logo-default"
              src={logoDefault}
              className={classes.logoMain}
              style={style}
            /> */}
      </Grid>
    </Grid>
  );
};
