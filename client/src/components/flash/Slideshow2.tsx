import React, { useState, useEffect } from "react";
// import { animations } from '../../styles/animations';
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { Transitions } from "./Transitions";
import { FlashData } from "../../logic/dataTypes";
import { TransitionVariant } from '../../logic/types';

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
            '& $card:nth-child(1)': {
                marginLeft: "-1rem",
                height: "5rem",
            },
            '& $card:nth-child(2)': {
                marginLeft: "-2.35rem",
                height: "4.2rem",
            },
            '& $card:nth-child(3)': {
                marginLeft: "-3.5rem",
                height: "3.8rem",
            },
        },
        card: {
            backgroundColor: "rgba(0, 0, 0, .4)",
            width: "22rem",
            margin: ".5em",
            border: "solid 1px white",
            padding: ".8em 2rem .8em 6rem",
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
                width: ".8rem",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .8,
            },
            '&::after': {
                content: "''",
                left: "calc(100% + .8rem + 12px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: ".6rem",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .6,
            },
            '& $title': {
                '&::after': {
                    content: "''",
                    left: "calc(100% + 1.4rem + 20px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".3rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                }
            }
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

    // For the 'legend' in Player components (marks, sequences)
    const labels: Array<string> = data && data.games ? data?.games?.map(
        (game) => game.label
    ) : [""];

    const sequences = ["Timeline"];

    const totalLen = data?.games?.length || 0;

    // Change index every 'duration' seconds. Index is used to display current slide in Transitions
    // [a, b] - a is the slide index, b index of an image
    const [indexes, setIndexes] = useState([0, 0]);

    useEffect(() => {
        if (play) {
            const n = 6; // Number of images

            const interval = setInterval(() => {
                setIndexes((prev) => [
                    prev[1] === (n - 1) ? (prev[0] + 1) % totalLen : prev[0],
                    (prev[1] + 1) % n
                ])
            }, duration / n);

            return () => {
                clearInterval(interval);
            };
        }
    }, [play, data, duration, totalLen]);

    const backgrounds = data.games.map((slide, ind) => (
        <Transitions
            className={classes.bgContainer}
            index={indexes[1] % slide.background.length}
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
    ));

    const ui = data.games.map((slide, ind) => (
        <Box className={classes.cardContainer}>
            <Box className={classes.card}>
                <Typography variant="h6" color="primary" className={classes.title}>
                    {slide.game.text}
                </Typography>
            </Box>
            <Box className={classes.card}>
                <Typography variant="body1" color="inherit" className={classes.title}>
                    {slide.developers.join(', ')}
                </Typography>
            </Box>
            <Box className={classes.card}>
                <Typography variant="body1" color="inherit" className={classes.title}>
                    {slide.year}
                </Typography>
            </Box>
        </Box>
    ));

    return (
        <Grid container justify="center">
            <Grid container item className={classes.content}>
                {[
                    { components: backgrounds, transition: "fade-in" as TransitionVariant },
                    { components: ui, transition: "slide-in" as TransitionVariant }
                ].map(({ components, transition }) => (
                    <Transitions 
                        variant={transition}
                        components={components} 
                        index={indexes[0] % totalLen} 
                    />
                ))}

                <Player
                    appId={appId}
                    init={init}
                    play={play}
                    setPlay={setPlay}
                    index={indexes[0]}
                    length={totalLen}
                    setIndex={(n: number) => setIndexes([n, 0])}
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
