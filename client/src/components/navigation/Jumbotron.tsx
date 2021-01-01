import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "../../utils/Link";
import { Grid, Button, Typography, Hidden, Grow } from "@material-ui/core";
import { Jumbotron as JumbotronType } from "../../logic/types";
import { PATHS } from "../../constants/data";
import { toolbarHeight } from "./styles";
const { home } = PATHS;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -1,
      backgroundColor: "#000", // backgroundImage imported as a component in Layout.tsx
      backgroundImage:
        "url(https://solarsystem.nasa.gov/system/resources/detail_files/2159_PIA19377_hires.jpg)",
      boxShadow: "0px 2px 4px -1px rgba(0,0, 0.2)",
    },
    content: {
      marginTop: `${toolbarHeight}px`,
      position: "absolute",
      color: "#fff",
      height: `calc(100vh - ${toolbarHeight}px)`,
    },
  })
);

export const Jumbotron = ({
  img,
  title = "Hello",
  subtitle = "Welcome",
  actions = [],
  onClick,
}: JumbotronType) => {
  const classes = useStyles();

  return (
    <>
      {/* Background image */}
      <div className={classes.img} />

      {/* Main content */}
      <Grow timeout={2000} in={true}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Grid
            item
            xs={12}
            md={6}
            container
            alignItems="center"
            direction="column"
          >
            <Typography variant="h2">{title}</Typography>
            <Typography variant="h4" gutterBottom>
              {subtitle}
            </Typography>

            <Grid item container justify="center" spacing={2}>
              {actions &&
                actions.map((action, i) => (
                  <Grid item key={`item-${i}`}>
                    <Link to={`${action.path}?next=${home}`}>
                      <Button
                        key={`button-${i}`}
                        variant="contained"
                        color="primary"
                      >
                        {action.name}
                      </Button>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Hidden smDown>
            <Grid item md={6}></Grid>
          </Hidden>
        </Grid>
      </Grow>
    </>
  );
};
