import React, { useRef, RefObject } from "react";
import { animations } from '../../styles/animations';
import clsx from 'clsx';
import { useSpring, useChain, config, animated, SpringHandle } from "react-spring";
// import { Img } from 'react-image';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            marginTop: "4em",
            // marginLeft: "10em",
            '& $card:nth-child(1)': {
                marginLeft: "-1rem",
                height: "5rem",
                // animationDelay: ".8s",
            },
            '& $card:nth-child(2)': {
                marginLeft: "-2.35rem",
                height: "4.2rem",
                // animationDelay: "1.3s",
            },
            '& $card:nth-child(3)': {
                marginLeft: "-3.5rem",
                height: "3.8rem",
                // animationDelay: "1.8s",
            },
        },
        card: {
            backgroundColor: "rgba(0, 0, 0, .4)",
            width: "22rem",
            margin: ".5em",
            border: "solid 1px white",
            padding: ".8em 2rem .8em 6rem",
            // transform: "skew(-15deg) translateX(10rem)",
            position: "relative",
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

export const TitlePanelsChain = ({
    primary,
    secondary,
    tertiary,
}: Props) => {
    const classes = useStyles();

    const useAnimation = (newRef: RefObject<SpringHandle>) => {
        const spring = useSpring({
            from: {
                transform: "translateX(20em)",
            },
            to: {
                transform: "translateX(-5em)",
            },
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

    
    useChain([ref1, ref2, ref3, ref4], [1, 2, 3, 5]);

    return (
        <div style={{ position: "fixed", left: "10em", top: "10em"}}>
             <animated.div style={style1}>ABCDEF</animated.div>
             <animated.div style={style2}>ABCDEF</animated.div>
             <animated.div style={style3}>ABCDEF</animated.div>
             <animated.div style={style4}>ABCDEF</animated.div>
        </div>
    );
};
