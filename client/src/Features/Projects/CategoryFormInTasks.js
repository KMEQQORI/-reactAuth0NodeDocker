import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import auth0Client from "../../Auth";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";

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

export default function CategoryFormInTasks({
  idProject,
  fetchCategories,
  maxPosistion
}) {
  let newPosition = maxPosistion + 1;
  const classes = useStyles(styles);
  const [title, setTitle] = useState("");

  const addNewCategory = async position => {
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
    fetchCategories();
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  return (
    <GridItem xs={12} sm={12} md={2}>
      <Card className={classes.glassPaper}>
        <CardContent className={classes.cardBody}>
          <Grid container justify="center" alignItems="flex-start">
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                className={classes.textField}
                label="New Category"
                value={title}
                onChange={event => handleTitleChange(event)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Button onClick={() => addNewCategory(newPosition)}>
                <AddCircleOutlineIcon />
              </Button>
            </GridItem>
          </Grid>
        </CardContent>
      </Card>
    </GridItem>
  );
}
