import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import auth0Client from "../../Auth";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import UserSelect from "../UsersEngin/UserSelect";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import contributionApi from "clientApi/contributionApi.js";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%"
  },
  addButton: {
    width: "100%",
    marginTop: "20px"
  },
  glassPaper: {
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: "20px"
  },
  row: {
    marginTop: "20px",
    marginBottom: "20px",
    minWidth: "100%"
  },
  addRow: {
    marginTop: "20px",
    marginBottom: "20px",
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function ContributionForm({ fetchAllData }) {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const addNewContribution = async () => {
    await contributionApi.addNewContribution(selectedUser, type, amount);
    await fetchAllData();
    setSelectedUser(null);
    setAmount("");
    setType("");
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" color="textSecondary" className={classes.margin}>
        add a new Contribution :
      </Typography>
      <Grid container justify="center" alignItems="flex-end">
        <GridItem xs={12} sm={12} md={4}>
          <div className={classes.row}>
            <UserSelect
              title="Contributor"
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} md={4}>
          <div className={classes.row}>
            <TextField
              size="small"
              variant="outlined"
              className={classes.textField}
              label="Type"
              value={type}
              InputLabelProps={{
                shrink: true
              }}
              onChange={event => handleTypeChange(event)}
            />
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} md={3}>
          <div className={classes.addRow}>
            <TextField
              variant="outlined"
              size="small"
              className={classes.textField}
              label="Amount"
              value={amount}
              onChange={event => handleAmountChange(event)}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">euros</InputAdornment>
                )
              }}
            />
            <Button onClick={addNewContribution}>
              <AddCircleOutlineIcon /> Add
            </Button>
          </div>
        </GridItem>
      </Grid>
    </>
  );
}
