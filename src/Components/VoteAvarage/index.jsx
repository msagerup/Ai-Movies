
import React from 'react';

const VoteAvarage = ({ movieDetails }) => {
  const { vote_average: voteAvarage, vote_count: voteCount } = movieDetails;
    
  return (
    <>
      {voteAvarage && voteAvarage.toFixed(1)} / 10 (from {voteCount && voteCount} votes)
    </>
  );
};

export default VoteAvarage;
