import React from "react";
import { Img } from "react-image";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box, Tooltip } from "@material-ui/core";
import { Value } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imgContainer: {
      overflow: "hidden",
      maxWidth: "200px",
      maxHeight: "200px",
      width: "20vh",
      height: "20vh",
      marginLeft: "auto",
      marginRight: "auto",
    },
    img: {
      display: "block",
      objectFit: "cover",
      filter: "drop-shadow(1px 1px 3px rgba(0,0,0, .3))",
      transition: "transform .5s ease-out",
      width: "100%",
      height: "100%",
      "&:hover": {
        objectFit: "cover",
        transition: "transform 10s cubic-bezier(.06,.32,0,0)",
        transform: "scale(2)",
      },
    },
    md: {},
    sm: {},
    container: {
      height: "25vh",
      padding: "1em",
    },
    contentContainer: {
      padding: "0 .5em",
    },
    description: {
      height: "15vh",
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
    linkUnderlineAnim: {
      position: "relative",
      color: `${theme.palette.secondary.main}`,
      transition: "color .4s ease-out",
      fontWeight: "bold",
      marginBottom: ".5em",
      "&::after": {
        content: "''",
        borderRadius: "1em",
        borderTop: `.1em solid ${theme.palette.secondary.main}`,
        position: "absolute",
        right: "100%",
        bottom: "-.2em",
        left: 0,
        transition:
          "right .4s cubic-bezier(0, .5, 0, 1), border-color .4s ease-out",
      },
      "&:hover": {
        color: theme.palette.secondary.main,
      },
      "&:hover::after": {
        borderColor: theme.palette.secondary.main,
        animation: "$anchor-underline 2s cubic-bezier(0, .5, 0, 1) infinite",
      },
    },
    "@keyframes anchor-underline": {
      "0%, 10%": {
        left: "0%",
        right: "100%",
      },
      "40%, 60%": {
        left: "0%",
        right: "0%",
      },
      "90%, 100%": {
        left: "100%",
        right: "0%",
      },
    },
  })
);

interface Props {
  variant?: "sm" | "md";
  i: number;
  value: Value;
}

const ImgTile = ({ variant = "md", i, value }: Props) => {
  const classes = useStyles();
  const { name, description, img, link } = value;

  return (
    <Grid item xs={12} container className={classes.container}>
      <Grid item xs={4}>
        {img && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Box className={classes.imgContainer}>
              <Img
                alt={`${name}-${i}`}
                src={img.src}
                className={`${classes.img} ${
                  variant === "sm" ? classes.sm : classes.md
                }`}
              />
            </Box>
          </a>
        )}
      </Grid>

      <Grid item xs={8} className={classes.contentContainer}>
        <Tooltip title={`Go to ${link}`} arrow placement="top">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Typography
              gutterBottom
              component="span"
              className={classes.linkUnderlineAnim}
            >
              {name}
            </Typography>
          </a>
        </Tooltip>
        <Box className={classes.description}>
          <Typography color="primary" variant="caption" gutterBottom>
            {description}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImgTile;
