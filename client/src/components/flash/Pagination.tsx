import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "absolute",
      bottom: 0,
    },
    pagination: {
      fontSize: theme.fontSizes.quinary,
    },
    next: {
      fontSize: theme.fontSizes.quinary,
      padding: "0 1em",
      position: "relative",
      textTransform: "uppercase",
      "&::after": {
        content: "''",
        position: "absolute",
        width: "2.5em",
        borderBottom: `.1em solid ${theme.palette.secondary.main}`,
        left: ".9em",
        bottom: "2px",
        zIndex: 10,
      },
    },
  })
);

interface Props {
  currentInd?: number;
  maxInd?: number;
  next?: string;
}

const Pagination = ({ currentInd, maxInd, next }: Props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={5}></Grid>
      <Grid item container justify="center" xs={2}>
        <Typography color="primary" className={classes.pagination}>
          {currentInd && maxInd ? `${currentInd} / ${maxInd}` : ""}
        </Typography>
      </Grid>
      <Grid item container justify="flex-end" xs={5}>
        <Grid item>
          <Typography color="primary" className={classes.next} noWrap>
            {next ? `Next: ${next}` : ""}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Pagination;
