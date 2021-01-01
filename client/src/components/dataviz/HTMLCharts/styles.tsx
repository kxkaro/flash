import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../../../styles/animations";

export const rowMargin = 0.25;
export const rowHeight = 3;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paddingLeft: {
      paddingLeft: "1.2em",
    },
    container: {
      width: "100%",
      maxHeight: `${(rowHeight + 2 * rowMargin) * 12 - 2 * rowMargin}vh`,
      paddingLeft: "1em",
      paddingRight: "1em",
      overflowY: "scroll",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        width: ".6em",
      },
      // '&::-webkit-scrollbar-track': {
      //   '-webkit-box-shadow': 'inset 0 0 1px rgba(0, 0, 0, .2)',
      //   backgroundColor: 'rgba(0, 0, 0, .01)',
      // },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, .13)",
        borderRadius: "4px",
      },
    },
    containerSm: {
      maxHeight: `${(rowHeight + 2 * rowMargin) * 14}vh`,
      width: "100%",
      paddingLeft: "1.5em",
      paddingRight: 0,
      overflowY: "scroll",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        width: ".6em",
      },
      // '&::-webkit-scrollbar-track': {
      //   '-webkit-box-shadow': 'inset 0 0 1px rgba(0, 0, 0, .2)',
      //   backgroundColor: 'rgba(0, 0, 0, .01)',
      // },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, .13)",
        borderRadius: "4px",
      },
    },
    fadeOutIn: {
      animation: `$fade-out-in 2s ease-in-out`,
    },
    fadeOut: {
      animation: `$fade-out 1s ease-in-out`,
    },
    fadeIn: {
      animation: `$fade-in 1s ease-in-out`,
    },
    row: {
      marginTop: `${rowMargin}vh`,
      marginBottom: `${rowMargin}vh`,
      height: `${rowHeight}vh`,
    },
    hide: {
      opacity: 0,
    },
    labels: {
      "&$category": {
        fontSize: theme.fontSizes.quinary,
        textTransform: "uppercase",
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.fontSizes.senary,
        },
      },
      "&$categorySm": {
        fontSize: theme.fontSizes.senary,
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.fontSizes.septonary,
        },
        textTransform: "uppercase",
      },
      "&$label": {
        fontWeight: "bold",
        width: "100%",
        paddingLeft: ".5em",
        paddingRight: ".5em",
        textAlign: "right",
        fontSize: theme.fontSizes.senary,
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.fontSizes.septonary,
        },
      },
      "&$delta": {
        fontWeight: "bold",
        fontSize: theme.fontSizes.senary,
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.fontSizes.septonary,
        },
      },
      "&$deltaMax": {
        fontSize: `calc(${theme.fontSizes.senary} - .3vh)`,
        [theme.breakpoints.down("sm")]: {
          fontSize: `calc(${theme.fontSizes.septonary} - .3vh)`,
        },
      },
      "&$rank": {
        paddingRight: ".5em",
        fontWeight: "bold",
      },
    },
    category: {},
    categorySm: {},
    label: {},
    delta: {},
    deltaMax: {},
    rank: {},
    barContainer: {
      display: "flex",
      "&$borderRight": {
        borderRight: `solid 1px ${theme.palette.primary.main}`,
      },
      "&$borderLeft": {
        borderLeft: `solid 1px ${theme.palette.primary.main}`,
      },
    },
    borderRight: {},
    borderLeft: {},
    bar: {
      height: `${rowHeight}vh`,
      borderRadius: "1px",
      "&$marginLeft": {
        marginLeft: ".5em",
      },
      "&$marginRight": {
        marginRight: ".5em",
      },
      "&$neutralPrimary": {
        backgroundColor: theme.palette.primary.main,
      },
      "&$neutralSecondary": {
        backgroundColor: theme.palette.primary.main,
      },
      "&$pos": {
        backgroundColor: theme.palette.success.main,
      },
      "&$neg": {
        backgroundColor: theme.palette.error.main,
      },
      "&$posExceed": {
        background:
          "linear-gradient(90deg, rgba(23,153,90,1) 80%, rgba(23,153,90,0) 100%)",
      },
      "&$negExceed": {
        background:
          "linear-gradient(90deg, rgba(204,12,47,0) 0%, rgba(204,12,47,1) 20%);",
      },
      "&$left": {
        marginRight: "auto !important",
      },
      "&$right": {
        marginLeft: "auto !important",
      },
    },
    left: {},
    right: {},
    marginLeft: {},
    marginRight: {},
    pos: {},
    neg: {},
    posExceed: {},
    negExceed: {},
    neutralPrimary: {},
    neutralSecondary: {},
    deltaPos: {
      fontWeight: "bold",
      color: theme.palette.success.main,
      textAlign: "right",
    },
    deltaNeg: {
      fontWeight: "bold",
      color: theme.palette.error.main,
      textAlign: "right",
    },
    unit: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 .5em",
      fontWeight: 400,
    },
    padding: {
      paddingLeft: ".5em",
      paddingRight: ".5em",
    },
    ...animations,
  })
);
