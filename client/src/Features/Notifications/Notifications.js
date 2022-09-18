import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import auth0Client from "../../Auth";
import { useSnackbar } from 'notistack';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles({
    icons: { fontSize: "30px", color: "rgba(255,255,255,0.8)" }
});
function Notifications() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [notifications, setNotifications] = useState([]);
    const toObject = stringTags => {
        return "[" + stringTags + "]";
    };

    const fetchNotifications = async () => {
        const res = await axios.get(
            process.env.REACT_APP_API_BASE_URL + "/notification"
        );
        let finalData = [];
        for (var i = 0; i < res.data.length; i++) {
            const objIdUsersToNotify = JSON.parse(toObject(res.data[i].isUsersToNotify));
            let result = objIdUsersToNotify.find(user => user.nickname === (auth0Client.isAuthenticated() ? auth0Client.getProfile().nickname : null));
            let newList = "";

            for (var j = 0; j < objIdUsersToNotify.length; j++) {

                if (objIdUsersToNotify[j].nickname != (auth0Client.isAuthenticated() ? auth0Client.getProfile().nickname : null)) {
                    if (newList != "") {
                        newList = newList + "," + JSON.stringify(objIdUsersToNotify[j]);
                    } else {
                        newList = JSON.stringify(objIdUsersToNotify[j]);
                    }

                }
            }
            if (result != null) {
                finalData.push(res.data[i]);
                await axios.put(
                    process.env.REACT_APP_API_BASE_URL + "/notification/" + res.data[i].id,
                    {
                        isUsersToNotify: newList,
                    }
                );
            }
        }
        setNotifications(finalData);
        if (finalData.length > 0) {
            console.log("recv notification");
            handleClick();
        }
    };

    const showUsers = users => {
        const objIdUsersTransmitter = JSON.parse(toObject(users));
        let usersNameInString = "";
        var len = objIdUsersTransmitter.length - 2;
        for (var i = 0; i < objIdUsersTransmitter.length; i++) {
            if (i == 2) {
                usersNameInString = usersNameInString + "et " + len + " autres personnes ";
                break;
            }
            usersNameInString = usersNameInString + objIdUsersTransmitter[i].name + ", ";
        }
        return usersNameInString;
    };

    const handleClick = () => {
        let users = "";
        notifications.map(notifs => (
            users = showUsers(notifs.idUsersTransmitter),
            enqueueSnackbar(
                users + "" +
                notifs.message
            ),
            users = ""
        ))
    };

    const handleClickVariant = variant => () => {
        enqueueSnackbar('This is a success message!', { variant });
    };
    useEffect(() => {
        fetchNotifications();
    }, [notifications]);

    return (
        <React.Fragment>

            {/* <Badge onClick={handleClick} color="secondary" badgeContent={100} invisible={false}>
                <NotificationsIcon className={classes.icons} />
            </Badge> */}
        </React.Fragment>
    );
}

export default Notifications;
