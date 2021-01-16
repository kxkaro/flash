import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Hidden, Box } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { NavTitles } from "./NavTitles";
import { Content } from "./Content";
import BarChart from "../dataviz/HTMLCharts/BarChart";
import ImgTiles from "./ImgTiles";
import { SlidesStateData, SlideData } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: "98vw",
      marginTop: "2vh",
      position: "relative",
    },
    chartContainer: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      marginTop: ".5em",
      marginBottom: ".5em",
    },
  })
);

interface Props {
  init: boolean;
  play: boolean;
  setPlay: any;
  appId: string;
  bgIndex: number;
  setBgIndex: any;
  data: SlidesStateData;
}

export const SlideshowSolar = ({
  init,
  play,
  setPlay,
  appId,
  bgIndex,
  setBgIndex,
  data,
}: Props) => {
  const classes = useStyles();
  const [duration, setDuration] = useState(15000);

  const dataKeys = data ? [...data.keys()] : [];
  const dataValues = data ? [...data.values()] : [];

  const slides: SlideData = dataValues.flat(1);

  // For the 'legend' in Player components (marks, sequences)
  const labels: Array<string> = slides.map(
    (slide) => slide.headers.titleSecondaryShort
  );
  const sequences = dataKeys;

  const getMaxRows = (i: number) =>
    Math.max(
      ...[...slides[index].data.values()]
        .map((s) => [...s.main.values()].map((e) => e.data.length))
        .flat(2)
    );

  const totalLen = slides.length;
  const seqLen = totalLen / 2; // TODO: Repair this to get the seqLen of current time box

  // Change index every 'duration' seconds. Index is used to display current slide in Transitions
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % totalLen);
      }, duration);

      return () => {
        clearInterval(interval);
      };
    }
  }, [play, slides, duration, totalLen]);

  const getComponents = (name: string) =>
    slides.map((slide, ind) => (
      <>
        {[...(slide.data.get(name)?.main.entries() || [])].map(
          ([key, val], i) =>
            val.type === "bar-chart" ? (
              <Box
                key={`chart-${name}-${key}-${i}`}
                className={classes.chartContainer}
              >
                <BarChart
                  title={key}
                  variant="scroll"
                  // variant="fade"
                  type="abs-delta"
                  rankColor="primary"
                  categorySize="sm"
                  play={play}
                  appId={appId}
                  scrollId={`${appId}-${name.replace(" ", "-").toLowerCase()}`}
                  duration={duration}
                  data={
                    val.data.map((row) => ({
                      category: row.name,
                      value: row.primary,
                      valueFormatted: row.primaryFormatted,
                      delta: row.primaryDelta,
                      deltaFormatted: row.primaryDeltaFormatted,
                      isDeltaGood: row.primaryIsGood,
                      isDeltaBad: row.primaryIsBad,
                    })) || []
                  }
                  unit={"k€"}
                  maxRows={getMaxRows(index)}
                />
              </Box>
            ) : val.type === "items" && val.data.length > 0 ? (
              <ImgTiles key={`items-${name}-${ind}-${i}`} data={val.data} />
            ) : undefined
        )}
      </>
    ));

  return (
    <Grid container justify="center">
      <Grid container item className={classes.content}>
        <NavTitles
          init={init}
          current={slides[index].headers}
          next={slides[(index + 1) % totalLen].headers}
          play={play}
          index={index}
          setIndex={setIndex}
          seqLen={seqLen}
          onBreadClick={(index: number) =>
            setIndex(
              (prev: number) => index + Math.floor(prev / seqLen) * seqLen // TODO: repair this to take into consideration current sequence name
            )
          }
          sequences={sequences}
          currentSequence={slides[index].headers.sequence}
        />

        {[...slides[index].data.entries()].map(([name, value], i) => (
          // TODO: Responsiveness:
          <Hidden
            key={`${name}-${i}`}
            only={i > 0 ? "xs" : undefined}
            smDown={i > 1}
          >
            <Content
              init={init}
              name={name}
              tileData={value.tile} // TODO: consider changing to Transitions and passing components
              components={getComponents(name)}
              index={index}
            />
          </Hidden>
        ))}

        <Player
          appId={appId}
          init={init}
          play={play}
          setPlay={setPlay}
          index={index}
          length={totalLen}
          setIndex={(n: number, prev: number) => {
            setIndex(n);
            setPrevIndex(prev);
          }}
          duration={duration}
          setDuration={setDuration}
          labels={labels}
          sequences={sequences}
          bgIndex={bgIndex}
          setBgIndex={setBgIndex}
        />
      </Grid>
    </Grid>
  );
};
