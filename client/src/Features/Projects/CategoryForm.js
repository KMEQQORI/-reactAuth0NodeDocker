import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import auth0Client from "../../Auth";
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
  },
  addButton: {
    width: "100%",
    marginTop: "20px"
  },
  glassPaper: {
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: "20px"
  }
}));

export default function CategoryForm({ idProject, fetchSelectedProject }) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");

  const addNewCategory = async () => {
    await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/category/project/" + idProject,
      {
        title,
        position
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setTitle("");
    setPosition("");
    fetchSelectedProject(idProject);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handlePositionChange = event => {
    setPosition(event.target.value);
  };

  return (
    <Grid container justify="center" alignItems="flex-end">
      <GridItem xs={12} sm={12} md={6}>
        <TextField
          className={classes.textField}
          label="Title"
          value={title}
          onChange={event => handleTitleChange(event)}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={3}>
        <TextField
          className={classes.textField}
          label="Position"
          value={position}
          onChange={event => handlePositionChange(event)}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={3}>
        <Button onClick={() => addNewCategory()}>
          <AddCircleOutlineIcon /> Add
        </Button>
      </GridItem>
    </Grid>
  );
}
