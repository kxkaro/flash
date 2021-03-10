import React, { useState, useEffect, Suspense } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Grid, Box, Hidden } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { TitlePanels } from "./TitlePanels";
import { ImgTransition } from "./ImgTransition";
import { Transitions } from "./Transitions";
import { FlashData } from "../../logic/dataTypes";
import { formatNumber } from "../../utils/numberFormat";
import { Rating } from "@material-ui/lab";
import { Tooltip } from "@material-ui/core";
import { SmallScreenMessage } from "./SmallScreenMessage";
import { NEED_FOR_SPEED } from "../../constants/nfsData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      position: "relative",
    },
    cinema: {
      position: "fixed",
      top: 0,
      height: "100vh",
      width: "100%",
    },
  })
);

interface Props {
  play: boolean;
  setPlay: any;
  appId: string;
  data: FlashData;
}

export const SlideshowNFS = ({ play, setPlay, appId, data }: Props) => {
  const classes = useStyles();

  const imgLoad = NEED_FOR_SPEED.games.map((el, i) => el.background).flat(1);

  const [mounted, setMounted] = useState(false);
  const [mountProgressIndex, setMountProgressIndex] = useState(0);

  useEffect(() => {
    if (!mounted) {
      Promise.all(
        imgLoad.map((url, i) =>
          fetch(url).then(() => setMountProgressIndex(i + 1))
        )
      )
        .then((res) => {
          setMounted(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const [duration, setDuration] = useState(30000);

  // For the 'legend' in Player components (marks, sequences)
  const labels: Array<string> =
    data && data.games ? data?.games?.map((game) => game.label) : [""];

  const sequences = ["Timeline"];

  const totalLen = data?.games?.length || 0;

  // Change index every 'duration' seconds. This influences current game selection
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    if (play && mounted) {
      const interval = setInterval(() => {
        setIndex((prev) => {
          setPrevIndex(prev);
          return (prev + 1) % totalLen;
        });
      }, duration);

      return () => {
        clearInterval(interval);
      };
    }
  }, [mounted, play, data, duration, totalLen]);

  const backgrounds = data.games.map((slide, ind) => (
    <ImgTransition
      play={play}
      sources={slide.background}
      duration={duration / slide.background.length}
      outerIndex={index}
    />
  ));

  const unknownTx = [
    "Who knows...",
    "One will never know...",
    "Wish I knew...",
    "Probably more than you think...",
    "Depends if you count pirated versions...",
    "They told me to delete it...",
    "Voices in my head tell me it's a lot...",
  ];

  const StyledRating = withStyles((theme: Theme) => ({
    iconFilled: {
      color: theme.palette.primary.main,
    },
    iconHover: {
      color: theme.palette.primary.main,
    },
    iconEmpty: {
      color: theme.palette.primary.main,
      opacity: 0.4,
    },
  }))(Rating);

  const rating = (n: number) => (
    <Box
      style={{ marginTop: ".4vh" }}
      component="fieldset"
      mb={3}
      borderColor="transparent"
    >
      <Tooltip title="Metacritic Rating" arrow interactive>
        <StyledRating
          name="metacritic-rating-10"
          defaultValue={n / 10}
          max={10}
          precision={0.1}
          readOnly
        />
      </Tooltip>
    </Box>
  );

  const ui = data.games.map((slide, ind) => (
    <TitlePanels
      primary={{ name: `#${ind + 1}`, body: slide.game.text }}
      primaryContent={slide?.rating ? rating(slide.rating) : undefined}
      secondary={{ name: "Year", body: slide.year }}
      tertiary={{
        name: "Sales",
        body:
          Number(slide.qty.value) > 0
            ? `${formatNumber(slide.qty.value, 1000000, 1)} M ${slide.qty.unit}`
            : unknownTx[Math.floor(Math.random() * unknownTx.length)],
      }}
      quaternary={{ name: "Developers", body: slide.developers.join(", ") }}
    />
  ));

  return mounted ? (
    <Grid container justify="center">
      <Grid container item className={classes.content}>
        <Hidden only="xs">
          <Box className={classes.cinema}>
            <Transitions
              variant={
                index < prevIndex || (prevIndex === 0 && index === totalLen - 1)
                  ? "swipe-cube-to-right"
                  : "swipe-cube-to-left"
              }
              components={backgrounds}
              index={index}
            />
          </Box>

          <Transitions
            variant="fade-in-slide-out"
            components={ui}
            index={index}
          />

          <Player
            appId={appId}
            init={true}
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
            setBgIndex={() => ""}
          />
        </Hidden>

        <Hidden smUp>
          <SmallScreenMessage variant="NFS" />
        </Hidden>
      </Grid>
    </Grid>
  ) : (
    <div
      style={{
        zIndex: 200,
        color: "white",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      Loading {mountProgressIndex} / {imgLoad.length}
      <div style={{ width: "10em", height: "1em", border: "1px solid white", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${mountProgressIndex / imgLoad.length * 10}em`, right: "auto", height: "100%", backgroundColor: "white" }} />
      </div>
    </div>
  );
};
