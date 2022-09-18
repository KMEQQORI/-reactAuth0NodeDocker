import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TaskModalEdit from "./TaskModalEdit";
import CommentList from "./CommentList";
import Chip from "@material-ui/core/Chip";

//icons
import BugReportIcon from "@material-ui/icons/BugReport";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SecurityIcon from "@material-ui/icons/Security";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  card: { marginTop: "10px" },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function TaskCard({ task, fetchCategories }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    setUser(JSON.parse(task.idUser));
  }, [task.idUser]);

  return (
    <Card className={classes.card}>
      {open && (
        <TaskModalEdit
          task={task}
          onClose={() => setOpen(false)}
          fetchCategories={fetchCategories}
          open={true}
        />
      )}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={user && user.picture}></Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => setOpen(true)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={user && user.given_name + " " + user.family_name}
        subheader={
          <div>
            <Moment date={task.createdAt} fromNow />
            <br />
            {task.tags &&
              JSON.parse(task.tags).map(tag => (
                <Chip
                  size="small"
                  key={tag.id}
                  label={tag.contenu}
                  className={classes.chip}
                  color="primary" //toujours primary, et changer le style avec la bonne couleur
                  style={{ backgroundColor: tag.color }}
                  icon={
                    (tag.icon === "AddIcon" && <AddIcon />) ||
                    (tag.icon === "SentimentVerySatisfiedIcon" && (
                      <SentimentVerySatisfiedIcon />
                    )) ||
                    (tag.icon === "SentimentVeryDissatisfiedIcon" && (
                      <SentimentVeryDissatisfiedIcon />
                    )) ||
                    (tag.icon === "FiberNewIcon" && <FiberNewIcon />) ||
                    (tag.icon === "BuildIcon" && <BuildIcon />) ||
                    (tag.icon === "SettingsIcon" && <SettingsIcon />) ||
                    (tag.icon === "BugReportIcon" && <BugReportIcon />) ||
                    (tag.icon === "SecurityIcon" && <SecurityIcon />)
                  }
                />
              ))}
          </div>
        }
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="p">
          {task.contenu}
        </Typography>
        <br />
        <CommentList task={task} fetchCategories={fetchCategories} />
      </CardContent>
    </Card>
  );
}
