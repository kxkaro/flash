import React from "react";
import {
  Box,
  Grid,
  Typography,
  // Collapse,
  // Fade
} from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  i: number;
  category: string;
  filler: boolean;
  value?: number;
  valueFormatted?: string;
  delta?: number;
  deltaFormatted?: string;
  isDeltaGood?: boolean;
  isDeltaBad?: boolean;
  max: number;
  min: number;
  rankColor?: "primary" | "secondary";
  categorySize?: "sm" | "md";
}

// TODO: consider coloring bars in the chart either:
// - green for positive delta
// - change opacity based on the delta value
export const BarChartRowAbsDelta = ({
  i,
  category,
  filler,
  value,
  valueFormatted,
  delta,
  deltaFormatted,
  isDeltaGood,
  isDeltaBad,
  max,
  min,
  rankColor = "primary",
  categorySize = "md",
}: Props) => {
  const classes = useStyles();

  return value ? (
    <Grid
      id={`chart-row-${i}`}
      item
      container
      direction="row"
      className={`${classes.row} ${filler && classes.hide}`}
    >
      <Grid container item xs={6} justify="space-between">
        <Grid item container xs={7}>
          <Typography
            component="span"
            color="primary"
            noWrap
            className={`${classes.labels} ${
              categorySize === "sm" ? classes.categorySm : classes.category
            }`}
          >
            <Typography
              component="span"
              color="textSecondary"
              className={`${classes.labels} ${
                categorySize === "sm" ? classes.categorySm : classes.category
              } ${classes.rank}`}
            >{`#${i + 1} `}</Typography>
            {category}
          </Typography>
        </Grid>

        <Grid item container justify="flex-start" xs={5}>
          <Typography
            color="primary"
            noWrap
            className={`${classes.labels} ${classes.label}`}
          >
            {valueFormatted ? valueFormatted : value}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        xs={4}
        className={`${classes.barContainer} ${classes.padding}`}
      >
        {/* For negative bars */}
        {min < 0 && (
          <Box
            width={`${
              (Math.abs(min) / (Math.abs(min) + (max > 0 ? max : 0))) * 100
            }%`}
            className={classes.barContainer}
          >
            <Box
              width={`${((value < 0 ? value : min) / min) * 100}%`}
              className={`${classes.bar} ${
                value < 0 ? classes.neutralSecondary : undefined
              } ${classes.right}`}
            />
          </Box>
        )}

        {/* For positive bars */}
        {max > 0 && (
          <Box
            width={`${(max / ((min < 0 ? Math.abs(min) : 0) + max)) * 100}%`}
            className={classes.barContainer}
          >
            <Box
              width={`${((value >= 0 ? value : max) / max) * 100}%`}
              className={`${classes.bar} ${
                value >= 0 ? classes.neutralPrimary : undefined
              }`}
            />
          </Box>
        )}
      </Grid>

      {delta && (
        <Grid item xs={2} container justify="flex-end">
          <Typography
            component="span"
            noWrap
            // className={`${classes.labels} ${delta > 0 ? classes.deltaPos : classes.deltaNeg}`}
            className={`${classes.labels} ${classes.delta} ${
              isDeltaGood
                ? classes.deltaPos
                : isDeltaBad
                ? classes.deltaNeg
                : undefined
            } ${delta <= -1000 || delta >= 1000 ? classes.deltaMax : ""}`}
          >
            {deltaFormatted ? deltaFormatted : delta ? delta : undefined}
          </Typography>
        </Grid>
      )}
    </Grid>
  ) : (
    <div></div>
  );
};
