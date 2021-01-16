import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Transitions } from "./Transitions";

const useStyles = makeStyles((t) =>
    createStyles({
        container: {
            position: "relative",
            top: 0,
            height: "100vh",
            width: "100%",
            '&::before': {
                content: "''",
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
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                top: "auto",
                height: "12.5vh",
                backgroundColor: "black",
            },
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
            height: "75vh",
            margin: "12.5vh auto",
            boxShadow: "10px 10px 10em rgba(0, 0, 0, .6)",
        },
        progress: {
            zIndex: 10,
            position: "absolute",
            top: "5vh",
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
            '&:hover': {
                backgroundColor: "rgba(255, 255, 255, .87)",
            },
            '&$active': {
                backgroundColor: "rgba(255, 255, 255, .87)",
            }
        },
        active: {},
    })
);

interface Props {
    sources: Array<string>;
    duration: number;
    outerIndex: number;
}

export const ImgTransition = ({
    sources,
    duration,
    outerIndex
}: Props) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % sources.length);
        }, duration);

        return () => clearInterval(interval);
    })

    useEffect(() => {
        if (outerIndex === 0) {
            setIndex(0);
        }
    }, [outerIndex])

    return (
        <div className={classes.container}>
            <div className={classes.progress}>
                {sources.map((source, i) => (
                    <span 
                        className={clsx(classes.progressItem, { [classes.active]: i === index})} 
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>

            <Transitions
                className={classes.bgContainer}
                index={index}
                variant="fade-in"
                components={sources.map((src, i) => (
                    <>
                        <Img src={src} key={`${src}-${i}-bg`} className={classes.imgBg} />
                        <Img src={src} key={`${src}-${i}`} className={classes.img} />
                    </>
                ))}
            />
        </div>
    );
};
