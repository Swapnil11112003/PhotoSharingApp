import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../../lib/api';

import './styles.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.get('/user/list')
      .then((response) => {
        if (!isMounted) return;
        setUsers(response.data || []);
      })
      .catch(() => {
        if (!isMounted) return;
        setUsers([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="userlist-root">
      <Typography variant="h6" className="userlist-title">
        Users
      </Typography>
      {loading ? (
        <div className="userlist-loading">
          <CircularProgress size={24} />
        </div>
      ) : (
        <List component="nav" dense>
          {users.length === 0 ? (
            <ListItem>
              <ListItemText primary="No users found." />
            </ListItem>
          ) : (
            users.map((user, index) => (
              <React.Fragment key={user._id}>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to={`/users/${user._id}`}>
                    <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                  </ListItemButton>
                </ListItem>
                {index < users.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      )}
    </div>
  );
}

export default UserList;
