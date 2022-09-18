import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import auth0Client from "../../Auth";
import TaskCardList from "./TaskCardList";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import BugReportIcon from "@material-ui/icons/BugReport";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import CategoryFormInTasks from "../Projects/CategoryFormInTasks";
import SecurityIcon from "@material-ui/icons/Security";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  glassPaper: {
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: "20px"
  },
  cardBody: {
    padding: "10px 3px 10px 3px"
  },
  formControl: {
    minWidth: 350,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
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

const Tasks = ({ match }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [addTaskToCategory, setAddTaskToCategory] = useState(0);
  const [selectedChip, setSelectedChip] = useState([]);
  const [chipData, setChipData] = useState([]);
  const fetchTags = async () => {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/tag", {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
    setChipData(res.data);
  };

  const handleChange = event => {
    setSelectedChip(event.target.value);
  };

  const handleAddTaks = idCategory => {
    if (idCategory === addTaskToCategory) {
      setAddTaskToCategory(0);
    } else {
      setAddTaskToCategory(idCategory);
    }
  };

  const [taskToAdd, setTaskToAdd] = useState({
    idProject: 1,
    contenu: "",
    priority: 0,
    difficulty: 0,
    idCategory: 1,
    tags: [],
    idUser: auth0Client.isAuthenticated()
      ? JSON.stringify(auth0Client.getProfile())
      : null
  });

  const handleTaskChange = (event, key) => {
    setTaskToAdd({ ...taskToAdd, [key]: event.target.value });
  };

  useEffect(() => {
    setSelectedProject(match.params.idProject);
    fetchCategories(selectedProject);
    fetchTags();
  }, [match.params.idProject, selectedProject]);

  const addNewTask = async idCategory => {
    await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/task/category/" + idCategory,
      {
        idProject: match.params.idProject,
        contenu: taskToAdd.contenu,
        priority: taskToAdd.priority,
        difficulty: taskToAdd.difficulty,
        tags: taskToAdd.tags && JSON.stringify(taskToAdd.tags),
        idCategory: idCategory,
        idUser: auth0Client.isAuthenticated()
          ? JSON.stringify(auth0Client.getProfile())
          : null
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    fetchCategories(selectedProject);
  };

  const fetchCategories = async idProject => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/category/project/" + idProject
    );
    setCategories(res.data);
  };

  const maxPosition = categories => {
    var obj = categories.map(row => row.position);
    var arr = Object.keys(obj).map(function(key) {
      return obj[key];
    });
    var max = Math.max.apply(null, arr);
    return max;
  };

  return (
    <div
      style={{ width: "3000px", height: "80vh" }}
      className="rellax"
      data-rellax-speed="7"
    >
      <Grid container>
        {categories.map(category => (
          <GridItem xs={12} sm={12} md={2} key={category.id}>
            <Card className={classes.glassPaper}>
              <CardContent className={classes.cardBody}>
                <Grid container justify="center" alignItems="flex-start">
                  <GridItem xs={12} sm={12} md={9}>
                    <h5>{category.title}</h5>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button onClick={() => handleAddTaks(category.id)}>
                      <AddCircleOutlineIcon />
                    </Button>
                  </GridItem>
                </Grid>
                {addTaskToCategory === category.id && (
                  <Grid container justify="center" alignItems="flex-start">
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="contenu"
                        label="contenu"
                        fullWidth
                        onChange={event => {
                          handleTaskChange(event, "contenu");
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        margin="dense"
                        id="priority"
                        label="priority"
                        onChange={event => {
                          handleTaskChange(event, "priority");
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        margin="dense"
                        id="difficulty"
                        label="difficulty"
                        onChange={event => {
                          handleTaskChange(event, "difficulty");
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        margin="dense"
                        id="urgence"
                        label="urgence"
                        onChange={event => {
                          handleTaskChange(event, "urgence");
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-mutiple-checkbox-label">
                            Tags
                          </InputLabel>
                          <Select
                            id="demo-mutiple-checkbox"
                            multiple
                            value={selectedChip}
                            onChange={event => {
                              handleTaskChange(event, "tags");
                              handleChange(event);
                            }}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                              <div className={classes.chips}>
                                {selected.map(value => (
                                  <Chip
                                    size="small"
                                    key={value.id}
                                    label={value.contenu}
                                    className={classes.chip}
                                    color="primary"
                                    style={{ backgroundColor: value.color }}
                                    icon={
                                      (value.icon === "AddIcon" && (
                                        <AddIcon />
                                      )) ||
                                      (value.icon ===
                                        "SentimentVerySatisfiedIcon" && (
                                        <SentimentVerySatisfiedIcon />
                                      )) ||
                                      (value.icon ===
                                        "SentimentVeryDissatisfiedIcon" && (
                                        <SentimentVeryDissatisfiedIcon />
                                      )) ||
                                      (value.icon === "FiberNewIcon" && (
                                        <FiberNewIcon />
                                      )) ||
                                      (value.icon === "BuildIcon" && (
                                        <BuildIcon />
                                      )) ||
                                      (value.icon === "SettingsIcon" && (
                                        <SettingsIcon />
                                      )) ||
                                      (value.icon === "BugReportIcon" && (
                                        <BugReportIcon />
                                      )) ||
                                      (value.icon === "SecurityIcon" && (
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
                                  key={data.id}
                                  value={data}
                                  style={getStyles(
                                    data.contenu,
                                    selectedChip.map(data => data.contenu),
                                    theme
                                  )}
                                >
                                  <Checkbox
                                    checked={
                                      selectedChip
                                        .map(data => data.contenu)
                                        .indexOf(data.contenu) > -1
                                    }
                                  />
                                  <Chip
                                    size="small"
                                    key={data.contenu}
                                    label={data.contenu}
                                    className={classes.chip}
                                    color="primary"
                                    style={{ backgroundColor: data.color }}
                                    icon={
                                      (data.icon === "AddIcon" && (
                                        <AddIcon />
                                      )) ||
                                      (data.icon ===
                                        "SentimentVerySatisfiedIcon" && (
                                        <SentimentVerySatisfiedIcon />
                                      )) ||
                                      (data.icon ===
                                        "SentimentVeryDissatisfiedIcon" && (
                                        <SentimentVeryDissatisfiedIcon />
                                      )) ||
                                      (data.icon === "FiberNewIcon" && (
                                        <FiberNewIcon />
                                      )) ||
                                      (data.icon === "BuildIcon" && (
                                        <BuildIcon />
                                      )) ||
                                      (data.icon === "SettingsIcon" && (
                                        <SettingsIcon />
                                      )) ||
                                      (data.icon === "BugReportIcon" && (
                                        <BugReportIcon />
                                      )) ||
                                      (data.icon === "SecurityIcon" && (
                                        <SecurityIcon />
                                      ))
                                    }
                                  />
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Button
                        onClick={() => addNewTask(category.id)}
                        style={{ margin: "30px" }}
                      >
                        <AddCircleOutlineIcon /> Add
                      </Button>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                      <Divider />
                    </GridItem>
                  </Grid>
                )}
                <TaskCardList
                  category={category}
                  fetchCategories={() => fetchCategories(selectedProject)}
                />
              </CardContent>
            </Card>
          </GridItem>
        ))}
        <CategoryFormInTasks
          idProject={match.params.idProject}
          fetchCategories={() => fetchCategories(selectedProject)}
          maxPosistion={maxPosition(categories)}
        />
      </Grid>
    </div>
  );
};

export default Tasks;
