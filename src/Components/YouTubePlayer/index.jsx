import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoPlayerState } from '../../Redux/Features/videoPlayerState';

const YouTubePlayer = forwardRef(({
  videoId,
  playerHeight,
  playerWidth,
  style,
  muted,
  playerContentComp,
 
}, ref) => {
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const dispatch = useDispatch();


  
  // Expose methods for controlling the player via the ref
  useImperativeHandle(ref, () => ({
    play: () => {
      playerInstanceRef.current?.playVideo();
    },
    pause: () => {
      playerInstanceRef.current?.pauseVideo();
    },
    mute: () => {
      playerInstanceRef.current?.mute();
    },
    // Add any additional control methods you need here
  }));

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  useEffect(() => {
    if (window.YT) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };
  }, [videoId, window.YT]);
  
  // This useEffect will mute or unmute the video when the muted prop changes
  // useEffect(() => {
  //   if (playerInstanceRef.current) {
  //     muted 
  //       ? playerInstanceRef.current.mute() 
  //       : playerInstanceRef.current.unMute();
  //   }
  // }, [muted]);

  function createPlayer() {
    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      videoId,
      width: playerWidth,
      height: playerHeight,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        enablejsapi: 1,
        
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    switch (event.data) {
      case -1:
        dispatch(setVideoPlayerState('unstarted'));
        break;
      case 0:
        dispatch(setVideoPlayerState('ended'));
        break;
      case 1:
        dispatch(setVideoPlayerState('playing'));
        break;
      case 2:
        dispatch(setVideoPlayerState('paused'));
        break;
      case 3:
        dispatch(setVideoPlayerState('buffering'));
        break;
      case 5:
        dispatch(setVideoPlayerState('cued'));
        break;
      default:
        break;
    }

    console.log(event, 'EVENT OF VIDEO');
  }
 
  const PlayerContent = playerContentComp;
  // console.log(PlayerContent);

  return (
    <div>
      <div id="player" ref={playerRef} />
   
      <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, pointerEvents: 'none !important' }}></div>
   
      {PlayerContent 
      && window.YT && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <PlayerContent player={ref} width={playerWidth} height={playerHeight} />
      </div>
      )}
    </div>
  );
});

export default YouTubePlayer;
