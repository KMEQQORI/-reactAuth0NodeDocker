import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import DetailsList from "./DetailsList";
import ContributionForm from "./ContributionForm";
import contributionApi from "clientApi/contributionApi.js";
import auth0Client from "Auth";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => {
  return {
    glassPaper: {
      padding: "20px",
      backgroundColor: "rgba(255,255,255,0.8)",
      marginBottom: "20px"
    },
    card: {
      margin: "10px",
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "80%"
    },
    content: {
      flex: "1 0 auto",
      width: "100%"
    },
    cover: {
      width: "100px"
    },
    fullHeight: {
      height: "95vh",
      overflowY: "scroll"
    }
  };
};

const useStyles = makeStyles(styles);

export default function CardHeaderTypes() {
  const [stats, setStats] = React.useState(null);
  const [contributions, setContributions] = React.useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const response = await contributionApi.getAllBudgetStats();
    setStats(response.data.stats);
    setContributions(response.data.contributions);
  };

  const statsCards = () => {
    return (
      stats &&
      stats.map(stat => (
        <Grid container justify="center" alignItems="center">
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="h5">
                  {JSON.parse(stat.idUser).given_name}{" "}
                  {JSON.parse(stat.idUser).family_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                  }).format(stat.totalAmount)}
                  ~~~~~~~~~~~~ {stat.percent} %
                </Typography>
              </CardContent>
              <LinearProgress variant="determinate" value={stat.percent} />
            </div>
            <CardMedia
              className={classes.cover}
              image={JSON.parse(stat.idUser).picture}
              title="Live from space album cover"
            />
          </Card>
        </Grid>
      ))
    );
  };

  return (
    auth0Client.isAuthenticated() && (
      <>
        <Grid container justify="flex-start">
          <GridItem xs={12} sm={12} md={4}>
            <div className={classes.glassPaper}>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.margin}
              >
                transactions Details :
              </Typography>
              {statsCards()}
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card className={classes.glassPaper}>
              <ContributionForm fetchAllData={fetchAllData} />
            </Card>
            <Card className={classes.glassPaper}>
              <DetailsList rows={contributions} fetchAllData={fetchAllData} />
            </Card>
          </GridItem>
        </Grid>
      </>
    )
  );
}
