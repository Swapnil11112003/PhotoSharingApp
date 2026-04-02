import React, { useEffect, useMemo, useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useMatch, useParams } from 'react-router-dom';
import api from '../../lib/api';

import './styles.css';

function TopBar() {
  const usersMatch = useMatch('/users');
  const userDetailMatch = useMatch('/users/:userId');
  const userPhotosMatch = useMatch('/users/:userId/photos');
  const { userId } = useParams();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (!userId) {
      if (isMounted) {
        setUserName('');
      }
      return () => {
        isMounted = false;
      };
    }
    api.get(`/user/${userId}`)
      .then((response) => {
        if (!isMounted) return;
        const user = response.data;
        setUserName(user ? `${user.first_name} ${user.last_name}` : '');
      })
      .catch(() => {
        if (!isMounted) return;
        setUserName('');
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const rightText = useMemo(() => {
    if (userPhotosMatch) return userName ? `Photos of ${userName}` : 'Photos';
    if (userDetailMatch) return userName || 'User Details';
    if (usersMatch) return 'Users';
    return 'Home';
  }, [userPhotosMatch, userDetailMatch, usersMatch, userName]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h6" color="inherit">
          Swapnil Singh
        </Typography>
        <Box className="topbar-spacer" />
        <Typography variant="subtitle1" color="inherit">
          {rightText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
