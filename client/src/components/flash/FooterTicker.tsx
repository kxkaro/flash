import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Ticker from "react-ticker";
import { TickerData } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      position: "fixed",
      bottom: "0",
      height: "12.5vh",
      color: "rgba(255, 255, 255, .87)",
      "&::before": {
        content: "''",
        position: "absolute",
        top: "4vh",
        right: 0,
        bottom: 0,
        left: 0,
        background: `linear-gradient(to right, rgba(0, 0, 0, 1) 1.5%, rgba(0, 0, 0, 0) 2.5%, rgba(0, 0, 0, 0) 97.5%, rgba(0, 0, 0, 1) 98.5%)`,
        zIndex: 1,
      },
    },
    title: {
      marginLeft: "100vw",
      minWidth: "100vw",
      textAlign: "center",
    },
    tickerText: {
      fontSize: theme.fontSizes.primary,
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.fontSizes.tertiary,
      },
    },
    textContainer: {
      marginTop: "4vh",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      display: "inline-block",
    },
    country: {
      fontWeight: "bold",
    },
    KPI: {
      fontWeight: "bold",
    },
    separator: {
      backgroundColor: "rgba(255, 255, 255, .87)",
      borderRadius: "50%",
      width: ".25em",
      height: ".25em",
      marginLeft: ".5em",
      marginRight: ".5em",
      marginBottom: "1vh",
      display: "inline-block",
    },
    deltaPos: {
      fontWeight: "bold",
      color: theme.palette.success.main,
    },
    deltaNeg: {
      fontWeight: "bold",
      color: theme.palette.error.main,
    },
  })
);

interface Props {
  appId: string;
  init: boolean;
  play: boolean;
  text: string;
  data: Map<string, TickerData>;
}

export const FooterTicker = ({
  appId,
  init = true,
  play = true,
  data,
  text,
}: Props) => {
  const classes = useStyles();

  const list = [...data.entries()]
    ?.map(([keyHeader, valueHeader], indHeader) =>
      [...valueHeader.entries()]?.map(([key, value], ind) =>
        value.map((value, i) => (
          <Typography
            key={`${key}-${i}`}
            className={`${classes.textContainer} ${classes.tickerText}`}
          >
            {/* Display header only before the first section */}
            {i === 0 && ind === 0 ? (
              <Typography
                component="span"
                color="secondary"
                className={`${classes.country} ${classes.tickerText}`}
              >
                {`${keyHeader} // `}
              </Typography>
            ) : undefined}

            {/* Display header only before the first item */}
            {i === 0 && (
              <Typography
                component="span"
                color="textSecondary"
                className={`${classes.country} ${classes.tickerText}`}
              >
                {`${key}: `}
              </Typography>
            )}

            {`${value.name}: `}

            {value?.primary && (
              <Typography
                component="span"
                className={`${classes.KPI} ${classes.tickerText}`}
              >
                {value?.primaryFormatted
                  ? value.primaryFormatted
                  : value.primary}
                {value?.primaryDelta || value?.primaryDeltaFormatted ? (
                  <Typography
                    component="span"
                    className={`${
                      value?.primaryIsGood
                        ? classes.deltaPos
                        : value?.primaryIsBad
                        ? classes.deltaNeg
                        : undefined
                    } ${classes.tickerText}`}
                  >
                    {value.primaryDelta !== 0
                      ? ` (${
                          value?.primaryDeltaFormatted
                            ? value.primaryDeltaFormatted
                            : value.primaryDelta
                        })`
                      : undefined}
                  </Typography>
                ) : undefined}
              </Typography>
            )}

            {/* Separator, full circle */}
            <Typography
              component="span"
              className={`${classes.separator} ${classes.tickerText}`}
            />
          </Typography>
        ))
      )
    )
    .flat(2);

  // Add title before the sequence.
  // the class tickerTitle moves the element outside of the screen to the right
  // and sets the width to 100vw to let the ticker smoothly enter the screen
  // once the data is fully loaded
  const title = (
    <Typography
      className={`${classes.textContainer} ${classes.tickerText} ${classes.title}`}
    >
      {text}
    </Typography>
  );
  const startArr = [title];

  return (
    <Box className={classes.container}>
      {init && (
        <Ticker speed={8} direction="toLeft" move={play} mode="chain">
          {({ index }) =>
            list &&
            [...startArr, ...list][index % (list.length + startArr.length)]
          }
        </Ticker>
      )}
    </Box>
  );
};