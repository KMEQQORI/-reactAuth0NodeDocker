import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth0Client from "Auth";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ProjectForm from "./ProjectForm";
import CategoryForm from "./CategoryForm";
import CategoriesTable from "./CategoriesTable";
import EditProject from "./editProject";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MessageTab from "Features/GroupMessages/MessageTab";

import GridItem from "components/Grid/GridItem.js";
import TagFrom from "../Tags/TagForm.js";

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
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: "20px"
  },
  tagForms: {
    marginTop: "50px"
  }
};

const useStyles = makeStyles(styles);

const Projects = porps => {
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editProject, setEditedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClose = () => {
    setEditedProject(null);
    setOpen(false);
  };
  const handleClickOpen = async project => {
    setOpen(true);
    setEditedProject(project);
  };
  const fetchSelectedProject = async id => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/project/" + id,
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setSelectedProject(res.data);
  };

  const deleteProject = async id => {
    await axios.delete(process.env.REACT_APP_API_BASE_URL + "/project/" + id, {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
    setSelectedProject(null);
    fetchProjects();
  };

  const fetchProjects = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/project",
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setProjects(res.data);
  };

  return (
    <>
      <Grid container>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.glassPaper}>
            <CardContent>
              <h5>add a new project</h5>
              <ProjectForm fetchProjects={fetchProjects} />
              {projects === [] && (
                <div>
                  <br />
                  <h5>please add a new project</h5>
                </div>
              )}
              <br />
              <br />
              <h5>please select a project</h5>
              <List component="nav" aria-label="main mailbox folders">
                {projects &&
                  projects.map(project => (
                    <ListItem key={project.id}>
                      <ListItemIcon>
                        <InboxIcon
                          onClick={() => setSelectedProject(project)}
                        />
                      </ListItemIcon>

                      <ListItemText primary={project.title} />

                      <ListItemSecondaryAction
                        onClick={() => handleClickOpen(project)}
                      >
                        <EditIcon edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
          <Card className={(classes.glassPaper, classes.tagForms)}>
            <CardContent>
              <Grid container justify="center" alignItems="center">
                <GridItem xs={12} sm={12} md={12}>
                  <h5>Tags</h5>
                </GridItem>
              </Grid>

              <TagFrom />
            </CardContent>
          </Card>
        </GridItem>
        {selectedProject && (
          <>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes.glassPaper}>
                <CardContent>
                  <Grid container justify="center" alignItems="center">
                    <GridItem xs={12} sm={12} md={8}>
                      <h5>project Name : {selectedProject.title}</h5>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                      <Button onClick={() => deleteProject(selectedProject.id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1} />
                    <GridItem xs={12} sm={12} md={2}>
                      <Link to={"/task/" + selectedProject.id}>
                        <Button>
                          tickets
                          <ExpandMoreIcon />
                        </Button>
                      </Link>
                    </GridItem>
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    <GridItem xs={12} sm={12} md={8}>
                      <h6>Desription : {selectedProject.Description}</h6>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}></GridItem>
                  </Grid>
                  <Divider />
                  <h5 className={classes.cardTitle}>Categories :</h5>
                  <CategoryForm
                    idProject={selectedProject.id}
                    fetchSelectedProject={fetchSelectedProject}
                  />
                  <CategoriesTable
                    projectId={selectedProject.id}
                    rows={selectedProject.categories}
                    fetchSelectedProject={fetchSelectedProject}
                  />
                </CardContent>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <MessageTab project={selectedProject} />
            </GridItem>
          </>
        )}
      </Grid>
      {editProject && (
        <EditProject
          open={open}
          close={handleClose}
          project={editProject}
          fetchProjects={fetchProjects}
        />
      )}
    </>
  );
};

export default Projects;
