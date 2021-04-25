import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Grid, Slider as SliderComponent } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      color: "rgba(255, 255, 255, .87)",
    },
    border: {
      borderLeft: `solid .5px rgba(255, 255, 255, .4)`,
      borderRight: "solid .5px rgba(255, 255, 255, .4)",
    },
  })
);

const PlayerSlider = withStyles((theme: Theme) => ({
  markLabel: {
    fontSize: ".8em",
    color: "rgba(255, 255, 255, .87)",
    transform: "translateX(-80%) rotate(-45deg)",
    textAlign: "right",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      fontSize: ".6em",
    },
  },
  markLabelActive: {
    color: "rgba(255, 255, 255, .4)",
  },
  valueLabel: {
    "& > span > span": {
      color: theme.palette.primary.main,
    },
  },
}))(SliderComponent);

interface Props {
  index: number;
  setIndex: any;
  length: number;
  labels: Array<string>;
  bgIndex?: number;
  sequences: Array<string>;
}

export const Slider = ({
  index,
  length,
  setIndex,
  labels,
  sequences,
}: Props) => {
  const classes = useStyles();
  const marks = labels?.map((label, i) => ({
    value: i + 1,
    label: label,
  }));

  return (
    <Grid item container direction="column" xs={12} md={5} lg={6}>
      <Grid item container justify="center">
        {sequences.map((el, i) => (
          <Grid
            key={i}
            item
            container
            justify="center"
            xs={i === 0 ? 8 : 4} // TODO: implement logic to calculate this width
            // xs={Math.floor(12 / categories.length)}
            className={classes.border}
          >
            {el}
          </Grid>
        ))}
      </Grid>

      <PlayerSlider
        defaultValue={index}
        value={index + 1}
        min={1}
        max={length}
        step={1}
        marks={marks ? marks : true}
        aria-labelledby="discrete-slider-restrict"
        valueLabelDisplay="auto"
        valueLabelFormat={(value: number) =>
          labels ? labels[value - 1] : value
        }
        onChange={(event: object, value: number | number[]) =>
          setIndex(Number(value) - 1, index)
        }
        className={classes.slider}
      />
    </Grid>
  );
};
