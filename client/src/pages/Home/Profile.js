import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import auth from "../../components/auth/auth-helper";
import { findUserProfile } from "../../utils/api-user";
import DeleteUser from "../../components/DeleteUser";

function Profile() {
  const [user, setUser] = useState({});

  const userId = (userId) => {
    const jwt = auth.isAuthenticated();
    findUserProfile(
      {
        userId: userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser(data);
      }
    });
  };

  return (
    <Paper elevation={4}>
      <Typography type="title">Profile</Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />{" "}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
      </List>
    </Paper>
  );
}

export default Profile;