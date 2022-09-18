import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import auth0Client from "Auth";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%"
  }
}));

export default function ProjectForm({ fetchProjects }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const addNewProject = async () => {
    await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/project",
      {
        title,
        Description
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setTitle("");
    setDescription("");
    fetchProjects();
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  return (
    <Grid container justify="center" alignItems="flex-end">
      <GridItem xs={12} sm={12} md={12}>
        <TextField
          className={classes.textField}
          label="title"
          margin="normal"
          value={title}
          onChange={event => handleTitleChange(event)}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={9}>
        <TextField
          className={classes.textField}
          label="Description"
          margin="normal"
          value={Description}
          onChange={event => handleDescriptionChange(event)}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={3}>
        <Button onClick={() => addNewProject()}>
          <AddCircleOutlineIcon /> Add
        </Button>
      </GridItem>
    </Grid>
  );
}
