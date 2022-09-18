import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import auth0Client from "Auth";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";

const styles = theme => {
  return {
    [theme.breakpoints.down("sm")]: {
      cardTitle: {
        marginTop: "30",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      },
      bigAvatar: {
        margin: "auto",
        width: 200,
        height: 200
      },
      glassPaper: {
        backgroundColor: "rgba(255,255,255,0.8)",
        marginBottom: "20px",
        textAlign: "center"
      },
      textField: {
        width: "100%"
      }
    },
    [theme.breakpoints.up("md")]: {
      cardTitle: {
        marginTop: "30px",
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
      textField: {
        width: "100%"
      }
    }
  };
};

const useStyles = makeStyles(styles);

export default function ChangeBackground() {
  const classes = useStyles(styles);
  const [url, setUrl] = useState("");

  const changeBackground = () => {
    localStorage.setItem("backgroundUrl", url);
    window.location.reload();
  };

  const getBackgroundUrl = () => {
    return localStorage.getItem("backgroundUrl") || "default Background";
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };
  return (
    auth0Client.isAuthenticated() && (
      <div>
        <Card className={classes.glassPaper}>
          <CardContent className={classes.cardBody}>
            <Grid container justify="center" alignItems="flex-start">
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  className={classes.textField}
                  label="New Background Url"
                  value={url}
                  onChange={event => handleUrlChange(event)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Button onClick={() => changeBackground()}>
                  <AddCircleOutlineIcon />
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <h5>{getBackgroundUrl()}</h5>
              </GridItem>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  );
}
