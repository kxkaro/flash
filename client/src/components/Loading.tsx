import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "5%",
      fontSize: "10em",
      color: theme.palette.primary.light,
    },
    loadingTop: {
      width: "100%",
      paddingTop: "2.5em",
    },
  })
);

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export const Empty = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <i className="optin monster icon" />
      <Typography variant="h5">Oops... Nothing found.</Typography>
    </div>
  );
};

export const LinearBuffer = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = React.useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.loadingTop}>
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        color="secondary"
      />
    </div>
  );
};

export const LinearBufferFullScreen = () => {
  const style = { height: "100vh", width: "100%" };

  return (
    <Grid item container alignItems="center" style={style}>
      <LinearBuffer />
    </Grid>
  );
};

export const LoadingFullScreen = () => {
  const style = { minHeight: "100vh", width: "100%" };

  return (
    <Grid item container alignItems="center" justify="center" style={style}>
      <Loading />
    </Grid>
  );
};
