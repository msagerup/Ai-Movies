
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoPlayerState } from '../../Redux/Features/videoPlayerState';
import PlayerContent from './PlayerContent';

const YouTubePlayer = ({ videoId, playerHeight, playerWidth }) => {
  const playerRef = useRef(null);

  const [adjustPlayerHeight, setAdjustPlayerHeight] = useState(playerHeight);
  const [adjustPlayerWidth, setAdjustPlayerWidth] = useState(playerWidth);

  const dispatch = useDispatch();
  const playerInstanceRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.pauseVideo();

        setAdjustPlayerHeight(playerRef.current.clientHeight);
        setAdjustPlayerWidth(playerRef.current.clientWidth);

        playerInstanceRef.current.playVideo(); 
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [playerHeight, playerWidth]);

  // Clean up on unmount
  useEffect(() => () => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.destroy();
      playerInstanceRef.current = null;
     
      window.onYouTubeIframeAPIReady = null;
      // setVideoPlayerState('unstarted');
    }
  }, []);

  useEffect(() => {
    if (!playerInstanceRef.current) {
      // Load the IFrame Player API code asynchronously.
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      const onYouTubeIframeAPIReady = () => {
        playerInstanceRef.current = new window.YT.Player(playerRef.current, {
          videoId,
          height: adjustPlayerHeight,
          width: adjustPlayerWidth,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            autoplay: 1,
        
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
              // dispatch(setVideoPlayerState('playing'));
            },
            onStateChange: (event) => {
              switch (event.data) {
                case window.YT.PlayerState.ENDED:
                  dispatch(setVideoPlayerState('ended'));
                  break;
                case window.YT.PlayerState.PLAYING:
                  dispatch(setVideoPlayerState('playing'));
                  break;
                case window.YT.PlayerState.PAUSED:
                  dispatch(setVideoPlayerState('paused'));
                  break;
                case window.YT.PlayerState.BUFFERING:
                  // dispatch(setVideoPlayerState('buffering'));
                  break;
                case window.YT.PlayerState.CUED:
                  // dispatch(setVideoPlayerState('cued'));
                  break;
                default:
                  // dispatch(setVideoPlayerState('unstarted'));
                  break;
              }
            },
            onError: (event) => {
              console.log('onPlayerError', event);
              // Handle error here, perhaps update Redux state to display error in UI
            },
          },
        });
      };
  
      if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
      } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      }
  
      return () => {
        window.onYouTubeIframeAPIReady = null;
      };
    } 
   
    // If the player instance exists, just load the new video
    if (playerInstanceRef.current && typeof playerInstanceRef.current.loadVideoById === 'function') {
      playerInstanceRef.current.loadVideoById(videoId);
      dispatch(setVideoPlayerState('playing'));
    }
  
    dispatch(setVideoPlayerState('playing'));

    return () => {
      if (!videoId) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
      // console.log('unmounting');
      // dispatch(setVideoPlayerState('sdk-loading'));
    };
  }, [videoId, playerHeight, playerWidth, dispatch, playerHeight, playerWidth]);

  return (
    <div>
      <div id="player" ref={playerRef} />
      <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, pointerEvents: 'none !important' }}></div>
      {PlayerContent && window.YT && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* <PlayerContent player={ref} width={playerWidth} height={playerHeight} /> */}
      </div>
      )}
    </div>
  );
};

export default YouTubePlayer;
