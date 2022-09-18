import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import auth0Client from "../../Auth";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import BugReportIcon from "@material-ui/icons/BugReport";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SecurityIcon from "@material-ui/icons/Security";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 80
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2
  }
}));

export default function TagFrom() {
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [contenu, setContent] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const addNewTag = async () => {
    await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/tag/",
      {
        contenu,
        color,
        icon
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setContent("");
    setColor("");
    setIcon("");
    fetchTags();
  };

  const handleContentChange = event => {
    setContent(event.target.value);
  };

  const handleColorChange = event => {
    setColor(event.target.value);
  };

  const handleIconChange = event => {
    setIcon(event.target.value);
  };

  const deleteTag = async chipToDelete => {
    await axios.delete(
      process.env.REACT_APP_API_BASE_URL + "/tag/" + chipToDelete.id,
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    fetchTags();
  };

  const fetchTags = async () => {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/tag", {
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
    setChipData(res.data);
  };


  return (
    <div>
      <Grid container justify="center" alignItems="flex-end">
        <GridItem xs={12} sm={12} md={4}>
          <TextField
            required
            className={classes.textField}
            label="Tag"
            value={contenu}
            onChange={event => handleContentChange(event)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <FormControl className={classes.formControl}>
            <Select
              label="couleurs"
              value={color}
              onChange={event => handleColorChange(event)}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={color} disabled>
                Colors
              </MenuItem>
              <MenuItem value={"#78909c"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#78909c" }}
                />{" "}
                Grey
              </MenuItem>
              <MenuItem value={"#8bc34a"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#8bc34a" }}
                />{" "}
                Light Green
              </MenuItem>
              <MenuItem value={"#009688"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#009688" }}
                />{" "}
                Teal
              </MenuItem>
              <MenuItem value={"#00bcd4"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#00bcd4" }}
                />{" "}
                Cyan
              </MenuItem>
              <MenuItem value={"#1976d2"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#1976d2" }}
                />{" "}
                Blue
              </MenuItem>
              <MenuItem value={"#ffc107"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#ffc107" }}
                />{" "}
                Amber
              </MenuItem>
              <MenuItem value={"#ff9800"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#ff9800" }}
                />{" "}
                Orange
              </MenuItem>
              <MenuItem value={"#795548"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#795548" }}
                />{" "}
                Brown
              </MenuItem>
              <MenuItem value={"#f50057"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#f50057" }}
                />{" "}
                Pink
              </MenuItem>
              <MenuItem value={"#ff1744"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#ff1744" }}
                />{" "}
                Red
              </MenuItem>
              <MenuItem value={"#651fff"}>
                <span
                  className={classes.color}
                  style={{ backgroundColor: "#651fff" }}
                />{" "}
                Deep Purple
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <FormControl className={classes.formControl}>
            <Select
              label="icons"
              value={icon}
              onChange={event => handleIconChange(event)}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={icon} disabled>
                Icons
              </MenuItem>
              <optgroup label="Default"></optgroup>
              <MenuItem value={"AddIcon"}>
                <AddIcon />
                Tag
              </MenuItem>
              <optgroup label="Sentiment"></optgroup>
              <MenuItem value={"SentimentVerySatisfiedIcon"}>
                <SentimentVerySatisfiedIcon />
                Satisfied
              </MenuItem>
              <MenuItem value={"SentimentVeryDissatisfiedIcon"}>
                <SentimentVeryDissatisfiedIcon />
                Dissatisfied{" "}
              </MenuItem>
              <optgroup label="Coworking"></optgroup>
              <MenuItem value={"FiberNewIcon"}>
                <FiberNewIcon />
                New
              </MenuItem>
              <MenuItem value={"BuildIcon"}>
                <BuildIcon />
                Upgrade
              </MenuItem>
              <MenuItem value={"SettingsIcon"}>
                <SettingsIcon />
                Setting
              </MenuItem>
              <MenuItem value={"BugReportIcon"}>
                <BugReportIcon />
                Bug Report
              </MenuItem>
              <MenuItem value={"SecurityIcon"}>
                <SecurityIcon />
                Security
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <Button onClick={() => addNewTag()}>
            <AddCircleOutlineIcon /> Add
          </Button>
        </GridItem>
      </Grid>
      <br></br>

      <div>
        {chipData &&
          chipData.map(data => {
            return (
              <Chip
                size="small"
                key={data.id}
                label={data.contenu}
                onDelete={() => deleteTag(data)}
                className={classes.chip}
                color="primary" //toujours primary, et changer le style avec la bonne couleur
                style={{ backgroundColor: data.color }}
                icon={
                  (data.icon === "AddIcon" && <AddIcon />) ||
                  (data.icon === "SentimentVerySatisfiedIcon" && (
                    <SentimentVerySatisfiedIcon />
                  )) ||
                  (data.icon === "SentimentVeryDissatisfiedIcon" && (
                    <SentimentVeryDissatisfiedIcon />
                  )) ||
                  (data.icon === "FiberNewIcon" && <FiberNewIcon />) ||
                  (data.icon === "BuildIcon" && <BuildIcon />) ||
                  (data.icon === "SettingsIcon" && <SettingsIcon />) ||
                  (data.icon === "BugReportIcon" && <BugReportIcon />) ||
                  (data.icon === "SecurityIcon" && <SecurityIcon />)
                }
              />
            );
          })}
      </div>
    </div>
  );
}
