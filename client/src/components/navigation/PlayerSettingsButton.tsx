import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, IconButton, Tooltip } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SettingsIcon from "@material-ui/icons/Settings";
// import { PinIconFilled, PinIconOutlined } from '../icons/PinIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "rgba(255, 255, 255, .6)",
      "&:hover": {
        color: "rgba(255, 255, 255, .87)",
      },
    },
    pinIcon: {
      transform: "rotate(180deg)",
      "&$active": {
        color: theme.palette.secondary.main,
      },
    },
    active: {},
  })
);

interface Props {
  pin: boolean;
  setPin: any;
  handleSettingsOpen: any;
}

export const PlayerSettingsButton = ({
  pin,
  setPin,
  handleSettingsOpen,
}: Props) => {
  const classes = useStyles();

  return (
    <Box>
      {/* Pin to window */}
      <Tooltip title={!pin ? "Pin to window" : "Unpin from window"} arrow>
        <IconButton
          onClick={() => setPin((prev: boolean) => setPin(!prev))}
          className={classes.icon}
        >
          <LaunchIcon
            className={`${classes.pinIcon} ${pin ? classes.active : undefined}`}
          />
        </IconButton>
      </Tooltip>

      {/* Open settings */}
      {/* TODO: Add settings window */}
      <Tooltip title="Settings" arrow>
        <IconButton onClick={handleSettingsOpen} className={classes.icon}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
