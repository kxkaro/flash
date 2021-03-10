import React, { useState, useEffect, Suspense } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import { Img } from "react-image";
import { Grid, Box, Hidden } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { TitlePanels } from "./TitlePanels";
import { ImgTransition } from "./ImgTransition";
import { Transitions } from "./Transitions";
import { FlashData } from "../../logic/dataTypes";
import { formatNumber } from "../../utils/numberFormat";
import { Rating } from "@material-ui/lab";
import { Tooltip } from "@material-ui/core";
import { LoadProgress } from "../navigation/LoadProgress";
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
    container: {
        position: "relative",
        top: 0,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        '&::before': {
            content: "''",
            position: "absolute",
            top: 0,
            left: "-20%",
            right: "-20%",
            bottom: "auto",
            height: "12.5vh",
            backgroundColor: "black",
        },
        '&::after': {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: "-20%",
            right: "-20%",
            top: "auto",
            height: "12.5vh",
            backgroundColor: "black",
        },
    },
    imgBg: {
      zIndex: -2,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "calc(100vh - 10em)",
      margin: "5em auto",
      objectFit: "cover",
      filter: "blur(20px)",
      overflow: "hidden",
    },
    img: {
      zIndex: -1,
      position: "absolute",
      height: "75vh",
      widht: "100%",
      boxShadow: "10px 10px 10em rgba(0, 0, 0, .6)",
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

  // Delay rendering of the slideshow until all images are loaded by the browser to assure the right experience
  // Without this step the images would not animate properly as they would be still loading while the animations are playing
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
      }, duration / 6);

      return () => {
        clearInterval(interval);
      };
    }
  }, [mounted, play, data, duration, totalLen]);

  // const backgrounds = data.games.map((slide, ind) => (
  //   <ImgTransition
  //     play={play}
  //     sources={slide.background}
  //     duration={duration / slide.background.length}
  //     index={innerIndex}
  //     setIndex={setInnerIndex}
  //     outerIndex={index}
  //   />
  // ));
  const slides = data.games
    .map((slide, ind) =>
      slide.background.map((src, i) => (
        <div className={classes.container}>
          <Img src={src} key={`${src}-${i}-bg`} className={classes.imgBg} />
          <Img src={src} key={`${src}-${i}`} className={classes.img} />
        </div>
      ))
    )
    .flat(1);

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

  const ui = data.games.map((slide, ind) => {
    const r = Math.floor(Math.random());
    const salesAmount = Number(slide.qty.value) > 0
    ? `${formatNumber(slide.qty.value, 1000000, 1)} M ${slide.qty.unit}`
    : unknownTx[r * unknownTx.length];

    return slide.background.map(() => (
      <TitlePanels
        primary={{ name: `#${ind + 1}`, body: slide.game.text }}
        primaryContent={slide?.rating ? rating(slide.rating) : undefined}
        secondary={{ name: "Year", body: slide.year }}
        tertiary={{
          name: "Sales",
          body: salesAmount, 
        }}
        quaternary={{ name: "Developers", body: slide.developers.join(", ") }}
        applyStyle={index % 6 === 0}
      />
    ))
  }).flat(1);

  return mounted ? (
    <Grid container justify="center">
      <Grid container item className={classes.content}>
        <Hidden only="xs">
          <Box className={classes.cinema}>
            <Transitions
              variant={index % 6 !== 0 ? "fade-in" :
                index % 6 === 0 && (index < prevIndex || (prevIndex === 0 && index === totalLen - 1))
                  ? "swipe-cube-to-right"
                  : "swipe-cube-to-left"
              }
              components={slides}
              index={index}
            />
          </Box>

          <Transitions
            variant={index % 6 === 0 ? "fade-in-slide-out" : "fade-in-slide-out" } 
            components={ui}
            index={index}
          />

          <Player
            appId={appId}
            init={true}
            play={play}
            setPlay={setPlay}
            index={Math.floor(index / 6)}
            length={totalLen}
            setIndex={(n: number, prev: number) => {
              setIndex(n * 6);
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
    <LoadProgress index={mountProgressIndex} length={imgLoad.length} />
  );
};
