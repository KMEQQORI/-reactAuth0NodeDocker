import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MessageField from "./MessageField";
import Moment from "react-moment";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto"
  },
  inline: {
    display: "inline"
  }
}));

export default function MessageList({
  messages,
  fetchSelectedMessage,
  project
}) {
  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        {messages.map(message => (
          <React.Fragment key={message.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  src={message.idUser && JSON.parse(message.idUser).picture}
                />
              </ListItemAvatar>
              <ListItemText
                primary={message.contenu}
                secondary={
                  <>
                    {JSON.parse(message.idUser).given_name} .
                    <Moment
                      date={message.createdAt}
                      fromNow
                      style={{ fontSize: "10px", padding: "0" }}
                    />
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <MessageField
        fetchSelectedMessage={fetchSelectedMessage}
        project={project}
      />
    </>
  );
}
