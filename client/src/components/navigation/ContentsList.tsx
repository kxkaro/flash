import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { HashLink } from "../../utils/Link";
import { List, ListItem, Typography } from "@material-ui/core";
import { Action } from "../../logic/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageNavList: {
      paddingTop: "0px !important",
      paddingBottom: "0px !important",
    },
  })
);

interface Props {
  items: Array<Action>;
}

// TODO: investigate why Link from router does not handle hashes #
const ContentsList = ({ items }: Props) => {
  const classes = useStyles();

  return (
    <List>
      {items.map((item, i) => (
        <HashLink key={`link-item-${i}`} to={item.path} smooth={true}>
          <ListItem key={`item-${i}`} className={classes.pageNavList} button>
            <Typography
              key={`item-text-${i}`}
              variant="body2"
              title={item.name}
              gutterBottom
              noWrap
            >
              {item.name}
            </Typography>
          </ListItem>
        </HashLink>
      ))}
    </List>
  );
};

export default ContentsList;
