import { Box, Typography } from '@mui/material';

import React from 'react';
import { styled } from 'styled-components';
import useStyles from './styles';

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

const Reviews = ({ reviews }) => {
  console.log('reviews', reviews);
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
    <Box className={classes.reviewContainer}>
      <QCard style={colorVariables}>
        <Typography 
        
          variant="h5"
          sx={{
     
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,
            overflow: 'hidden',
          }}
        
        >
          {reviews?.results?.length > 0 && reviews.results[0].content}
        </Typography>
        <Author style={colorVariables}>
          {reviews?.results?.length > 0 && reviews.results[0].author}
        </Author>
      </QCard>
    </Box>
  );
};

export default Reviews;
