import React, { useState, useEffect } from "react";
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { TitlePanels } from './TitlePanels';
import { ImgTransition } from './ImgTransition';
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
                height: "12.5vh",
                backgroundColor: "black",
            },
            '&::after': {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: "auto",
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
        },
        img: {
            zIndex: -1,
            position: "absolute",
            height: "calc(100vh - 10em)",
            margin: "5em auto",
            // filter: "drop-shadow(16px 16px 20px)",
        },
    })
);

interface Props {
    play: boolean;
    setPlay: any;
    appId: string;
    data: FlashData;
}

export const Slideshow2 = ({
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

    // Change index every 'duration' seconds. This influences current game selection
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => {
                setIndex(prev => (prev + 1) % totalLen);
            }, duration);

            return () => {
                clearInterval(interval);
            };
        }
    }, [play, data, duration, totalLen]);


    const backgrounds = data.games.map((slide, ind) => (
        <ImgTransition 
            sources={slide.background} 
            duration={duration / slide.background.length}
            outerIndex={index}
        />
    ));

    const ui = data.games.map((slide, ind) => (
        <TitlePanels
            primary={slide.game.text}
            secondary={slide.developers.join(", ")}
            tertiary={slide.year}
        />
    ));

    return (
        <Grid container justify="center">
            <Grid container item className={classes.content}>
                <Transitions
                    variant="fade-in"
                    components={backgrounds}
                    index={index}
                />

                <Transitions
                    variant="fade-in"
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
                    setIndex={(n: number) => setIndex(n)}
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
