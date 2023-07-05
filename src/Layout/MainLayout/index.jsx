import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import NavBar from '../../Components/NavBar';
import { selectMovieDetails } from '../../Redux/Features/movieDetails';
import useProgressiveImage from '../../hooks/UseProgressiveImage';
import { randomSingleFromArr } from '../../helpers/randomSingleFromArr';
import UseAlanAi from '../../hooks/UseAlanAi';

const MainLayout = () => {
  const activeMovie = useSelector(selectMovieDetails);
  const timeOutRef = useRef(null);
  const [fade, setFade] = useState(false);

  UseAlanAi();

  // const movieBackground1 = useMemo(() => activeMovie.images.backdrops[0].file_path, [activeMovie]);
  // const movieBackground2 = useMemo(() => activeMovie.images.backdrops[1].file_path, [activeMovie]);

  const movieBackground1 = useMemo(() => `${randomSingleFromArr(activeMovie?.images?.backdrops)?.file_path}`, [activeMovie]);
  const movieBackground2 = useMemo(() => `${randomSingleFromArr(activeMovie?.images?.backdrops)?.file_path}`, [activeMovie]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { currentSrc: currentSrc1 } = useProgressiveImage({
    filePath: movieBackground1,
    type: 'backdrops',
    highRes: 'original',
    lowRes: 'w300',
  });

  const { currentSrc: currentSrc2 } = useProgressiveImage({
    filePath: movieBackground2,
    type: 'backdrops',
    highRes: 'original',
    lowRes: 'w300',
  });

  useEffect(() => {
    if (isMobile) return;
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    if (activeMovie?.images?.backdrops) {
      setFade(true);
      timeOutRef.current = setTimeout(() => {
        setFade(false);
      }, 2000);
    }
  }, [activeMovie]);
  
  // if (loading1 || loading2) return null; // or return a loader, or some placeholder...

  return (
    <>
      <NavBar />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
        }}
      >
        {/* <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            // backgroundImage: `url(${currentSrc1})`,
            transition: 'opacity 2s',
            opacity: fade ? 0 : 1,
          }}
        /> */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundBlendMode: 'luminosity',
            // backgroundColor: 'rgba(0,0,0,0.15)',
            backgroundImage: !fade && !isMobile ? `url(${currentSrc2})` : '',
            opacity: fade ? 0 : 0.2,
            filter: fade ? 'none' : 'contrast(80%) grayscale(10%) blur(5px)',
            transition: 'opacity 1.5s linear , filter 1.5s linear',
          }}
        />
        <Container
          disableGutters
        >
          <main>
            <Outlet />
          </main>
        </Container>
      </Box>
    </>
  );
};

export default MainLayout;
