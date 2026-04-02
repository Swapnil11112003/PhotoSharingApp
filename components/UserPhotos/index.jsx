import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import api from '../../lib/api';

import './styles.css';

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    [],
  );
  const formatDateTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return formatter.format(date);
  };

  useEffect(() => {
    let isMounted = true;
    api.get(`/photosOfUser/${userId}`)
      .then((response) => {
        if (!isMounted) return;
        setPhotos(response.data || []);
      })
      .catch(() => {
        if (!isMounted) return;
        setPhotos([]);
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
      <div className="userphotos-loading">
        <CircularProgress size={28} />
      </div>
    );
  }

  return (
    <Box className="userphotos-root">
      <Typography variant="h6" className="userphotos-title">
        Photos
      </Typography>
      {photos.length === 0 ? (
        <Typography variant="body1">No photos found.</Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} className="userphotos-card">
            <CardMedia
              component="img"
              image={`/images/${photo.file_name}`}
              alt="User upload"
              className="userphotos-image"
            />
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {formatDateTime(photo.date_time)}
              </Typography>
              <Divider className="userphotos-divider" />
              <Typography variant="subtitle1" className="userphotos-comments-title">
                Comments
              </Typography>
              {photo.comments && photo.comments.length > 0 ? (
                <List dense className="userphotos-comments">
                  {photo.comments.map((comment) => (
                    <ListItem key={comment._id} alignItems="flex-start" disablePadding>
                      <ListItemText
                        primary={(
                          <span>
                            <Link
                              component={RouterLink}
                              to={`/users/${comment.user._id}`}
                              underline="hover"
                            >
                              {comment.user.first_name} {comment.user.last_name}
                            </Link>
                            {' • '}
                            <span className="userphotos-comment-date">
                              {formatDateTime(comment.date_time)}
                            </span>
                          </span>
                        )}
                        secondary={comment.comment}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default UserPhotos;
