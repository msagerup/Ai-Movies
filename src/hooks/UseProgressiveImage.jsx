import { useState, useEffect } from 'react';

const useProgressiveImage = (filePath, mode) => {
  const [currentSrc, setCurrentSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === 'backdrop' && filePath) {
      const baseUrlHighRes = 'https://image.tmdb.org/t/p/original/';
      const baseUrlLowRes = 'https://image.tmdb.org/t/p/w300/';

      const highResURL = `${baseUrlHighRes}${filePath}`;
      const lowResURL = `${baseUrlLowRes}${filePath}`;

      setCurrentSrc(lowResURL);
     
      const imageToLoad = new Image();
      imageToLoad.src = highResURL;
      imageToLoad.onload = () => {
        setCurrentSrc(highResURL);
        setLoading(false); // Set loading to false after image loads
      };
    }
  }, [filePath, mode]);

  return { currentSrc, loading };
};

export default useProgressiveImage;

// Image size:

// "images": {
//     "base_url": "http://image.tmdb.org/t/p/",
//     "secure_base_url": "https://image.tmdb.org/t/p/",
//     "backdrop_sizes": [
//       "w300",
//       "w780",
//       "w1280",
//       "original"
//     ],
//     "logo_sizes": [
//       "w45",
//       "w92",
//       "w154",
//       "w185",
//       "w300",
//       "w500",
//       "original"
//     ],
//     "poster_sizes": [
//       "w92",
//       "w154",
//       "w185",
//       "w342",
//       "w500",
//       "w780",
//       "original"
//     ],
//     "profile_sizes": [
//       "w45",
//       "w185",
//       "h632",
//       "original"
//     ],
//     "still_sizes": [
//       "w92",
//       "w185",
//       "w300",
//       "original"
//     ]
//   },
