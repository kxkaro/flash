import React, { useRef, RefObject } from "react";
import { animations } from '../../styles/animations';
import clsx from 'clsx';
import { useSpring, useChain, config, animated, SpringHandle } from "react-spring";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

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
                height: "15vh",
            },
            '& $card:nth-child(2)': {
                height: "12vh",
            },
            '& $card:nth-child(3)': {
                height: "12vh",
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
            backgroundColor: "rgba(0, 0, 0, .6)",
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
                left: "calc(0% - 1.3rem - 5px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: "1.2rem",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .8,
                '&::before': {
                    content: "''",
                    left: "calc(0% - 1rem - 6px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".9rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .6,
                },
                '&::after': {
                    content: "''",
                    left: "calc(0% - 1.6rem - 14px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".4rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                },
            },
            '&$right': {
                left: "calc(100% + 8px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: "1.2rem",
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
                    width: ".9rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .6,
                },
                '&::after': {
                    content: "''",
                    left: "calc(100% + .9rem + 14px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: ".4rem",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                },
            },
        },
        left: {},
        right: {},
        title: {
            fontWeight: "bold",
        },
        text: {
            fontSize: "2vh",
            textTransform: "uppercase",
        },
        ...animations
    })
);

interface Text {
    name: string;
    body: string;
}

interface Props {
    primary: Text;
    primaryContent?: any;
    secondary: Text;
    tertiary: Text;
    quaternary: Text;
}

export const TitlePanels = ({
    primary,
    primaryContent,
    secondary,
    tertiary,
    quaternary,
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
    const style1 = useAnimation(ref1);
    const style2 = useAnimation(ref2);
    const style3 = useAnimation(ref3);
    const style4 = useAnimation(ref4);
    const styles = [style1, style2, style3, style4];


    useChain([ref1, ref2, ref3, ref4], [.5, .8, 1.2, 1.6]);


    return (
        <Box className={classes.container}>
            <div style={{ transform: "skew(-15deg" }}>
                {[primary, secondary, tertiary, quaternary].map(({ name, body }, i) => (

                    <animated.div key={`anim-${i}`} style={styles[i]} className={clsx(classes.card)}>

                        <span className={clsx(classes.decor, classes.left)} />
                        <span className={clsx(classes.decor, classes.right)} />

                        <Typography color="primary" className={clsx(classes.text, classes.title)}>
                            {name}
                        </Typography>
                        <Typography color="inherit" className={classes.text}>
                            {body}
                        </Typography>
                        
                        {i === 0 && primaryContent}
                    </animated.div>
                ))}
            </div>
        </Box>
    );
};
