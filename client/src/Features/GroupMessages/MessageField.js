import React, { useEffect, useState } from "react";
import auth0Client from "Auth";
import { makeStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import messageApi from "clientApi/messageApi";

var styles = {
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  glassPaper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inStyle: { margin: 8, width: "100%" }
};

const useStyles = makeStyles(styles);

export default function MessageTab({ fetchSelectedMessage, project }) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  useEffect(() => {}, []);

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const addNewMessage = async () => {
    await messageApi.addNewMessage(message, project.id);
    setMessage("");
    fetchSelectedMessage();
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={auth0Client.getProfile().picture} />
      </ListItemAvatar>
      <Input
        className={classes.inStyle}
        placeholder="Insert your comment here"
        value={message}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={addNewMessage}>
              <SendIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
      />
    </ListItem>
  );
}
