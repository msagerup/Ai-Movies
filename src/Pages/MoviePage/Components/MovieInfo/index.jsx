import React, { useState } from 'react';

import { 
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  useMediaQuery,
  Rating,
  Grow,
} from '@mui/material';

import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  Reviews,
  YouTube, 
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import genreIcons from '../../../../assets/genres';
import { useGetMovieDetailsQuery } from '../../../../Redux/Services/TMDB';
import Loader from '../../../../Components/Loader/Loader';
import useStyles from './styles';
import { minToHoursAndMin } from '../../../../helpers/convert';
import { setgenreIdOrCategoryName } from '../../../../Redux/Features/currentGenreIdOrCategory';
 
const MovieInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetMovieDetailsQuery(id);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setisMovieWatchlisted] = useState(false);

  console.log(data, id, isFetching, error);

  if (isFetching) {
    return <Loader size="4rem" display="flex" position="center" />;
  }

  const addToFavorites = () => {

  };

  const addToWatchlist = () => {};
  return (
    <Grid container className={classes.container}>
      <Grid item sm={12} lg={4} className={classes.posterContainer}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data?.title}
        /> 
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date?.slice(0, 4)})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline} 
        </Typography>
        <Grid item container className={classes.container}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} precision={0.2} />
            <Typography 
              variant="subtitle1"
              gutterBottom 
              style={{ marginLeft: '10px' }}
            > 
              {data?.vote_average.toFixed(1)} / 10 ({data?.vote_count} votes)
            </Typography>
          </Box>
          <Typography 
            variant="h6"
            align="center"
            gutterBottom
          >
            {minToHoursAndMin(data?.runtime)} {data.spoken_languages.length > 0
              ? ` | ${data?.spoken_languages.map((lang) => lang.iso_639_1).join(', ')}` : ''} 
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, index) => (
            <Grow in key={index} timeout={(index + 1) * 250}>
              <Link
                key={genre.name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(setgenreIdOrCategoryName(genre.id))}
              >
                <img 
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Link>
            </Grow>
          )) }
        </Grid>
        <Typography variant="h5" style={{ marginTop: '10px' }} gutterBottom>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data?.credits?.cast?.slice(0, 6).map((actor) => (
            actor.profile_path && (
            <Grid
              item
              xs={4}
              md={2}
              key={actor.id}
              component={Link}
              to={`/actors/${actor.id}`}
              style={{ textDecoration: 'none' }}
            >
              <img 
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className={classes.castImage}
              />
              <Typography 
                color="textPrimary"
                variant="subtitle1" 
                align="center"
              >
                {actor.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle2" 
                align="center"
              >
                {actor.character.split('/')[0]}
              </Typography>
            </Grid>
            )
          ))}
        </Grid>
        <Grid 
          item
          container 
          style={{ marginTop: '2rem' }}
        >
          <div className={classes.buttonsContainer}>
            <Grid
              item 
              xs={12}
              sm={6} 
              className={classes.buttonsContainer}
            >
              <ButtonGroup size="small" variant="outlined">
                <Button 
                  target="_blank" 
                  rel="noopener noreferrer"
                  href={`https://www.youtube.com/results?search_query=${data?.title}+${data?.release_date?.slice(0, 4)}+review`}
                  endIcon={<YouTube />}
                >
                  Reviews
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`} 
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={isMovieFavorited ? (
                    <FavoriteBorderOutlined />
                  ) 
                    : <Favorite />}
                >
                  {
                  isMovieFavorited 
                    ? 'Unfavorite' 
                    : 'Favorite'
                  }
                </Button>
                <Button
                  onClick={addToWatchlist} 
                  endIcon={isMovieWatchlisted 
                    ? (
                      <Remove />
                    ) 
                    : (
                      <PlusOne />
                    )}
                >
                  Watchlist
                </Button>
                <Button 
                  endIcon={<ArrowBack />} 
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography 
                    style={{ textDecoration: 'none' }} 
                    component={Link}
                    to="/" 
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {data?.similar?.results.length > 0 ? data.similar.results.slice(0, 6).map((movie) => (
          <h2>{movie.title}</h2>
        )) : <h2>No similar movies found</h2>}
          
      </Box>
    </Grid>
  );
};
export default MovieInfo;
