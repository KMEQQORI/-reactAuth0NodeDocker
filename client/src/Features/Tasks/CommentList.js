import React, { useEffect, useState } from "react";
import auth0Client from "../../Auth";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Moment from "react-moment";
import CommentIcon from "@material-ui/icons/Comment";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  },

  button: {
    margin: theme.spacing(1)
  },
  card: { marginTop: "10px" },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

export default function CommentList({ task, fetchCategories }) {
  const classes = useStyles();
  const [Comment, setComment] = useState("");
  const [user, setUser] = React.useState(null);
  const [notification, setNotification] = useState([]);

  const addNewComment = async () => {
    await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/comment/task/" + task.id,
      {
        idTask: task.id,
        idUser: auth0Client.isAuthenticated() ? auth0Client.getProfile() : null,
        contenu: Comment,
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    setComment("");
    fetchCategories();
  };

  const fetchNotifications = async idTask => {
    const res = await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/notification/Task/" + idTask + "/"
    );
    setNotification(res.data);
  };

  const addNewNotif = async () => {
    await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/notification",
      {
        idUsersTransmitter: auth0Client.isAuthenticated()
          ? JSON.stringify(auth0Client.getProfile()) : null,
        idUsersReceiver: task.idUser + "," + JSON.stringify(auth0Client.getProfile()),
        isUsersToNotify: task.idUser,
        contentType: "Task",
        idContent: task.id,
        message: "à commenté une Task"
      }
    );
    fetchCategories();
    fetchNotifications(task.id);
  };
  const toObject = stringTags => {
    return "[" + stringTags + "]";
  };
  const updateNotif = async idNotification => {
    const objIdUsersTransmitter = JSON.parse(toObject(idNotification.idUsersTransmitter));
    const result = objIdUsersTransmitter.find(user => user.nickname === auth0Client.getProfile().nickname);
    if (result != null) {
      if (objIdUsersTransmitter.length > 1) {
        await axios.put(
          process.env.REACT_APP_API_BASE_URL + "/notification/" + idNotification.id,
          {
            message: "ont ajoutés plusieurs commentaires à une Task",
            isUsersToNotify: idNotification.idUsersReceiver,
          }
        );
      } else {
        await axios.put(
          process.env.REACT_APP_API_BASE_URL + "/notification/" + idNotification.id,
          {
            message: "à ajouté plusieurs commentaires à une Task",
            isUsersToNotify: idNotification.idUsersReceiver,
          }
        );
      }

    } else {
      await axios.put(
        process.env.REACT_APP_API_BASE_URL + "/notification/" + idNotification.id,
        {
          idUsersTransmitter: idNotification.idUsersTransmitter + "," + JSON.stringify(auth0Client.getProfile()),
          idUsersReceiver: idNotification.idUsersReceiver + "," + JSON.stringify(auth0Client.getProfile()),
          isUsersToNotify: idNotification.idUsersReceiver,
          message: "ont ajoutés des commentaires à une Task ici"
        }
      );
    }
    fetchNotifications(task.id);
  };

  const commentAndNotif = async () => {
    fetchNotifications();
    if (notification == []) {
      addNewNotif();
    } else {
      updateNotif(notification);
    }
    addNewComment();
    fetchNotifications();
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  useEffect(() => {
    setUser(JSON.parse(task.idUser));
    fetchNotifications(task.id);
  }, [task.idUser], [notification]);


  return (
    <div>
      <h6>comments :</h6>
      {task.comments &&
        task.comments.map(comment => (
          <div
            className={classes.root}
            style={{ padding: "5px 2px 5px 2px" }}
            key={comment.id}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    aria-label="recipe"
                    style={{ width: "25px", height: "25px" }}
                    className={classes.avatar}
                    src={comment.idUser && JSON.parse(comment.idUser).picture}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <>
                      {comment.contenu} .
                      <Moment
                        date={comment.createdAt}
                        fromNow
                        style={{ fontSize: "9px", padding: "0" }}
                      />
                    </>
                  }
                />
              </ListItem>
            </Grid>
          </div>
        ))}

      <ListItem
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Input
          style={{ margin: 8, width: "100%" }}
          placeholder="Insert your comment here"
          value={Comment || ""}
          onChange={event => handleCommentChange(event)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={commentAndNotif}
              >
                <CommentIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </ListItem>
    </div>
  );
}
