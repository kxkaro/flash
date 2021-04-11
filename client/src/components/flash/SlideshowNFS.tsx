import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { Img } from "react-image";
import { Grid, Box, Hidden } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { TitlePanels } from "./TitlePanels";
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
      "&::before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: "-20%",
        right: "-20%",
        bottom: "auto",
        height: "12.5vh",
        backgroundColor: "black",
      },
      "&::after": {
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
    progress: {
      zIndex: 10,
      position: "absolute",
      top: "-2vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    progressItem: {
      width: "1vh",
      height: "1vh",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, .4)",
      margin: "1em",
      fontSize: "8px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, .87)",
      },
      "&$active": {
        backgroundColor: "rgba(255, 255, 255, .87)",
      },
    },
    active: {},
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
  const imgPerSlide = 6;

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
          return (prev + 1) % (totalLen * imgPerSlide);
        });
      }, duration / imgPerSlide);

      return () => {
        clearInterval(interval);
      };
    }
  }, [mounted, play, data, duration, totalLen]);

  const slides = data.games
    .map((slide, ind) =>
      slide.background.map((src, i) => (
        <div key={i} className={classes.container}>
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

  const ui = data.games
    .map((slide, ind) => {
      const r = Math.floor(Math.random());
      const salesAmount =
        Number(slide.qty.value) > 0
          ? `${formatNumber(slide.qty.value, 1000000, 1)} M ${slide.qty.unit}`
          : unknownTx[r * unknownTx.length];

      return slide.background.map(() => (
        <TitlePanels
          key={ind}
          primary={{ name: `#${ind + 1}`, body: slide.game.text }}
          primaryContent={slide?.rating ? rating(slide.rating) : undefined}
          secondary={{ name: "Year", body: slide.year }}
          tertiary={{
            name: "Sales",
            body: salesAmount,
          }}
          quaternary={{ name: "Developers", body: slide.developers.join(", ") }}
          applyStyle={!((index > prevIndex && index % imgPerSlide !== 0) || (index < prevIndex && Math.floor(index / imgPerSlide) === Math.floor(prevIndex / imgPerSlide)))}
        />
      ));
    })
    .flat(1);

  return mounted ? (
    <Grid container justify="center">
      <Grid container item className={classes.content}>
        <Hidden smDown>
          <Box className={classes.cinema}>
            <Transitions
              variant={
                (index > prevIndex && index % imgPerSlide !== 0) || (index < prevIndex && Math.floor(index / imgPerSlide) === Math.floor(prevIndex / imgPerSlide))
                  ? "fade-in"
                  : (index < prevIndex ||
                      (prevIndex === 0 && index === (totalLen * imgPerSlide) - 1))
                  ? "swipe-cube-to-right"
                  : "swipe-cube-to-left"
              }
              components={slides}
              index={index}
            />
          </Box>

          <Transitions
            variant={index % imgPerSlide === 0 ? "fade-in-slide-out" : "none"}
            components={ui}
            index={index}
          />

          <Player
            appId={appId}
            init={true}
            play={play}
            setPlay={setPlay}
            index={Math.floor(index / imgPerSlide)}
            secondaryIndex={index}
            length={totalLen}
            setIndex={(n: number, prev: number) => {
              setIndex(n * imgPerSlide);
              setPrevIndex(prev * imgPerSlide);
            }}
            setSecondaryIndex={(n: number, prev: number) => {
              setIndex(n);
              setPrevIndex(prev);
            }}
            duration={duration}
            setDuration={setDuration}
            labels={labels}
            sequences={sequences}
            setBgIndex={() => ""}
            categoryPrimary="game"
            categorySecondary="image"
          />

          {/* Secondary progress indicator */}
          <div className={classes.progress}>
            {new Array(imgPerSlide).fill(null).map((el, i) => (
              <span
                key={i}
                className={clsx(classes.progressItem, {
                  [classes.active]: i === index % imgPerSlide,
                })}
                onClick={() => {
                  if (i !== (index % imgPerSlide)) {
                    setIndex((prev: number) => {
                      setPrevIndex(prev);
                      return prev - (prev % imgPerSlide) + i;
                    })
                  }
                  
                }}
              />
            ))}
          </div>
        </Hidden>

        <Hidden mdUp>
          <SmallScreenMessage variant="NFS" />
        </Hidden>
      </Grid>
    </Grid>
  ) : (
    <LoadProgress index={mountProgressIndex} length={imgLoad.length} />
  );
};
