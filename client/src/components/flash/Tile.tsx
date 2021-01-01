import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography, Tooltip } from "@material-ui/core";
import { Value } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      textAlign: "center",
      borderRadius: "2px 2px 0 0",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: theme.fontSizes.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.tertiary,
      },
    },
    value: {
      fontWeight: "bold",
      fontSize: theme.fontSizes.primary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.secondary,
      },
    },
    delta: {
      fontWeight: "bold",
      fontSize: theme.fontSizes.tertiary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.quaternary,
      },
    },
    deltaPos: {
      color: theme.palette.success.main,
    },
    deltaNeg: {
      color: theme.palette.error.main,
    },
  })
);

interface Props {
  name: string;
  data?: Value;
}

export const Tile = ({ name, data }: Props) => {
  const classes = useStyles();

  return (
    <Tooltip title={data?.tooltip ? data.tooltip : name} arrow interactive>
      <Box className={classes.container}>
        <Typography color="primary" noWrap className={classes.title}>
          {name?.toUpperCase()}
        </Typography>

        <Typography color="primary" noWrap className={classes.value}>
          {data?.primary
            ? data?.primaryFormatted
              ? data.primaryFormatted
              : data.primary
            : ""}
        </Typography>

        <Typography
          color="primary"
          noWrap
          className={`${classes.delta} 
            ${
              data?.primaryIsBad
                ? classes.deltaNeg
                : data?.primaryIsGood
                ? classes.deltaPos
                : undefined
            }`}
        >
          {data?.primaryDeltaFormatted
            ? data.primaryDeltaFormatted
            : data?.primaryDelta || ""}
        </Typography>
      </Box>
    </Tooltip>
  );
};
