import React from 'react';

import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useGetActorByIdQuery } from '../../../../Redux/Services/TMDB';
import Loader from '../../../../Components/Loader/Loader';
import ActorInfo from './Actor.jsx';

const Actors = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetActorByIdQuery(id);

  if (isFetching) {
    return <Loader size="4rem" display="flex" position="center" />;
  }

  if (error) {
    <Typography>Could not load data. Something went wrong, please try again or try again later.</Typography>;  
  }

  return (
    <ActorInfo data={data} />
  );
};

export default Actors;
