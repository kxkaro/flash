import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import {
  Box,
  Grid,
  // Typography,
  // Collapse,
  // Fade
} from "@material-ui/core";
import { BarChartRowAbsDelta } from "./BarChartRowAbsDelta";
import { BarChartRowDeltaAbs } from "./BarChartRowDeltaAbs";
import { BarChartRowAbsDeltaMulti } from "./BarChartRowAbsDeltaMulti";
import { BarChartData } from "../../../logic/datavizTypes";
import { useStyles } from "./styles";

interface Props {
  title: string;
  appId: string;
  scrollId: string;
  duration?: number;
  play: boolean;
  data: BarChartData;
  unit?: string;
  maxRows?: number;
  variant: "scroll" | "fade";
  type: "delta-abs" | "abs-delta" | "abs-delta-multi";
  rankColor?: "primary" | "secondary";
  categorySize?: "sm" | "md";
}

// TODO: do not display delta if LY is missing - edit query - test it
// TODO: make fonts smaller
// TODO: fix scrolling for values > 20 or extend the list to 14 values at once
const BarChart = ({
  title,
  variant,
  type,
  appId,
  scrollId,
  duration = 20000,
  play,
  data,
  unit = "K$",
  maxRows,
  rankColor,
  categorySize,
}: Props) => {
  const classes = useStyles();
  const max = Math.max(...data.map((row) => Number(row.value)));
  const min = Math.min(...data.map((row) => Number(row.value)));
  const scrollID = `scroll-container-${scrollId}`;

  // Do not show rows, where category is unassigned
  data = data.filter((row) => row.category && row.category !== "");

  const scrollDuration = 2000;
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: scrollID,
      duration: scrollDuration,
    });
  };

  // const scrollToTop = () => {
  //   animateScroll.scrollToTop({
  //     containerId: scrollID,
  //     duration: scrollDuration,
  //   });
  // };

  const runScroll = () => {
    if (variant === "scroll") {
      // Scroll down half way (only if total number of rows is > 10)
      const timeoutDown = setTimeout(() => {
        if (play && (maxRows || data.length > 10)) {
          scrollToBottom();
        }
      }, duration / 2 - scrollDuration / 2);

      // Returning a function in useEffect is equivilent of componentWillUnmount in a React Class
      return () => {
        clearTimeout(timeoutDown);
      };
    }
  };

  // This variant fades in and out sequentially every 10 results from the data set
  const [index, setIndex] = useState(0);
  const [blink, setBlink] = useState(false);

  const runFade = () => {
    if (variant === "fade") {
      setIndex(0);
      setBlink(false);

      // Change data in the middle
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, duration / Math.ceil(data.length / 10));

      const timeoutBlink = setTimeout(() => {
        setBlink(true);
      }, duration / 2 - 1000);

      // Returning a function in useEffect is equivilent of componentWillUnmount in a React Class
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeoutBlink);
      };
    }
  };

  // This chart is intended to show 10 bars at once and then scroll to the next 10
  // class 'chartContainer' uses property 'maxHeight' = 10 * row fontSize and 'overflow' = hidden (or auto)
  // to create a scroll panel
  useEffect(() => {
    variant === "scroll" ? runScroll() : runFade();
  });

  // This filler is added to the rendered array in order to always have at least 10 elements in the scrollable container
  // And to align all charts on all cards
  // This way the charts will be aligned on all panels
  // If filler rows are not provided, fill to the closest 10*N
  maxRows = maxRows && maxRows >= 10 ? maxRows : 10;
  const fillerArr = maxRows
    ? new Array(maxRows ? maxRows - data.length : 10 - (data.length % 10)).fill(
        {
          category: "",
          value: 0,
          delta: 0,
          filler: true,
        }
      )
    : [];

  return (
    <Box
      id={scrollID}
      className={`${
        type === "abs-delta" ? classes.container : classes.containerSm
      } ${blink && classes.fadeOutIn}`}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ left: 0, right: 0 }}
      >
        {data &&
          [
            // ...data.sort((a, b) => Number(b.value) - Number(a.value)),
            ...data,
            ...fillerArr,
          ]
            .filter((item, i) =>
              variant === "fade"
                ? i >= index * 10 && i < (index + 1) * 10
                : i >= 0
            )
            .map((row, i) =>
              type === "abs-delta" ? (
                <BarChartRowAbsDelta
                  key={`chart-bar-${i}-${row.value}`}
                  i={i + index * 10}
                  category={row.category}
                  filler={row.filler}
                  value={row.value}
                  valueFormatted={row.valueFormatted}
                  delta={row.delta}
                  deltaFormatted={row.deltaFormatted}
                  isDeltaGood={row.isDeltaGood}
                  isDeltaBad={row.isDeltaBad}
                  max={max}
                  min={min}
                  rankColor={rankColor}
                  categorySize={categorySize}
                />
              ) : type === "delta-abs" ? (
                <BarChartRowDeltaAbs
                  key={`chart-bar-${i}-${row.value}`}
                  i={i + index * 10}
                  category={row.category}
                  filler={row.filler}
                  value={row.value}
                  valueFormatted={row.valueFormatted}
                  delta={row.delta}
                  deltaFormatted={row.deltaFormatted}
                  isDeltaGood={row.isDeltaGood}
                  isDeltaBad={row.isDeltaBad}
                  max={max}
                  rankColor={rankColor}
                  categorySize={categorySize}
                />
              ) : (
                <BarChartRowAbsDeltaMulti
                  key={`chart-bar-${i}-${row.value}`}
                  i={i + index * 10}
                  category={row.category}
                  filler={row.filler}
                  value={row.value}
                  valueFormatted={row.valueFormatted}
                  delta={row.delta}
                  deltaFormatted={row.deltaFormatted}
                  isDeltaGood={row.isDeltaGood}
                  isDeltaBad={row.isDeltaBad}
                  max={max}
                  absPosition="behind-bar"
                  rankColor={rankColor}
                  categorySize={categorySize}
                />
              )
            )}
      </Grid>
    </Box>
  );
};

export default BarChart;
