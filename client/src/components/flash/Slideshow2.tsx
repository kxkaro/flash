import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
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
        cinema: {
            position: "fixed",
            top: 0,
            height: "100vh",
            width: "100%",
            '&::before': {
                content: "''",
                zIndex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: "auto",
                height: "12.5vh",
                backgroundColor: "black",
            },
            '&::after': {
                content: "''",
                zIndex: 1,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                top: "auto",
                height: "12.5vh",
                backgroundColor: "black",
            },
        }
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

                <Box className={classes.cinema}>
                    <Transitions
                        variant="swipe-cube-horizontal"
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
