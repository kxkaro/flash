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
            marginTop: "8vh",
            height: "75vh",
            width: "100vw",
            position: "relative",
            overflow: "hidden",
            '& > div > div:nth-child(-n+3)': {
                padding: "1.5vh 2vh 1.5vh calc(8vw + 2vh)",
                marginLeft: "-5vw",
            },
            '& > div > div:nth-child(1)': {
                height: "15vh",
            },
            '& > div > div:nth-child(2)': {
                height: "12vh",
            },
            '& > div > div:nth-child(3)': {
                height: "12vh",
            },
            '& > div > div:nth-child(4)': {
                padding: "1.5vh 4vh",
                marginTop: "16vh",
                [theme.breakpoints.down("md")]: {
                    marginTop: "10vh",
                },
                position: "absolute",
                right: "-10vw",
                height: "12vh",
            },
        },
        skew: {
            transform: "skew(-15deg)",
        },
        title: {
            fontWeight: "bold",
        },
        text: {
            textTransform: "uppercase",
            fontSize: "2.2vh",
            [theme.breakpoints.down("md")]: {
                fontSize: "2vh",
            },
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
    applyStyle?: boolean;
}

export const TitlePanels = ({
    primary,
    primaryContent,
    secondary,
    tertiary,
    quaternary,
    applyStyle = true,
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
            <div className={classes.skew}>
                {[primary, secondary, tertiary, quaternary].map(({ name, body }, i) => (
                    <NFSPanel key={`anim-${i}`} style={applyStyle ? styles[i] : undefined}>
                        <Typography color="primary" className={clsx(classes.text, classes.title)}>
                            {name}
                        </Typography>
                        <Typography color="inherit" className={classes.text}>
                            {body}
                        </Typography>
                        
                        {i === 0 && primaryContent}
                    </NFSPanel>
                ))}
            </div>
        </Box>
    );
};
