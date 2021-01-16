import React, { useState, useEffect } from "react";
import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Transitions } from "./Transitions";

const useStyles = makeStyles((t) =>
    createStyles({
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
            // filter: "drop-shadow(16px 16px 20px)",
        },
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
    );
};
