import React from "react";
// import { Img } from "react-image";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import HideOnScroll from "../../utils/HideOnScroll";
import { Mode, User } from "../../logic/types";
import { drawerWidth, toolbarHeight } from "./styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      minHeight: `${toolbarHeight}px !important`,
    },
  })
);

interface Props {
  user: User;
  name: string;
  mode: Mode;
  setMode: any;
  open: boolean;
  handleDrawerOpen: any;
  handleDrawerClose: any;
}

const FlashBar = ({
  user,
  name,
  mode,
  setMode,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}: Props) => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;

  return (
    <HideOnScroll>
      <AppBar
        color="transparent"
        // position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton> */}
          {/* <Link to={home}>
                        <Typography variant="body1" noWrap>
                            {name}
                        </Typography>
                    </Link> */}
          <Grid container>
            {/* <Grid container item xs={6} justify="center" alignItems="center"> */}
            {/* <Img src={logo} height="30px" /> */}
            {/* </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default FlashBar;
