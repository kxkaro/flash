import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "../../utils/Link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HideOnScroll from "../../utils/HideOnScroll";
import { Mode, User } from "../../logic/types";
import { PATHS } from "../../constants/data";
import { toolbarHeight } from "./styles";
const { home } = PATHS;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  color?: "transparent" | "primary" | "secondary";
}

const NavBar = ({ user, name, handleDrawerOpen, color }: Props) => {
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar
        color={color ? color : "primary"}
        // position="absolute"
        // className={clsx(classes.appBar, {
        //     [classes.appBarShift]: open,
        // })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            // className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to={home}>
            <Typography variant="body1" noWrap>
              {name}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default NavBar;
