import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import auth0Client from "../../Auth";
import axios from "axios";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  glassPaper: {
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: "20px"
  },
  textField: {
    width: "100%"
  },
  field: {
    minHeight: "155px !important"
  },
  tableRow: {
    padding: "10px 30px"
  }
});

export default function CategoriesTable({
  projectId,
  rows,
  fetchSelectedProject
}) {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [idEditMode, setEditMode] = useState(0);
  const classes = useStyles();

  const EditCategory = async id => {
    await axios.put(process.env.REACT_APP_API_BASE_URL + "/category/" + id, {
      title,
      position,
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
    setTitle("");
    setPosition("");
    fetchSelectedProject(projectId);

    setEditMode(0);
  };
  const deleteCategory = async id => {
    await axios.delete(process.env.REACT_APP_API_BASE_URL + "/category/" + id, {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
    fetchSelectedProject(projectId);
  };
  const handleEditMode = row => {
    setTitle(row.title);
    setPosition(row.position);
    setEditMode(row.id);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handlePositionChange = event => {
    setPosition(event.target.value);
  };

  return (
    <Paper className={(classes.root, classes.glassPaper)}>
      <div>
        {rows &&
          rows.map(row => (
            <div key={row.id}>
              <Grid
                container
                justify="center"
                alignItems="flex-end"
                className={classes.tableRow}
              >
                {idEditMode === row.id ? (
                  <>
                    <GridItem xs={5} sm={5} md={5}>
                      <TextField
                        id="title"
                        className={classes.textField}
                        label="title"
                        value={title}
                        onChange={event => handleTitleChange(event)}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <TextField
                        id="title"
                        className={classes.textField}
                        label="position"
                        value={position}
                        onChange={event => handlePositionChange(event)}
                      />
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                      <Button onClick={() => EditCategory(row.id)}>
                        <CreateIcon />
                      </Button>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                      <Button onClick={() => setEditMode(0)}>
                        <CloseIcon />
                      </Button>
                    </GridItem>
                  </>
                ) : (
                  <>
                    <GridItem xs={5} sm={5} md={5}>
                      <span className={classes.field}>{row.title}</span>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {row.position}
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                      <Button onClick={() => handleEditMode(row)}>
                        <CreateIcon />
                      </Button>
                    </GridItem>
                    <GridItem xs={2} sm={2} md={2}>
                      <Button onClick={() => deleteCategory(row.id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </GridItem>
                  </>
                )}
              </Grid>
              <Divider />
            </div>
          ))}
      </div>
    </Paper>
  );
}
