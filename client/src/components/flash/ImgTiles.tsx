import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ImgTile from "./ImgTile";
import { Value } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topTitle: {
      fontSize: theme.fontSizes.quinary,
      fontWeight: "bold",
      paddingLeft: "1em",
      paddingTop: ".5vh",
      paddingBottom: "1vh",
      textTransform: "uppercase",
    },
  })
);

interface Props {
  title?: string;
  data: Array<Value>;
  variant?: "md" | "sm";
  topN?: number;
}

const ImgTiles = ({ title, variant = "md", data, topN = 3 }: Props) => {
  const classes = useStyles();

  return (
    <>
      {title && (
        <Typography
          gutterBottom
          color="textSecondary"
          className={classes.topTitle}
        >
          {title}
        </Typography>
      )}

      <Grid container>
        {data
          ?.filter((value, i) => i < topN)
          .map((value, i: number) => (
            <ImgTile
              variant={variant}
              key={`${value.name}-${i}`}
              i={i}
              value={value}
            />
          ))}
      </Grid>
    </>
  );
};

export default ImgTiles;
