import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import ChangeBackground from "./ChangeBackground";
import UserSelect from "Features/UsersEngin/UserSelect";
import auth0Client from "Auth";

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
      }
    }
  };
};

const useStyles = makeStyles(styles);

export default function CardHeaderTypes() {
  const [selectedUser, setSelectedUser] = React.useState(null);

  const classes = useStyles();
  return (
    auth0Client.isAuthenticated() && (
      <div>
        <Grid container justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes.glassPaper}>
              <CardContent>
                <Grid container justify="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <Avatar
                      alt="Remy Sharp"
                      src={auth0Client.getProfile().picture}
                      className={classes.bigAvatar}
                    />
                  </GridItem>
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <h3 className={classes.cardTitle}>
                      First Name : {auth0Client.getProfile().given_name}
                    </h3>
                    <h3 className={classes.cardTitle}>
                      nickname : {auth0Client.getProfile().nickname}
                    </h3>
                    <h3 className={classes.cardTitle}>
                      exp : {auth0Client.getProfile().exp}
                    </h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <h3 className={classes.cardTitle}>
                      Last Name : {auth0Client.getProfile().family_name}
                    </h3>
                    <h3 className={classes.cardTitle}>
                      updated_at: {auth0Client.getProfile().updated_atz}
                    </h3>
                  </GridItem>
                </Grid>
                {console.log(auth0Client.getProfile())}
              </CardContent>
            </Card>
            <ChangeBackground />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <UserSelect
              title="assigne To"
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </GridItem>
        </Grid>
      </div>
    )
  );
}
