import React, { useRef, RefObject } from "react";
import { animations } from '../../styles/animations';
import clsx from 'clsx';
import { useSpring, useChain, config, animated, SpringHandle } from "react-spring";
// import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { Children } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: "8vh",
            height: "75vh",
            width: "100vw",
            position: "relative",
            overflow: "hidden",
            '& $card:nth-child(-n+3)': {
                padding: ".8em 2rem .8em calc(8vw + 2rem)",
                marginLeft: "-5vw",
            },
            '& $card:nth-child(1)': {
                height: "14vh",
            },
            '& $card:nth-child(2)': {
                height: "12vh",
            },
            '& $card:nth-child(3)': {
                height: "11vh",
            },
            '& $card:nth-child(4)': {
                padding: ".8em 2rem",
                marginTop: "16vh",
                position: "absolute",
                right: "-10vw",
                height: "12vh",
                // animationDelay: "1.8s",
            },
        },
        card: {
            backgroundColor: "rgba(0, 0, 0, .4)",
            width: "30%",
            margin: ".5em",
            border: "solid 1px white",
            // transform: "skew(-15deg) translateX(10rem)",
            // position: "relative",
            color: "white",
            // opacity: 0,
            // animation: `$no-transform-skew 2s cubic-bezier(0, 1, 0, .95) forwards`,
        },
        decor: {
            '&$left': {
                left: "calc(0% - .8rem - 5px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: ".8rem",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .8,
                '&::before': {
                    content: "''",
                    left: "calc(0% - .6rem - 6px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".6rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .6,
                },
                '&::after': {
                    content: "''",
                    left: "calc(0% - .9rem - 14px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".3rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                },
            },
            '&$right': {
                left: "calc(100% + 5px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: ".8rem",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .8,
                '&::before': {
                    content: "''",
                    left: "calc(100% + 6px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".6rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .6,
                },
                '&::after': {
                    content: "''",
                    left: "calc(100% + .6rem + 14px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".3rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                },
            },
        },
        left: {},
        right: {},
        title: {},
        ...animations
    })
);

interface Props {
    primary: string;
    secondary: string;
    tertiary: string;
}

export const TitlePanels = ({
    primary,
    secondary,
    tertiary,
}: Props) => {
    const classes = useStyles();

    const useAnimation = (newRef: RefObject<SpringHandle>) => {
        const spring = useSpring({
            from: {
                transform: "translateX(10rem)",
                opacity: 0,
            },
            to: {
                transform: "translateX(0rem)",
                opacity: 1,
            },
            config: config.stiff,
            ref: newRef
        });

        return spring;
    }

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const refs = [ref1, ref2, ref3];
    const style1 = useAnimation(ref1);
    const style2 = useAnimation(ref2);
    const style3 = useAnimation(ref3);
    const style4 = useAnimation(ref4);
    const styles = [style1, style2, style3, style4];


    useChain([ref1, ref2, ref3, ref4], [.5, .8, 1.2, 1.8]);


    return (
        <Box className={classes.container}>
            <div style={{ transform: "skew(-15deg" }}>
                {[primary, secondary, tertiary].map((tx, i) => (
                    <animated.div key={`anim-${i}`} style={styles[i]} className={clsx(classes.card)}>
                        <span className={clsx(classes.decor, classes.left)} />
                        <span className={clsx(classes.decor, classes.right)} />
                        <Typography variant="h6" color={i === 0 ? "primary" : "inherit"} className={classes.title}>
                            {tx}
                        </Typography>
                    </animated.div>
                ))}

                <animated.div style={style4} className={clsx(classes.card)}>
                    <span className={clsx(classes.decor, classes.left)} />
                    <span className={clsx(classes.decor, classes.right)} />
                    <Typography variant="h6" color="primary" className={classes.title}>
                        Sales
                </Typography>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        1 M copies
                </Typography>
                </animated.div>
            </div>
        </Box>
    );
};
