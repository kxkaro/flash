import React, { useState, useEffect } from "react";
import { animations } from '../../styles/animations';
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Hidden, Box, Typography } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { Transitions } from "./Transitions";
import { FlashData } from "../../logic/dataTypes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            position: "relative",
        },
        bgContainer: {
            position: "fixed",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: -5,
            display: "flex",
            justifyContent: "center",
            '&::before': {
                content: "''",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                top: "auto",
                height: "5em",
                backgroundColor: "black",
            },
            '&::after': {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: "auto",
                height: "5em",
                backgroundColor: "black",
            },
        },
        cardContainer: {
            marginTop: "4em",
            marginLeft: "-3em",
            '& $card:nth-child(1)': {
                width: "25em",
                height: "6em",
            },
            '& $card:nth-child(2)': {
                width: "23.3em",
                height: "6em",
            },
            '& $card:nth-child(3)': {
                width: "21.6em",
                height: "6em",
            },
        },
        card: {
            backgroundColor: "rgba(0, 0, 0, .4)",
            margin: ".5em",
            border: "solid 1px white",
            padding: ".8em 4em",
            transform: "skew(-15deg)",
            position: "relative",
            color: "white",
            '&::before': {
                content: "''",
                left: "calc(100% + 5px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: ".8em",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
            },
            '&::after': {
                content: "''",
                left: "calc(100% + .8em + 10px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: ".6em",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
            },
        },
        title: {
            // textShadow: `0 0 10px #fff, 0 0 20px #fff, 0 0 30px ${theme.palette.primary.main}, 
            // 0 0 40px ${theme.palette.primary.main}, 0 0 50px ${theme.palette.primary.main}, 0 0 60px ${theme.palette.primary.main}, 0 0 70px ${theme.palette.primary.main}`,
        }
    })
);

interface Props {
    init: boolean;
    play: boolean;
    setPlay: any;
    appId: string;
    data: FlashData;
}

export const Slideshow2 = ({
    init,
    play,
    setPlay,
    appId,
    data,
}: Props) => {
    const classes = useStyles();
    const [duration, setDuration] = useState(30000);

    //   const dataKeys = data ? [...data.keys()] : [];
    //   const dataValues = data ? [...data.values()] : [];

    //   const slides: SlideData = dataValues.flat(1);

    // For the 'legend' in Player components (marks, sequences)
    const labels: Array<string> = data && data.games ? data?.games?.map(
        (game) => game.label
    ) : [""];

    const sequences = ["Timeline"];

    //   const getMaxRows = (i: number) =>
    //     Math.max(
    //       ...[...slides[index].data.values()]
    //         .map((s) => [...s.main.values()].map((e) => e.data.length))
    //         .flat(2)
    //     );

    const totalLen = data?.games?.length || 0;
    const seqLen = totalLen / 2; // TODO: Repair this to get the seqLen of current time box

    // Change index every 'duration' seconds. Index is used to display current slide in Transitions
    const [index, setIndex] = useState(0);
    const [indexImg, setIndexImg] = useState(0);

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => {

                setIndexImg((prev) => {
                    if (prev === 5) setIndex((p) => (p + 1) % totalLen);
                    return (prev + 1) % 6
                })
            }, duration / 6);

            return () => {
                clearInterval(interval);
            };
        }
    }, [play, data, duration, totalLen]);

    const components = data?.games ?
        data.games.map((slide, ind) => (
            <>
                {/* Blurred bg - could also use a pseudo element */}
                <Transitions
                    className={classes.bgContainer}
                    index={indexImg}
                    components={slide.background.map((src) => (
                        <>
                            <Img src={src} style={{
                                zIndex: -2,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "calc(100vh - 10em)",
                                margin: "5em auto",
                                objectFit: "cover",
                                filter: "blur(20px)",
                            }} />
                            <Img src={src} style={{
                                zIndex: -1,
                                position: "absolute",
                                height: "calc(100vh - 10em)",
                                margin: "5em auto",
                                // filter: "drop-shadow(16px 16px 20px)",
                            }} />
                        </>
                    ))}
                />

                <Box className={classes.cardContainer}>
                    <Box className={classes.card}>
                        <Typography variant="h6" color="primary" className={classes.title}>
                            {slide.game.text}
                        </Typography>
                    </Box>
                    <Box className={classes.card}>
                        <Typography variant="body1" color="inherit">
                            {slide.developers.join(', ')}
                        </Typography>
                    </Box>
                    <Box className={classes.card}>
                        <Typography variant="body1" color="inherit">
                            {slide.year}
                        </Typography>
                    </Box>
                </Box>
            </>
        )) : [];

    return (
        <Grid container justify="center">
            <Grid container item className={classes.content}>

                <Transitions components={components} index={index} />

                <Player
                    appId={appId}
                    init={init}
                    play={play}
                    setPlay={setPlay}
                    index={index}
                    length={totalLen}
                    setIndex={(n: number) => {
                        setIndex(n);
                        setIndexImg(0);
                    }}
                    duration={duration}
                    setDuration={setDuration}
                    labels={labels}
                    sequences={sequences}
                    bgIndex={0}
                    setBgIndex={() => ""}
                />
            </Grid>
        </Grid>
    );
};
