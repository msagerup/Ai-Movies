import React from 'react';
import Slider from 'react-slick';
import MovieActorsTab from '../../Pages/MoviePage/Components/MovieInfo/Components/MovieActorsTab';

const ContentSlider = ({ content, type }) => {
  console.log('ContentSlider', content);

  // if content does not have image, remove it from the array
  const filteredContent = content.filter((item) => item.profile_path !== null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    lazyLoad: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
         
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],

  };
  return (
    <Slider {...settings}>

      {filteredContent.map((actor) => (
        <MovieActorsTab key={actor.id} actor={actor} />
      ))}

    </Slider>
  );
};

export default ContentSlider;
