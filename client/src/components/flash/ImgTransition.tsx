import React, { useState, useEffect } from "react";
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Hidden, Box, Typography } from "@material-ui/core";
import { Player } from "../navigation/Player";
import { Transitions } from "./Transitions";
import { GameDataItem } from "../../logic/dataTypes";

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
    totalDuration: number;
    n: number;
    data: GameDataItem;
}

export const ImgTransition = ({
    init,
    play,
    data,
    totalDuration,
    n,
}: Props) => {
    const classes = useStyles();
    const [duration, setDuration] = useState(Math.floor(totalDuration / n));
    
    // Change index every 'duration' seconds. Index is used to display current slide in Transitions
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % n);
            }, duration);

            return () => {
                clearInterval(interval);
            };
        }
    }, [play, data, duration, n]);
    console.log(data.background[index])
    return (
        <Box>
            {/* Blurred bg - could also use a pseudo element */}
            <Img src={data.background[index]} style={{
                zIndex: -2,
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "80%",
                margin: "5% auto",
                objectFit: "cover",
                filter: "blur(10px)",
            }} />
            <Img src={data.background[index]} style={{
                zIndex: -1,
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "80%",
                margin: "5% auto",
                objectFit: "contain",
            }} />
            <Typography variant="h1" style={{ color: "white" }}>
                {data.game.text}
            </Typography>
        </Box>
    );
};
