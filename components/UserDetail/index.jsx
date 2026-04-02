import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import api from '../../lib/api';

import './styles.css';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.get(`/user/${userId}`)
      .then((response) => {
        if (!isMounted) return;
        setUser(response.data || null);
      })
      .catch(() => {
        if (!isMounted) return;
        setUser(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="userdetail-loading">
        <CircularProgress size={28} />
      </div>
    );
  }

  if (!user) {
    return (
      <Typography variant="body1">
        No user found.
      </Typography>
    );
  }

  return (
    <Box className="userdetail-root">
      <Typography variant="h5" className="userdetail-name">
        {user.first_name} {user.last_name}
      </Typography>
      <Divider className="userdetail-divider" />
      <Typography variant="body1">
        <strong>Location:</strong> {user.location || '—'}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {user.occupation || '—'}
      </Typography>
      <Typography variant="body1" className="userdetail-description">
        <strong>Description:</strong> {user.description || '—'}
      </Typography>
      <Button
        className="userdetail-photos-button"
        variant="contained"
        component={RouterLink}
        to={`/users/${user._id}/photos`}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;
