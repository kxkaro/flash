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
  absPosition: "behind-bar" | "align-column";
  rankColor?: "primary" | "secondary";
  categorySize?: "sm" | "md";
}

export const BarChartRowAbsDeltaMulti = ({
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
  absPosition,
  rankColor = "primary",
  categorySize = "md",
}: Props) => {
  const classes = useStyles();

  return value ? (
    <Grid
      id={`chart-row-${i}`}
      container
      item
      xs={12}
      // md={10}
      direction="row"
      className={`${classes.row} ${filler && classes.hide}`}
    >
      <Grid container item xs={5}>
        <Typography
          component="span"
          color="primary"
          noWrap
          className={`${classes.labels} ${
            categorySize === "sm" ? classes.categorySm : classes.category
          } ${classes.paddingLeft}`}
        >
          <Typography
            component="span"
            color="textSecondary"
            className={`${classes.labels} ${
              categorySize === "sm" ? classes.categorySm : classes.category
            } ${classes.rank} ${classes.paddingLeft}`}
          >{`#${i + 1} `}</Typography>
          {category}
        </Typography>
      </Grid>

      {/* Prop 'absPosition' determines where labels behind the bars representing absolute values are positioned 
                They can either  be displayed directly after the right side of the bar, or be vertically aligned as a column
            */}
      <Grid item container xs={7}>
        <Grid
          item
          xs={absPosition === "behind-bar" ? 5 : 4}
          className={classes.barContainer}
        >
          <Box
            width={`${
              (value / max) * (absPosition === "behind-bar" ? 50 : 100)
            }%`}
            className={`${classes.bar} ${classes.neutralPrimary}`}
          />

          {absPosition === "behind-bar" && (
            <Typography
              color="primary"
              component="span"
              // noWrap
              className={`${classes.labels} ${classes.label}`}
            >
              {valueFormatted ? valueFormatted : value}
            </Typography>
          )}
        </Grid>

        {absPosition === "align-column" && (
          <Grid item container justify="flex-start" xs={1}>
            <Typography
              color="primary"
              noWrap
              className={`${classes.labels} ${classes.label}`}
            >
              {valueFormatted ? valueFormatted : value}
            </Typography>
          </Grid>
        )}

        <Grid container item xs={12} lg={7} className={classes.barContainer}>
          {/* TODO: Add check for abs(delta) > 100 and add gradient css  */}
          {/* Negative delta */}
          <Grid item container justify="flex-end" xs={6}>
            {delta && delta < 0 ? (
              <>
                <Typography
                  component="span"
                  noWrap
                  className={`${classes.labels} ${classes.delta} ${
                    isDeltaBad ? classes.deltaNeg : undefined
                  } ${delta <= -1000 ? classes.deltaMax : ""}`}
                >
                  {deltaFormatted ? deltaFormatted : delta}
                </Typography>

                <Box
                  width={`${
                    (Math.abs(delta < -100 ? -100 : delta) / 100) * 50
                  }%`}
                  className={`${classes.bar} ${
                    delta < -100 ? classes.negExceed : classes.neg
                  } ${classes.marginLeft}`}
                />
              </>
            ) : (
              <></>
            )}
          </Grid>

          {/* Positive delta */}
          <Grid item container justify="flex-start" xs={6}>
            {delta && delta > 0 ? (
              <>
                <Box
                  width={`${(Math.abs(delta > 100 ? 100 : delta) / 100) * 50}%`}
                  className={`${classes.bar} ${
                    delta > 100 ? classes.posExceed : classes.pos
                  } ${classes.marginRight}`}
                />

                <Typography
                  component="span"
                  noWrap
                  className={`${classes.labels} ${classes.delta} ${
                    isDeltaGood ? classes.deltaPos : undefined
                  } ${delta >= 1000 ? classes.deltaMax : ""}`}
                >
                  {deltaFormatted ? deltaFormatted : delta}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <div></div>
  );
};
