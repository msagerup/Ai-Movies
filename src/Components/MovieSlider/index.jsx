import React from 'react';
import Slider from 'react-slick';

const MovieSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <h3>Movie  1</h3>
      </div>
      <div>
        <h3>Movie  2</h3>
      </div>
    
    </Slider>
  );
};

export default MovieSlider;
