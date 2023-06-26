import React, { useEffect, useState } from 'react';

import { 
  // Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  Rating,
  Grow,
  useMediaQuery, 
  Container,
  CardMedia,
} from '@mui/material';

import Modal from '@mui/material/Modal';
import {
  Movie as MovieIcon,
  Theaters,
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
import { useTheme } from '@emotion/react';
import genreIcons from '../../../../assets/genres';
import { useGetMovieDetailsQuery, useGetListQuery } from '../../../../Redux/Services/TMDB';
import Loader from '../../../../Components/Loader/Loader';
import useStyles from './styles';
import { minToHoursAndMin } from '../../../../helpers/convert';
import { setgenreIdOrCategoryName } from '../../../../Redux/Features/currentGenreIdOrCategory';
import MovieList from '../MovieList';
import YouTubePlayer from '../../../../Components/YouTubePlayer';
import UseVideoRatio from '../../../../hooks/UseVideoRatio';
import { userSelector } from '../../../../Redux/Features/auth';
import FeaturedMovie from '../MovieHero';

const MovieInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetMovieDetailsQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playerWidth, playerHeight } = UseVideoRatio();
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const lessThanLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    return <Loader size="4rem" display="flex" position="center" />;
  }

  if (error) {
    return <Typography>Could not load data. Something went wrong, please try again or try again later.</Typography>;
  }

  return (
    <Container disableGutters={lessThanLg}>
   
      <Grid container className={classes.container}>
        {!lessThanLg ? (
          <>
            <Grid 
              item
              sm={12}
              lg={6} 
              md={6}
            >
         
              <img
                className={classes.poster}
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                alt={data?.title}
              />  
            </Grid>
            <MovieCompDetails
              data={data} 
              addToFavorites={addToFavorites}
              addToWatchlist={addToWatchlist}
              isMovieFavorited={isMovieFavorited}
              isMovieWatchlisted={isMovieWatchlisted}
              setIsModalOpen={setIsModalOpen}
            />
          </>
        ) : (
          <p>temp fpr featured movie comp</p>
        //           <FeaturedMovie
        //             movie={data}
        //             override={(
        //               <MovieCompDetails
        //                 data={data} 
        //                 addToFavorites={addToFavorites}
        //                 addToWatchlist={addToWatchlist}
        //                 isMovieFavorited={isMovieFavorited}
        //                 isMovieWatchlisted={isMovieWatchlisted}
        //                 setIsModalOpen={setIsModalOpen}
        //               />
        // )}
        //           />
        ) }
        
        {/*  */}
      
        <Box marginTop="5rem" width="100%">
          <Typography variant="h4" gutterBottom align="center">
            You might also like
          </Typography>
          {data?.similar?.results.length > 0
            ? <MovieList movies={data.similar.results} />
            : <h2>No similar movies found</h2>}
        </Box>
        {data?.videos?.results?.length > 0 && (
        <Modal
        // fullWidth
          closeAfterTransition
          className={classes.modal}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <YouTubePlayer 
            videoId={data.videos.results[0].key}
            playerHeight={playerHeight}
            playerWidth={playerWidth}
          />
    
        </Modal>
        )}
      </Grid>
    </Container>
  );
};
export default MovieInfo;

const MovieCompDetails = ({ data,
  addToFavorites,
  addToWatchlist,
  isMovieFavorited,
  isMovieWatchlisted,
  setIsModalOpen,
}) => { 
  const dispatch = useDispatch();
  const classes = useStyles();

  const reviews = data?.reviews?.results;

  return (
    <Grid item container direction="column" lg={6}>
      <Typography variant="h3" align="center" gutterBottom>
        {data?.title} ({data?.release_date?.slice(0, 4)})
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        {data?.tagline} 
      </Typography>
      <Grid item container className={classes.container}>
        <Box display="flex" align="center" alignItems="centre">
          <Rating readOnly value={data?.vote_average / 2} precision={0.2} />
          <Typography 
            variant="subtitle1"
            gutterBottom 
            style={{ marginLeft: '10px' }}
          > 
            {data?.vote_average.toFixed(1)} / 10 ({data?.vote_count} votes)
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            style={{ marginRight: '10px' }}
            variant="h6"
            align="center"
            gutterBottom
          >
            {minToHoursAndMin(data?.runtime)}
          </Typography>
          <Typography 
            variant="subtitle1"
            align="center"
            gutterBottom
          >
            {data.spoken_languages.length > 0
              ? ` | ${data?.spoken_languages.map((lang) => lang.iso_639_1).join(', ')}` : ''} 
          </Typography>
        </Box>
           
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
        <Grid 
          item
          xs={12} 
          container
          direction="column-reverse"
          alignItems="center"
          style={{ marginTop: '2rem' }}
        >
       
          <Grid
            item 
            
          >
            <ButtonGroup size="small" variant="outlined">
              {data.videos.results.length > 0 && (
              <Button
                onClick={() => setIsModalOpen(true)}
                href="#"
                endIcon={<Theaters />}
              >
                Trailer
              </Button>
              )}
                  
              <Button 
                target="_blank" 
                rel="noopener noreferrer"
                href={`https://www.youtube.com/results?search_query=${data?.title}+${data?.release_date?.slice(0, 4)}+review`}
                endIcon={<Reviews />}
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
                 
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup size="small" variant="outlined">
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
       
        </Grid>
      </Grid>
      
    </Grid>

  );
};
