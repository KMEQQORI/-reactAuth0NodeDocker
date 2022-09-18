import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import TextField from "@material-ui/core/TextField";
import auth0Client from "../../Auth";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import { blue } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import BugReportIcon from "@material-ui/icons/BugReport";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SecurityIcon from "@material-ui/icons/Security";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";
import AddIcon from "@material-ui/icons/Add";
import UserSelect from "Features/UsersEngin/UserSelect";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 550,
    maxWidth: 300
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  choosenCategorie: {
    color: "red"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 30;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const toString = objectTags => {
  return objectTags.map(tag => JSON.stringify(tag));
};

const toObject = stringTags => {
  return stringTags.map(tag => JSON.parse(tag));
};

function TaskModalEdit(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { onClose, fetchCategories, task } = props;
  const [selectedUser, setSelectedUser] = React.useState(
    JSON.parse(task.idUser)
  );
  const [taskToEdit, setTaskToEdit] = useState(task);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedChip, setSelectedChip] = useState(
    toString(JSON.parse(taskToEdit.tags))
  );
  const [chipData, setChipData] = useState(null);

  const findMarks = async idProject => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/category/project/" + idProject
    );
    setAllCategories(res.data);
  };

  const fetchTags = async () => {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/tag", {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
    setChipData(toString(res.data));
  };

  const updateTask = async () => {
    await axios.put(
      process.env.REACT_APP_API_BASE_URL + "/task/" + taskToEdit.id,
      {
        contenu: taskToEdit.contenu,
        priority: taskToEdit.priority,
        idUser: JSON.stringify(selectedUser),
        difficulty: taskToEdit.difficulty,
        idCategory: taskToEdit.idCategory,
        urgence: taskToEdit.urgence,
        tags: JSON.stringify(toObject(selectedChip)),
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    onClose();
    fetchCategories(taskToEdit.idProject);
  };

  const handleTaskProgress = idCategory => {
    setTaskToEdit({ ...taskToEdit, idCategory });
  };

  const handleTaskChange = (event, key) => {
    setTaskToEdit({ ...taskToEdit, [key]: event.target.value });
  };

  const handleChange = event => {
    setSelectedChip(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    findMarks(task.idProject);
    fetchTags();
  }, [task.idProject]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={true}
    >
      <Grid container justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <DialogTitle id="simple-dialog-title">Assigned To :</DialogTitle>
          <UserSelect
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <DialogTitle id="simple-dialog-title">
            Edit Task Information
          </DialogTitle>
          <GridItem xs={12} sm={12} md={12}>
            <TextField
              autoFocus
              margin="dense"
              id="contenu"
              label="contenu"
              value={taskToEdit.contenu}
              fullWidth
              onChange={event => {
                handleTaskChange(event, "contenu");
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={12}>
            <TextField
              margin="dense"
              id="priority"
              label="priority"
              fullWidth
              value={taskToEdit.priority}
              onChange={event => {
                handleTaskChange(event, "priority");
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={12}>
            <TextField
              margin="dense"
              id="difficulty"
              label="difficulty"
              fullWidth
              value={taskToEdit.difficulty}
              onChange={event => {
                handleTaskChange(event, "difficulty");
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={12}>
            <TextField
              margin="dense"
              id="urgence"
              label="urgence"
              fullWidth
              value={taskToEdit.urgence}
              onChange={event => {
                handleTaskChange(event, "urgence");
              }}
            />
          </GridItem>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Grid container justify="center" alignItems="flex-start">
            <DialogTitle id="simple-dialog-title">Task Progress</DialogTitle>
            <GridItem xs={12} sm={12} md={10}>
              <List
                component="nav"
                className={classes.root}
                aria-label="mailbox folders"
              >
                {allCategories.map(category => {
                  return (
                    <React.Fragment key={category.id}>
                      <ListItem
                        button
                        className={
                          category.id === taskToEdit.idCategory
                            ? classes.choosenCategorie
                            : ""
                        }
                        onClick={() => handleTaskProgress(category.id)}
                        key={category.id}
                      >
                        <ListItemText
                          primary={category.title}
                          style={{ textAlign: "center" }}
                          key={category.id + "1"}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <br />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">
              Add More Tags
            </InputLabel>
            <Select
              id="demo-mutiple-checkbox"
              multiple
              value={selectedChip}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip
                      size="small"
                      key={JSON.parse(value).id}
                      label={JSON.parse(value).contenu}
                      className={classes.chip}
                      color="primary"
                      style={{ backgroundColor: JSON.parse(value).color }}
                      icon={
                        (JSON.parse(value).icon === "AddIcon" && <AddIcon />) ||
                        (JSON.parse(value).icon ===
                          "SentimentVerySatisfiedIcon" && (
                          <SentimentVerySatisfiedIcon />
                        )) ||
                        (JSON.parse(value).icon ===
                          "SentimentVeryDissatisfiedIcon" && (
                          <SentimentVeryDissatisfiedIcon />
                        )) ||
                        (JSON.parse(value).icon === "FiberNewIcon" && (
                          <FiberNewIcon />
                        )) ||
                        (JSON.parse(value).icon === "BuildIcon" && (
                          <BuildIcon />
                        )) ||
                        (JSON.parse(value).icon === "SettingsIcon" && (
                          <SettingsIcon />
                        )) ||
                        (JSON.parse(value).icon === "BugReportIcon" && (
                          <BugReportIcon />
                        )) ||
                        (JSON.parse(value).icon === "SecurityIcon" && (
                          <SecurityIcon />
                        ))
                      }
                    />
                  ))}
                  <br></br>
                </div>
              )}
              MenuProps={MenuProps}
            >
              {chipData &&
                chipData.map(data => (
                  <MenuItem
                    key={JSON.parse(data).id}
                    value={data}
                    style={getStyles(
                      JSON.parse(data).contenu,
                      selectedChip.map(data => JSON.parse(data).contenu),
                      theme
                    )}
                  >
                    <Checkbox
                      checked={
                        selectedChip
                          .map(data => JSON.parse(data).contenu)
                          .indexOf(JSON.parse(data).contenu) > -1
                      }
                    />
                    <Chip
                      size="small"
                      key={JSON.parse(data).contenu}
                      label={JSON.parse(data).contenu}
                      className={classes.chip}
                      color="primary"
                      style={{ backgroundColor: JSON.parse(data).color }}
                      icon={
                        (JSON.parse(data).icon === "AddIcon" && <AddIcon />) ||
                        (JSON.parse(data).icon ===
                          "SentimentVerySatisfiedIcon" && (
                          <SentimentVerySatisfiedIcon />
                        )) ||
                        (JSON.parse(data).icon ===
                          "SentimentVeryDissatisfiedIcon" && (
                          <SentimentVeryDissatisfiedIcon />
                        )) ||
                        (JSON.parse(data).icon === "FiberNewIcon" && (
                          <FiberNewIcon />
                        )) ||
                        (JSON.parse(data).icon === "BuildIcon" && (
                          <BuildIcon />
                        )) ||
                        (JSON.parse(data).icon === "SettingsIcon" && (
                          <SettingsIcon />
                        )) ||
                        (JSON.parse(data).icon === "BugReportIcon" && (
                          <BugReportIcon />
                        )) ||
                        (JSON.parse(data).icon === "SecurityIcon" && (
                          <SecurityIcon />
                        ))
                      }
                    />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Button onClick={() => updateTask()} style={{ margin: "30px" }}>
            <AddCircleOutlineIcon /> Update
          </Button>
        </GridItem>
      </Grid>
      <Divider />
    </Dialog>
  );
}

export default TaskModalEdit;
