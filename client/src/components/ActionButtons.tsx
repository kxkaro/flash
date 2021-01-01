import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
// import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
// import SaveAltIcon from '@material-ui/icons/SaveAlt';
// import ShareIcon from '@material-ui/icons/ShareIcon';
import { Mode, User } from "../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toRight: {
      marginLeft: "auto !important",
    },
  })
);

interface Props {
  user: User;
  mode: Mode;
  // comments: Array<object>,
  // likes: Array<object>,
  handleExpandClick: any;
  expanded: boolean;
}

export const ActionButtons = ({
  user,
  mode,
  // comments,
  // likes,
  handleExpandClick,
  expanded,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <IconButton className={classes.toRight} aria-label="add to favorites">
        {/* <Typography variant="caption">{likes.length}</Typography> */}
        <ModeCommentOutlinedIcon
          color={mode === "light" ? "primary" : undefined}
        />
      </IconButton>
      {/* <IconButton aria-label="share">
                <SaveAltIcon />
            </IconButton> */}
      {/* <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ModeCommentOutlinedIcon />
                <Typography variant="caption">{comments.length}</Typography>
            </IconButton> */}
    </>
  );
};
