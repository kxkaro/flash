import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Hidden, Box, Typography } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { NavTitles } from "./NavTitles";
import { Content } from "./Content";
import BarChart from "../dataviz/HTMLCharts/BarChart";
import ImgTiles from "./ImgTiles";
import { Transitions } from "./Transitions";
import { SlideData } from "../../logic/types";
import { FlashData } from "../../logic/dataTypes";

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
    const [duration, setDuration] = useState(15000);

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

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % totalLen);
            }, duration);

            return () => {
                clearInterval(interval);
            };
        }
    }, [play, data, duration, totalLen]);

    const components = data?.games ?
        data.games.map((slide, ind) => (
            <Box>
                <Typography variant="h1" style={{ color: "white" }}>
                {slide.game.text}
                </Typography>
            </Box>
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
                    setIndex={setIndex}
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
