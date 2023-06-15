import React, { useRef, useEffect } from 'react';
import useStyles from './styles';

const YouTubePlayer = ({ videoId, playerHeight, playerWidth }) => {
  const classes = useStyles();
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);

  useEffect(() => {
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  useEffect(() => {
    if (window.YT) {
      createPlayer();
    } else {
      // If not ready, wait for the API to be ready
      window.onYouTubeIframeAPIReady = createPlayer;
    }
    return () => {
      // Clean up the player if component unmounts
      window.onYouTubeIframeAPIReady = null;
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };
  }, [videoId, playerWidth, playerHeight]);

  function createPlayer() {
    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      videoId,
      width: playerWidth,
      height: playerHeight,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    // Now it's safe to use the player.
    event.target.playVideo();
  }

  return (
    <div>
      <div id="player" ref={playerRef} />
    </div>
  );
};

export default YouTubePlayer;
