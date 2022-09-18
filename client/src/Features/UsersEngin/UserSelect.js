import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import auth0Client from "Auth";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

export default function SimpleSelect({
  title,
  selectedUser,
  setSelectedUser,
  width = "250px"
}) {
  const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: "100%"
    },
    avatarClass: {
      display: "inline",
      marginRight: "30px"
    },
    selected: {
      width: "100%",
      margin: "0px",
      padding: "0px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    selectedPrint: {
      width: "90%",
      margin: "0 30px 0 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    selectInput: {
      width: "100%"
    }
  }));

  const classes = useStyles();
  const [users, setUsers] = React.useState([]);

  const handlechange = (event, value) => {
    setSelectedUser(value);
  };

  const resetUser = () => {
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    const existingUsers = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/user/",
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setUsers(existingUsers.data);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <FormControl className={classes.formControl}>
        {selectedUser === null ? (
          <Autocomplete
            onChange={handlechange}
            options={users}
            getOptionLabel={() => "test"}
            renderOption={option => (
              <MenuItem
                value={JSON.stringify(option)}
                key={option.nick_name}
                className={classes.selected}
              >
                <Avatar className={classes.avatarClass} src={option.picture} />
                {option.given_name} {option.family_name}
              </MenuItem>
            )}
            renderInput={params => (
              <TextField
                {...params}
                className={classes.selectInput}
                label={title}
                variant="outlined"
                fullWidth
                value="hello"
              />
            )}
          />
        ) : (
          <div className={classes.selectedPrint}>
            <Avatar
              className={classes.avatarClass}
              src={selectedUser.picture}
            />
            <p>
              {selectedUser.given_name} {selectedUser.family_name}
            </p>
            <CloseIcon onClick={() => resetUser()} />
          </div>
        )}
      </FormControl>
    </div>
  );
}
