import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import HomeIcon from "@material-ui/icons/Home";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import auth0Client from "Auth";
import MessageIcon from "@material-ui/icons/Message";
import Drawer from "@material-ui/core/Drawer";
const useStyles = makeStyles({
  sideBar: {
    width: "45px",
    height: "100vh",
    position: "fixed",
    left: "0px",
    top: "0px",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  sideBarButton: {
    padding: "0px",
    paddingLeft: "5px",
    margin: "15px 0 15px 0",
    width: "35px"
  },
  icons: { fontSize: "30px", color: "rgba(255,255,255,0.8)" }
});

const handleLogout = () => {
  auth0Client.signOut();
};

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const toggleDrawer = (side, open) => event => {
    if (auth0Client.isAuthenticated()) {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
    }
  };
  return (
    <div className={classes.sideBar}>
      <List>
        <Link to="/home">
          <ListItem button className={classes.sideBarButton}>
            <ListItemIcon>
              <HomeIcon className={classes.icons} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <br />
        <br />
        <br />
        <Divider />
        <Link to="/profile">
          <ListItem className={classes.sideBarButton}>
            <ListItemIcon>
              <AccountBoxIcon className={classes.icons} />
            </ListItemIcon>
          </ListItem>
        </Link>

        <Divider />
        <Link to="/project">
          <ListItem className={classes.sideBarButton}>
            <ListItemIcon>
              <AssignmentIcon className={classes.icons} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/planning">
          <ListItem className={classes.sideBarButton}>
            <ListItemIcon>
              <CalendarTodayIcon className={classes.icons} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/message">
          <ListItem className={classes.sideBarButton}>
            <ListItemIcon>
              <InboxIcon className={classes.icons} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Divider />
        <ListItem
          className={classes.sideBarButton}
          onClick={toggleDrawer("bottom", true)}
        >
          <ListItemIcon>
            <MessageIcon className={classes.icons} />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <Link to="/budget">
          <ListItem className={classes.sideBarButton}>
            <ListItemIcon>
              <EuroSymbolIcon className={classes.icons} />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Divider />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ListItem
          button
          className={classes.sideBarButton}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <ExitToAppIcon className={classes.icons} />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
}
