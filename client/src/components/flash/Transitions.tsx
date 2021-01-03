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

  const fadeIn = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  };

  const slideIn = {
    from: { transform: "translateX(20rem)", width: "calc(100vw - 20rem)", opacity: 0 },
    enter: { transform: "translateX(0rem)", opacity: 1 },
    leave: { transform: "translateX(-20rem)", opacity: 0 },
    config: config.stiff,
  };

  const transitions =  useTransition(
    components[ind],
    (item) => index % components.length,
    variant === "slide-in" ? slideIn : fadeIn,
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
