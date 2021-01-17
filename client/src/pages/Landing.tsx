import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../styles/animations";
import { withPush } from "../utils/routingDecorators";
import { Link } from "../utils/Link";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import FlashLayout from "../layouts/Flash";
import { TitleLogoBar } from "../layouts/Header";
import { Mode, User } from "../logic/types";
import { SuspenseImg } from '../utils/SuspenseImg';
import nfsImg from '../img/landing/nfs.jpg';
import solarImg from '../img/landing/solar.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "80vh",
      marginTop: "12.5vh",
      overflowX: "hidden",
      textAlign: "center",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: ".6em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255, 255, 255, .13)",
        borderRadius: "4px",
      },
      '& h6': {
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.2em",
        },
      },
      '& p': {
        [theme.breakpoints.down("sm")]: {
          fontSize: "1em",
        },
      }
    },
    item: {
      marginBottom: "2em",
      padding: "2em",
      position: "relative",
    },
    padding: {
      padding: "0 .5em"
    },
    imgContainer: {
      position: "relative",
      overflow: "hidden",
      width: "80%",
      height: "80%",
      [theme.breakpoints.down("sm")]: {
        width: "60%",
        height: "60%",
      },
      borderRadius: "5px",
      marginBottom: "1em",
      margin: "0 auto",
    },
    img: {
      backgroundColor: "#000",
      objectFit: "cover",
      height: "100%",
      width: "100%",
      color: "white",
      borderRadius: "5px",
      transition: "transform .6s ease-in",
      '&:hover': {
        transform: "scale(1.2)",
        transition: "transform .6s ease-out",
      }
    },
    blur: {
      filter: "blur(25px)",
      overflow: "hidden",
    },
    blurOff: {
      filter: "blur(25px)",
      animation: `$no-filter .15s linear forwards`,
      // animation: `$no-filter .15s cubic-bezier(0, 0, .2, 1) forwards`,
    },
    footer: {
      textAlign: "center",
      height: "100%",
      width: "100%"
    },
    ...animations,
  })
);

interface Props {
  user: User;
  mode: Mode;
  setMode: any;
  getData: any;
}
const Landing = ({ user, mode, setMode }: Props) => {
  const classes = useStyles();

  const items = {
    "solar-system": {
      name: "SOLAR FLASH",
      description: "A dashboard with some whatever info about our fantastic solar system",
      image: solarImg,
    },
    "need-for-speed": {
      name: "NEED FOR FLASH",
      description: "Evolution of the Need for Speed games",
      image: nfsImg,
    },
  };

  const captions = [
    "Data collected manually",
    "Solar System:",
    "- https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
    "Need For Speed:",
    "- https://vgsales.fandom.com/wiki/Need_for_Speed",
    "- https://en.wikipedia.org/wiki/Need_for_Speed)",
    "Contact me via kxkaro@gmail.com",
  ];

  return (
    <FlashLayout
      user={user}
      mode="dark"
      setMode={setMode}
      appId=""
      bgIndex={0}
      header={
        // TODO: Replace the title component with standard Typography variants, not vh size
        <TitleLogoBar
          play={false}
          appId="DEFAULT"
          title="_KX_FLASH"
          titleShort="_KX_FLASH"
          subtitle={`Have a great day`}
          subtitleShort={`Yo`}
        />
      }
    >
      <Grid
        container
        alignItems="flex-start"
        justify="center"
        className={classes.container}
      >
        {Object.entries(items).map(([key, item], i) => (
          <Grid item xs={12} sm={6} container justify="center" alignItems="center" className={classes.item}>
            <Link key={i} to={`/${i + 1}/${key}`}>
              <div className={classes.imgContainer}>
                <SuspenseImg
                  alt={item.name}
                  img={{
                    img: item.image,
                    className: `${classes.img} ${classes.blurOff}`,
                  }}
                  fallback={{
                    img: item.image,
                    className: `${classes.img} ${classes.blur}`,
                  }}
                />
              </div>
              <Typography variant="h6">
                {item.name}
              </Typography>
              <Typography variant="body1">
                {item.description}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid >
    </FlashLayout >
  );
};

export default withPush(Landing);
