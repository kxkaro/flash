import React from "react";
import { Img } from "react-image";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  GridList,
  GridListTile,
} from "@material-ui/core";
import { PlayerInput } from "./PlayerInput";
import { images } from "../../layouts/images";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      cursor: "pointer",
      padding: "2px",
      borderRadius: "2px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
      "&$selected": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    selected: {},
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      width: "150px",
      height: "100px",
    },
    gridList: {
      width: 150,
      height: 60,
    },
  })
);
interface Props {
  appId: string;
  openSettings: any;
  handleSettingsClose: any;
  duration: number;
  setDuration: any;
  bgIndex: number;
  setBgIndex: any;
}

export const SettingsDialog = ({
  appId,
  openSettings,
  handleSettingsClose,
  duration,
  setDuration,
  bgIndex,
  setBgIndex,
}: Props) => {
  const classes = useStyles();
  // TODO:
  const imgArr =
    appId === "solar-system" ? images["solar-system"] : images["solar-system"];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openSettings}
      onClose={handleSettingsClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Settings</DialogTitle>

      <DialogContent>
        {/* Background image */}
        <DialogContentText>Change background</DialogContentText>

        <div className={classes.root}>
          <GridList cellHeight={25} className={classes.gridList} cols={3}>
            {imgArr.map((img, i) => (
              <GridListTile key={i} cols={1}>
                <Img
                  onClick={() => setBgIndex(i)}
                  src={img.min}
                  alt={img.min}
                  className={`${classes.img} ${
                    i === bgIndex ? classes.selected : undefined
                  }`}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>

        {/* Slide duration */}
        <PlayerInput
          duration={duration}
          setDuration={setDuration}
          fullWidth={true}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSettingsClose} color="primary" autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
