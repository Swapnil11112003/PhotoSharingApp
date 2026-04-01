import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import './styles.css';

function UserDetail() {
  return (
    <Typography variant="body1">
      This should be the UserDetail view of the PhotoShare app. 
      Should obtain the userId from the route using React Router (e.g., useParams()),
      and 
      fetch the model for the user from API: /user/:userId

    </Typography>
  );
}



export default UserDetail;
