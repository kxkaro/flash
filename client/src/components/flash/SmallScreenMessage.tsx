import React, { useRef, RefObject } from "react";
import { animations } from '../../styles/animations';
import clsx from 'clsx';
import { useSpring, useChain, config, SpringHandle } from "react-spring";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { NFSPanel } from './NFSPanel';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80vh",
            '& > div': {
                width: "65%",
            }
        },
        title: {
            fontWeight: "bold",
        },
        text: {
            textTransform: "uppercase",
            fontSize: "2vh",
            [theme.breakpoints.down("md")]: {
                fontSize: "1.6vh",
            },
        },
    })
);


interface Props {
    header: string;
    message: string;
}

export const SmallScreenMessage = ({ header, message }: Props) => {
    const classes = useStyles();

    const useAnimation = (newRef: RefObject<SpringHandle>) => {
        const spring = useSpring({
            from: {
                transform: "translateX(30rem) skew(-15deg)",
                opacity: 0,
            },
            to: {
                transform: "translateX(0rem) skew(-15deg)",
                opacity: 1,
            },
            config: config.gentle,
            ref: newRef
        });

        return spring;
    }

    const ref = useRef(null);
    const style = useAnimation(ref);

    useChain([ref], [0]);

    return (
        <div className={classes.container}>
            <NFSPanel style={style}>
                <Typography color="primary" className={clsx(classes.text, classes.title)}>
                    {header}
                </Typography>
                <Typography color="inherit" className={classes.text}>
                    {message}
                </Typography>
            </NFSPanel>
        </div>
    );
};
