import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "../../utils/Link";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  // Hidden,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DarkModeSwitch from "../DarkModeSwitch";
import { DrawerVariant, Mode, User } from "../../logic/types";
import { drawerWidth, toolbarHeight } from "./styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
      minHeight: `${toolbarHeight}px !important`,
      justifyContent: "flex-end",
    },
  })
);

interface Props {
  user: User;
  mode: Mode;
  setMode: any;
  appId: string;
  setAppId: any;
  open: boolean;
  toggleDrawer: any;
  variant?: DrawerVariant;
}

// This component can be either temporary or persistent. By default temporary. use prop 'variant' to change to "persistent"
const MenuDrawer = ({
  user,
  variant = "temporary",
  mode,
  setMode,
  appId,
  setAppId,
  open,
  toggleDrawer,
}: Props) => {
  const classes = useStyles();
  const MENU_ITEMS = [
    {
      name: "test",
      path: "/",
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant={variant}
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        {MENU_ITEMS.map((item: { name: string; path: string }, i: number) => (
          <Link key={i} to={item.path} onClick={toggleDrawer(false)}>
            <ListItem button>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />
      <DarkModeSwitch mode={mode} setMode={setMode} />
    </Drawer>
  );
};

export default MenuDrawer;
