import React, { useRef, RefObject } from "react";
import clsx from 'clsx';
import { useSpring, useChain, animated, config, SpringHandle } from "react-spring";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { NFSPanel } from './NFSPanel';
import { TVIcon } from '../../icons/TVIcon';

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
                padding: "1.5em 1em"
            }
        },
        header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: ".5em",
        },
        icon: {
            marginRight: ".5em",
            color: theme.palette.primary.main,
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
        solarCard: {
            '& > div': {
                padding: "1em",
                margin: ".2em",
                backgroundColor: "rgba(255, 255, 255, .8)",
            },
            '& > div:nth-child(1)': {
                borderRadius: "2px 2px 0 0",
            },
            '& > div:nth-child(2)': {
                borderRadius: "0 0 2px 2px",
            }
        },
    })
);

interface Props {
    variant: "Solar" | "NFS";
    init?: boolean;
}

export const SmallScreenMessage = ({ variant, init }: Props) => {
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


    // For solar 
    const useSolarAnimation = (newRef: RefObject<SpringHandle>) => {
        const spring = useSpring({
            from: {
                transform: "translateY(2rem)",
                opacity: 0,
            },
            to: {
                transform: "translateY(0rem)",
                opacity: 1,
            },
            config: config.slow,
            ref: newRef
        });

        return spring;
    }

    const solarRef1 = useRef(null);
    const solarRef2 = useRef(null);
    const solarStyle1 = useSolarAnimation(solarRef1);
    const solarStyle2 = useSolarAnimation(solarRef2);
    useChain([solarRef1, solarRef2], [.5, 1.4]);


    const texts = [
        "Looks like your screen is too small. This app is designed for large screens.",
        "Recommended display: your jumbotron, TV, desktop, laptop (alternatively, horizontal view).",
    ];

    return (
        <div className={classes.container}>
            {variant === "NFS" ? (
                <NFSPanel style={style}>
                    <div className={classes.header}>
                        <Typography color="primary" className={clsx(classes.text, classes.title)}>
                            Ooops...
                    </Typography>
                        <TVIcon fontSize="small" className={classes.icon} />
                    </div>
                    <>
                        {texts.map((tx, i) => (
                            <Typography color="inherit" className={classes.text} gutterBottom>
                                {tx}
                            </Typography>
                        ))}
                    </>
                </NFSPanel>
            ) : (
                    <div className={classes.solarCard}>
                        <animated.div style={solarStyle1} className={classes.header}>
                            <Typography color="primary" className={clsx(classes.text, classes.title)}>
                                Ooops...
                            </Typography>
                            <TVIcon fontSize="small" className={classes.icon} />
                        </animated.div>

                        <animated.div style={solarStyle2}>
                            {texts.map((tx, i) => (
                                <Typography color="inherit" className={classes.text} gutterBottom>
                                    {tx}
                                </Typography>
                            ))}
                        </animated.div>
                    </div>
                )}
        </div>
    );
};
