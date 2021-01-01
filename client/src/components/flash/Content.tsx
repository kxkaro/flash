import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { animations } from "../../styles/animations";
import { Grid, Box } from "@material-ui/core";
import { Tile } from "./Tile";
import { Value } from "../../logic/types";
import { Transitions } from "./Transitions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      zIndex: 10,
      width: "98%",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      opacity: 0,
      transform: "translateY(2em)",
      backgroundColor: "rgba(255, 255, 255, .87)",
      "&$tiles": {
        height: "15vh",
        borderRadius: "2px 2px 0 0",
        animation: `$no-transform 2s 2s cubic-bezier(0, .5, 0, 1) forwards`,
      },
      "&$charts": {
        height: "55vh",
        marginTop: ".5vh",
        borderRadius: "0 0 2px 2px",
        animation: `$no-transform 2s 3s cubic-bezier(0, .5, 0, 1) forwards`,
      },
    },
    tiles: {},
    charts: {},
    ...animations,
  })
);

interface Props {
  init?: boolean;
  name: string;
  tileData?: Value;
  components: Array<any>;
  index: number;
}

export const Content = ({
  init = true,
  name,
  tileData,
  components,
  index,
}: Props) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} sm={6} md={4}>
      <Box
        className={`${classes.card} ${classes.tiles} ${
          init ? classes.pauseAnim : undefined
        }`}
      >
        <Tile name={name} data={tileData} />
      </Box>

      <Box
        className={`${classes.card} ${classes.charts} ${
          init ? classes.pauseAnim : undefined
        }`}
      >
        <Transitions components={components} index={index} />
      </Box>
    </Grid>
  );
};
