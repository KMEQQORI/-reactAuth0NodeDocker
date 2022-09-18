import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import auth0Client from "Auth";
import axios from "axios";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import contributionApi from "clientApi/contributionApi.js";

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  glassPaper: {
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: "20px"
  },
  textField: {
    width: "100%"
  },
  field: {
    minHeight: "155px !important"
  },
  tableRow: {
    padding: "5px 0px"
  },
  selectedPrint: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  avatarClass: {
    display: "inline",
    marginRight: "30px"
  },
  detailsTitle: {
    margin: "30px"
  }
});

export default function CategoriesTable({ rows, fetchAllData }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [idEditMode, setEditMode] = useState(0);

  const classes = useStyles();

  const EditContribution = async id => {
    await contributionApi.EditContribution(id, type, amount);
    setAmount("");
    setType("");
    await fetchAllData();
    setEditMode(0);
  };

  const deleteCategory = async id => {
    await contributionApi.deleteCategory(id);
    fetchAllData();
  };
  const handleEditMode = row => {
    setType(row.type);
    setAmount(row.amount);
    setEditMode(row.id);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" color="textSecondary" className={classes.margin}>
        transactions Details :
      </Typography>
      {rows &&
        rows.map(row => (
          <div key={row.id}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.tableRow}
            >
              {idEditMode === row.id ? (
                <>
                  <GridItem xs={5} sm={5} md={3}>
                    <div className={classes.selectedPrint}>
                      <Avatar
                        className={classes.avatarClass}
                        src={JSON.parse(row.idUser).picture}
                      />
                      <p>
                        {JSON.parse(row.idUser).given_name}{" "}
                        {JSON.parse(row.idUser).family_name}
                      </p>
                    </div>
                  </GridItem>
                  <GridItem xs={5} sm={5} md={5}>
                    <TextField
                      id="type"
                      className={classes.textField}
                      label="type"
                      value={type}
                      onChange={event => handleTypeChange(event)}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={2}>
                    <TextField
                      id="Amount"
                      className={classes.textField}
                      label="Amount"
                      value={amount}
                      onChange={event => handleAmountChange(event)}
                    />
                  </GridItem>
                  <GridItem xs={2} sm={2} md={1}>
                    <Button onClick={() => EditContribution(row.id)}>
                      <CreateIcon />
                    </Button>
                  </GridItem>
                  <GridItem xs={2} sm={2} md={1}>
                    <Button onClick={() => setEditMode(0)}>
                      <CloseIcon />
                    </Button>
                  </GridItem>
                </>
              ) : (
                <>
                  <GridItem xs={5} sm={5} md={3}>
                    <div className={classes.selectedPrint}>
                      <Avatar
                        className={classes.avatarClass}
                        src={JSON.parse(row.idUser).picture}
                      />
                      <p>
                        {JSON.parse(row.idUser).given_name}{" "}
                        {JSON.parse(row.idUser).family_name}
                      </p>
                    </div>
                  </GridItem>
                  <GridItem xs={5} sm={5} md={5}>
                    <span className={classes.field}>{row.type}</span>
                  </GridItem>
                  <GridItem xs={3} sm={3} md={2}>
                    {row.amount}
                  </GridItem>
                  <GridItem xs={2} sm={2} md={1}>
                    <Button onClick={() => handleEditMode(row)}>
                      <CreateIcon />
                    </Button>
                  </GridItem>
                  <GridItem xs={2} sm={2} md={1}>
                    <Button onClick={() => deleteCategory(row.id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </GridItem>
                </>
              )}
            </Grid>
            <Divider />
          </div>
        ))}
    </>
  );
}
