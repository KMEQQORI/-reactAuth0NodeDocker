import React, { useState, useEffect } from "react";
import auth0Client from "Auth";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function EditProject({ open, close, project, fetchProjects }) {
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
    setTitle(project.title);
    setDescription(project.Description);
  }, [project]);

  const editProject = async id => {
    await axios.put(
      process.env.REACT_APP_API_BASE_URL + "/project/" + id,
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
    close();
    fetchProjects();
  };
  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };
  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit project</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="title"
            value={title}
            type="text"
            onChange={event => handleTitleChange(event)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            value={Description}
            type="text"
            onChange={event => handleDescriptionChange(event)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={() => editProject(project.id)} color="primary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
