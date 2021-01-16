import React from "react";
import clsx from 'clsx';
import { useTransition, animated, config } from "react-spring";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { TransitionVariant } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
    },
  })
);

interface Props {
  components: Array<any>;
  index: number;
  style?: any;
  className?: any;
  variant?: TransitionVariant;
}

export const Transitions = ({ variant = "fade-in", components, index, style, className }: Props) => {
  const classes = useStyles();

  // if index is greater than the length of the slidesData array, show the last slide
  const ind = index < components.length ? index : components.length - 1;



  const transitionsDef = {
    "fade-in": {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.gentle,
    },
    "slide-in": {
      from: { transform: "translateX(20rem)", width: "calc(100vw - 20rem)", opacity: 0 },
      enter: { transform: "translateX(0rem)", opacity: 1 },
      leave: { transform: "translateX(-20rem)", opacity: 0 },
      config: config.stiff,
    },
    "fade-in-slide-out": {
      from: { opacity: 0, transform: "translateX(0em)" },
      enter: { opacity: 1, transform: "translateX(0em)" },
      leave: { opacity: 0, transform: "translateX(-100vw)" },
      config: config.stiff,
    },
    "swipe-cube-horizontal": {
      from: {
        position: "fixed",
        transform: "translate(100%) perspective(100vw) translateZ(-25vw) rotateY(90deg)",
        transformOrigin: "left",
        transformStyle: "preserve-3d",
        opacity: 0,
      },
      enter: {
        transform: "translate(0%) perspective(100vw) translateZ(0vw) rotateY(0deg)",
        transformOrigin: "center",
        transformStyle: "preserve-3d",
        opacity: 1,
      },
      leave: {
        transform: "translate(-100%) perspective(100vw) translateZ(-25vw) rotateY(-90deg)", 
        transformOrigin: "right",
        transformStyle: "preserve-3d",
        opacity: 0
      },
      config: config.slow
    },
  }

  const transition = transitionsDef[variant];


  const transitions =  useTransition(
    components[ind],
    (item) => index % components.length,
    transition
  );


  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div 
          key={key} 
          style={{ ...props, ...style }} 
          className={clsx(classes.content, className)}
        >
          {item}
        </animated.div>
      ))}
    </>
  );
};
