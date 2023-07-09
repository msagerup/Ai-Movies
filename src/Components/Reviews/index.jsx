import React, { useMemo, useState } from 'react';
import { Reviews as ReviewsIcon } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { styled } from 'styled-components';
import useStyles from './styles';
import VoteAvarage from '../VoteAvarage';
import { randomSingleFromArr } from '../../helpers/randomSingleFromArr';

const QCard = styled.blockquote`
margin: 0;
  --padding: 1rem;
  --qHeight: 3rem;
  padding: var(--padding);
  color: var(--text-color, black);
  font-weight: 600;
  background-color: rgb(33 29 30 / 35%);
  display: grid;
  gap: 1rem;
  background-image: radial-gradient( circle, var(--dot-color, rgb(0 0 0 / .125)) calc(25% - 1px), transparent 25% );
  background-size: 0.5rem 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0.5rem 0.5rem 2rem rgb(0 0 0 / .5);
  &::before {
    content: "";
    margin-left: calc(var(--padding) * -1);
    margin-top: calc(var(--padding) * -1);
    height: var(--qHeight);
    width: calc(var(--qHeight) * 1.1);
    background-image:
      radial-gradient(
        circle at bottom right,
        transparent calc(var(--qHeight) / 4 - 1px),
        var(--accent-color, black) calc(var(--qHeight) / 4) calc(var(--qHeight) / 2), 
        transparent calc(var(--qHeight) / 2 + 1px)
      ),
      linear-gradient(var(--accent-color, black), var(--accent-color, black));
    background-size: calc(var(--qHeight) / 2) calc(var(--qHeight) / 2);
    background-position: top left, bottom left;
    background-repeat: space no-repeat;
  }
`;

const Author = styled.div`
  color: var(--text-color-author, white);
  background-color: var(--accent-color, black);
  justify-self: end;
  font-size: 0.75em;  
  padding: 0.5em 1em;
  border-radius: 0.25rem;
  &::before {
    content: "- "
  }
`;

const Reviews = ({ movieDetails }) => {
  const randomReview = useMemo(
    () => randomSingleFromArr(movieDetails?.reviews?.results),
    [movieDetails?.reviews?.results],
  );

  const reviews = movieDetails.reviews?.results?.length > 0 ? randomReview : null;
  const [showFullReview, setShowFullReview] = useState(false);

  console.log('reviews', reviews);
  const tagline = movieDetails?.tagline;

  const classes = useStyles();

  const colorMapping = {
    'color-1': {
      accentColor: 'rgb(32, 32, 54)',
      bgColor: 'rgb(30, 145, 254)',
      dotColor: 'rgb(255, 255, 255, .35)',
      textColor: 'rgb(243, 243, 243)',
      textColorAuthor: 'rgb(243, 243, 243)',
    },
    'color-2': {
      accentColor: 'rgb(243, 243, 243)',
      bgColor: 'rgb(33, 29, 30)',
      dotColor: 'rgb(255, 255, 255, .125)',
      textColor: 'rgb(243, 243, 243)',
      textColorAuthor: 'rgb(33, 29, 30)',
    },
    'color-3': {
      accentColor: 'rgb(30, 145, 254)',
      bgColor: 'rgb(32, 32, 54)',
      dotColor: 'rgb(255, 255, 255, .125)',
      textColor: 'rgb(243, 243, 243)',
      textColorAuthor: 'rgb(243, 243, 243)',
    },
  };

  const colorVariables = {};
  const selectedColorSet = colorMapping['color-2'] || {};
  
  for (const key in selectedColorSet) {
    // Convert the key to kebab case and prepend '--'
    const cssVarName = `--${key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}`;
    colorVariables[cssVarName] = selectedColorSet[key];
  }
  return (
    <>
      <Grid marginTop={reviews ? 4 : 2} marginBottom={reviews ? 4 : 2}>
        <Box
          sx={{ 
            display: 'flex',
            gap: '5px',
            alignItems: reviews 
              ? 'flex-end' 
              : 'center',
          }}
        >
          <Typography
            variant="h5"
            className={classes.tagline}
          >
            {reviews && 'Reviews'} 
          </Typography>
          {reviews && <ReviewsIcon />}
        </Box>
      </Grid>

      <Box className={classes.reviewContainer}>
        <QCard style={colorVariables}>
          <Box
            sx={{
              cursor: reviews ? 'pointer' : 'default',
            }}
            onClick={() => setShowFullReview(!showFullReview)}
          >
            <Typography 
              variant="h5"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: showFullReview ? 'inherit' : 5,
                overflow: 'hidden',
              }}
            >
              {reviews ? reviews.content : tagline}
            </Typography>
          </Box>
          <Author style={colorVariables}>
            {reviews  
              ? reviews.author 
              : <VoteAvarage movieDetails={movieDetails} />}
          </Author>
        </QCard>
      </Box>
    </>
  );
};

export default Reviews;
