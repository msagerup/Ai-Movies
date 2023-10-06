import React, { forwardRef } from 'react';
import YouTubePlayer from './YouTubePlayer';
import PlayerContent from './YouTubePlayer/PlayerContent';

const YouTubeContainer = forwardRef(({ width, playVideo, height, trailer }, youTubeContainerRef) => {
  if (!trailer) return null;
  return (
    <YouTubePlayer
      ref={youTubeContainerRef}
      isPlayVideo={playVideo}
      videoId={trailer} 
      playerWidth={width}
      playerHeight={height}
      playerContentComp={PlayerContent}
    />
  );
});
  
export default React.memo(YouTubeContainer);
