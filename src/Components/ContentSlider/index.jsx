import React from 'react';
import Slider from 'react-slick';
import MovieActorsTab from '../../Pages/MoviePage/Components/MovieInfo/Components/MovieActorsTab';
import MovieSuggestionTab from '../../Pages/MoviePage/Components/MovieInfo/Components/MovieSuggestionTab';

const ContentSlider = ({ content, type }) => {
  // if content does not have image, remove it from the array
  const filteredMovieContent = content.filter((item) => item.poster_path !== null);
  const filteredActorContent = content.filter((item) => item.profile_path !== null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8.5,
    slidesToScroll: 4,
    lazyLoad: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1185,
        settings: {
          slidesToShow: 6.5,
          slidesToScroll: 2.5,
          
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.6,
          slidesToScroll: 2.4,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1.5,
         
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1.5,
        },
      },
    ],

  };
  return (
    <Slider {...settings}>
      {type === 'movies' 
        ? filteredMovieContent.map((movie) => (
          <MovieSuggestionTab key={movie.id} movie={movie} />
        )) 
        : filteredActorContent.map((actor) => (
          <MovieActorsTab key={actor.id} actor={actor} />
        ))}

    </Slider>
  );
};

export default ContentSlider;
