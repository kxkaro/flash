import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { withPush } from "../utils/routingDecorators";
import { Link } from "../utils/Link";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FlashLayout from "../layouts/Flash";
import { TitleLogoBar } from "../layouts/Header";
import { Mode, User } from "../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { 
      height: "90vh" 
    },
    padding: { 
      padding: "0 .5em" 
    },
  })
);

interface Props {
  user: User;
  mode: Mode;
  setMode: any;
  getData: any;
}
const Landing = ({ user, mode, setMode }: Props) => {
  const classes = useStyles();

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  const items = {
    "solar-system": "Solar System",
    "need-for-speed": "Need For Speed",
  };

  const captions = [
    "Data collected manually",
    "Solar System:",
    "- https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
    "Need For Speed:",
    "- https://vgsales.fandom.com/wiki/Need_for_Speed",
    "- https://en.wikipedia.org/wiki/Need_for_Speed)",
    "Contact me via kxkaro@gmail.com",
  ];

  return (
    <FlashLayout
      user={user}
      mode="dark"
      setMode={setMode}
      appId=""
      bgIndex={0}
      header={
        // TODO: Replace the title component with standard Typography variants, not vh size
        <TitleLogoBar
          play={false}
          appId="DEFAULT"
          title="_KX_FLASH"
          titleShort="_KX_FLASH"
          subtitle={`On ${yesterday.toLocaleDateString()}, Have a great day`}
          subtitleShort={`On ${yesterday.toLocaleDateString()}, Yo`}
        />
      }
    >
      <Grid
        container
        alignItems="flex-end"
        justify="center"
        className={classes.container}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className={classes.padding}
        >
          <List component="nav" aria-label="select app">
            {Object.entries(items).map(([key, name], i) => (
              <Link key={i} to={`/${i + 1}/${key}`}>
                <ListItem button>
                  <ListItemText primary={name} />

                  <ListItemSecondaryAction>
                    <IconButton
                      color="inherit"
                      edge="end"
                      aria-label="comments"
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>

        <Grid item container xs={12}>
          <Grid item xs={12} md={5}>
            {captions.map((caption, i) => (
              <Typography
                key={i}
                variant="caption"
                component="p"
                gutterBottom
                style={{ paddingLeft: "2em", color: "rgba(255, 255, 255, .6)" }}
              >
                {caption}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </FlashLayout>
  );
};

export default withPush(Landing);
