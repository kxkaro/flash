import React from "react";
import clsx from 'clsx';
import { animated } from "react-spring";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Children } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            backgroundColor: "rgba(0, 0, 0, .6)",
            width: "30%",
            margin: ".5em",
            border: "solid 1px white",
            position: "relative",
            color: "white",
        },
        decor: {
            '&$left': {
                left: "calc(0px - 16px - 10px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: "16px",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .8,
                '&::before': {
                    content: "''",
                    left: "calc(0px - 13px - 10px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: "12px",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .6,
                },
                '&::after': {
                    content: "''",
                    left: "calc(0px - 19px - 22px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: "6px",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                },
            },
            '&$right': {
                left: "calc(100% + 10px)",
                position: "absolute",
                top: "-1px",
                bottom: "-1px",
                right: "auto",
                width: "16px",
                backgroundColor: "rgba(0, 0, 0, .4)",
                border: "solid 1px white",
                opacity: .8,
                '&::before': {
                    content: "''",
                    left: "calc(100% + 10px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: "12px",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .6,
                },
                '&::after': {
                    content: "''",
                    left: "calc(100% + 11px + 22px)",
                    position: "absolute",
                    top: "-1px",
                    bottom: "-1px",
                    right: "auto",
                    width: "6px",
                    backgroundColor: "rgba(0, 0, 0, .4)",
                    border: "solid 1px white",
                    opacity: .4,
                },
            },
        },
        left: {},
        right: {},
        skew: {
            transform: "skew(-15deg)",
        }
    })
);

interface Props {
    children: Children;
    style?: any;
    skew?: boolean;
}

export const NFSPanel = ({ skew = false, style, children }: Props) => {
    const classes = useStyles();

    return (
        <animated.div style={style} className={clsx(classes.card, { [classes.skew]: skew })}>

            <span className={clsx(classes.decor, classes.left)} />
            <span className={clsx(classes.decor, classes.right)} />

            {children}
        </animated.div>
    );
};
