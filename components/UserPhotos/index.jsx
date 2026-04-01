import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import './styles.css';

function UserPhotos() {
  return (
    <Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. 
      Should obtain the userId from the route using React Router (e.g., useParams()),
      and 
      fetch the model for the user from API: /photosOfUser/:id
    </Typography>
  );
}

UserPhotos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPhotos;
