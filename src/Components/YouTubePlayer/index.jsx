import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const YouTubePlayer = forwardRef(({
  videoId,
  playerHeight,
  playerWidth,
  style,
  muted,
 
}, ref) => {
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);

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
  }, [videoId, playerWidth, playerHeight]);
  
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
      },
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  return (
    <div>
      <div id="player" ref={playerRef} />
      <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, pointerEvents: 'none !important' }}></div>
    </div>
  );
});

export default YouTubePlayer;
