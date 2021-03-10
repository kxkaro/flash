import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
    },
    playerInput: {
      marginRight: "1em",
      textAlign: "right",
      fontSize: "1em",
      [theme.breakpoints.down("md")]: {
        fontSize: ".8em",
      },
    },
    narrow: {
      width: "8em",
      [theme.breakpoints.down("lg")]: {
        width: "4em",
      },
    },
    iconContainer: {
      width: "1em",
    },
    iconSm: {
      width: 20,
      height: 20,
    },
  })
);

interface Props {
  duration: number;
  setDuration: any;
  fullWidth?: boolean;
}

export const PlayerInput = ({ duration, setDuration, fullWidth }: Props) => {
  const classes = useStyles();
  const minVal = 5000;
  const maxVal = 60000;

  return (
    <Box className={classes.container}>
      <Hidden lgDown>
        <Typography
          className={`${classes.playerInput} ${
            !fullWidth ? classes.narrow : undefined
          }`}
        >
          Game duration: {duration / 1000}s
        </Typography>
      </Hidden>
      <Hidden xlUp>
        <Typography variant="body2" className={classes.playerInput}>
          Duration: {duration / 1000}s
        </Typography>
      </Hidden>

      <Grid container direction="column" className={classes.iconContainer}>
        <Tooltip
          title="5 seconds more"
          aria-label="slide duration more"
          placement="right"
          arrow
        >
          <IconButton
            color="inherit"
            aria-label="next"
            onClick={() =>
              setDuration((prev: number) =>
                prev < maxVal ? prev + minVal : prev
              )
            }
            className={classes.iconSm}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="5 seconds less"
          aria-label="slide duration less"
          placement="right"
          arrow
        >
          <IconButton
            color="inherit"
            aria-label="next"
            onClick={() =>
              setDuration((prev: number) =>
                prev > minVal ? prev - minVal : prev
              )
            }
            className={classes.iconSm}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Box>
  );
};
