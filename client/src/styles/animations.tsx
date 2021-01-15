// This file stores animations which are common in the whole application
export const animations = {
  "@keyframes no-transform": {
    "100%": {
      opacity: 1,
      transform: "none",
    },
  },
  "@keyframes no-transform-skew": {
    "100%": {
      opacity: 1,
      transform: "skew(-15deg)",
    },
  },
  "@keyframes no-filter": {
    "100%": {
      filter: "none",
    },
  },
  "@keyframes grow": {
    "0%": {
      height: "10vh",
    },
    "50%": {
      height: "17vh",
    },
    "100%": {
      height: "10vh",
    },
  },
  "@keyframes fade-out-in": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes fade-out": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
  "@keyframes fade-in": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  pauseAnim: {
    opacity: 1,
    transform: "translateY(0)",
    animationPlayState: "paused",
  },
  "@keyframes no-transform-skew-pause": {
    "100%": {
      opacity: 1,
      transform: "skew(-15deg)",
      animationPlayState: "paused",
      animationDelay: "2s",
    },
  },
};
