import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import MessageList from "./MessageList";
import auth0Client from "Auth";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "0px"
  },
  inline: {
    display: "inline"
  }
}));

export default function MessageTab({ project }) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetchSelectedMessage();
  }, []);

  const fetchSelectedMessage = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/message",
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setMessages(res.data);
  };

  return (
    <div>
      <Grid container justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.root}>
            <CardContent>
              <GridItem xs={12} sm={12} md={12}>
                <MessageList
                  messages={messages}
                  fetchSelectedMessage={fetchSelectedMessage}
                  project={project}
                />
              </GridItem>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}
