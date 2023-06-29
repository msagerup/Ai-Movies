import { Box } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { NotStarted } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectVideoPlayerState } from '../../Redux/Features/videoPlayerState';

const PlayerContent = forwardRef(({ width, height, player }) => {
  useImperativeHandle(player, () => ({
    play: () => player.play(),
    pause: () => player.pause(),
    mute: () => player.mute(),
  }));

  console.log('player', player);

  const videostate = useSelector(selectVideoPlayerState);

  // console.log('videostate****', videostate);

  // const theme = useMemo(() => createTheme({
  //   palette: {
  //     mode,
  //   },
  // }), [mode]);
  // console.log('playerController', props);
  // const { play, pause, mute } = player.current;

  // console.log('videostate', videostate);
  if (!player?.current) return null;
  
  const { play, pause, mute } = player.current;

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
      }}
    >
      
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          left: 2,
        }}
      >
        <Grid container>
          <Grid item>
            <NotStarted
              color="primary"
              fontSize="large"
            />
          </Grid>

        </Grid>
        <button onClick={() => play()}>play</button>
        <button onClick={() => pause()}>pause</button>
        <button onClick={() => mute()}>mute</button> 
      </Box> 
    </Box>
  );
}); 
export default PlayerContent;
