import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../../styles/animations";
import { Grid, Typography, Box, Tooltip } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadCrumb: {
      textTransform: "uppercase",
      color: "rgba(255, 255, 255)",
      opacity: 0.5,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: ".5em",
      marginRight: ".5em",
      cursor: "pointer",
      "&$active": {
        color: theme.palette.text.secondary,
        fontWeight: "bold",
        opacity: 1,
      },
      "&$activeWhite": {
        color: "rgba(255, 255, 255, .87)",
        fontWeight: "bold",
        opacity: 1,
      },
      "&:hover": {
        color: "rgba(255, 255, 255, .87)",
        fontWeight: "bold",
        opacity: 1,
      },
    },
    active: {},
    activeWhite: {},
    breadCrumbText: {
      fontSize: theme.fontSizes.septonary,
      [theme.breakpoints.only("xs")]: {
        fontSize: theme.fontSizes.octonary,
      },
      lineHeight: "2vh",
      marginTop: ".5vh",
    },
    breadCrumbIcon: {
      fontSize: theme.fontSizes.primary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.secondary,
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: theme.fontSizes.tertiary,
      },
    },
    slideUp: {
      opacity: 0,
      animation: `$no-transform 2s 4s cubic-bezier(0, .5, 0, 1) forwards`,
    },
    ...animations,
  })
);

interface Props {
  appId: string;
  init: boolean;
  play?: boolean;
  index?: number;
  name?: string;
  color?: "textSecondary" | "white";
  onBreadClick?: any;
}
export const BreadCrumbs = ({
  appId,
  init = true,
  play = true,
  index,
  name,
  color = "textSecondary",
  onBreadClick,
}: Props) => {
  const classes = useStyles();

  const itemsSS = [
    {
      name: "Metrics",
      icon: <AssessmentIcon className={classes.breadCrumbIcon} />,
    },
    {
      name: "Planets",
      icon: <LanguageIcon className={classes.breadCrumbIcon} />,
    },
  ];
  const itemsNFS = [
    {
      name: "Metrics",
      icon: <AssessmentIcon className={classes.breadCrumbIcon} />,
    },
    {
      name: "Games",
      icon: <SportsEsportsIcon className={classes.breadCrumbIcon} />,
    },
  ];

  const items: Array<{ name: string; icon: any }> | undefined =
    appId === "solar-system"
      ? itemsSS
      : appId === "need-for-speed"
      ? itemsNFS
      : undefined;

  return (
    items && (
      <Grid
        container
        direction="row"
        justify="center"
        className={`${classes.slideUp} ${init ? classes.pauseAnim : undefined}`}
      >
        {items.map((item, i) => (
          <Tooltip
            key={`${item.name}-${i}`}
            title={`Switch to ${item.name}`}
            placement="top"
            arrow
          >
            <Box
              className={`${classes.breadCrumb} ${
                index === i &&
                (color === "white" ? classes.activeWhite : classes.active)
              }`}
              onClick={() => onBreadClick(i)}
            >
              {item.icon}
              <Typography
                color="inherit"
                noWrap
                className={classes.breadCrumbText}
              >
                {item.name}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Grid>
    )
  );
};
