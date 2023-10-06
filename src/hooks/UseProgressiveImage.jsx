import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

/* 
- "base_url": "http://image.tmdb.org/t/p/", "secure_base_url": "https://image.tmdb.org/t/p/"

- "backdrop_sizes": "w300", "w780", "w1280", "original"
- "logo_sizes": "w45", "w92", "w154", "w185", "w300", "w500", "original"
- "poster_sizes": "w92", "w154", "w185", "w342", "w500", "w780", "original"
- "profile_sizes": "w45", "w185", "h632", "original"
- "still_sizes": "w92", "w185", "w300", "original"
*/

const useProgressiveImage = ({ filePath, lowRes, highRes, type }) => {
  const [currentSrc, setCurrentSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (filePath === 'undefined') return;

    if (filePath.includes('localhost')) {
      console.log(filePath);
    }

    let highResImage = highRes;
    if (isMobile) {
      switch (type) {
        case 'backdrop':
          highResImage = 'w1280';
          break;
        case 'logo': 
          highResImage = 'w500';
          break;
        case 'poster':
          highResImage = 'w780';
          break;
        case 'profile':
          highResImage = 'h632';
          break;
        default:
          break;
      }
    }
    
    if (filePath) {
      const baseUrlHighRes = `https://image.tmdb.org/t/p/${highResImage}/`;
      const baseUrlLowRes = `https://image.tmdb.org/t/p/${lowRes}/`;

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
  }, [filePath]);

  if (!filePath) {
    return { currentSrc: '', loading: true };
  }

  return { currentSrc, loading };
};

export default useProgressiveImage;

