import React, { forwardRef, useRef } from 'react';
import YouTubePlayer from './YouTubePlayer';
import PlayerContent from './YouTubePlayer/PlayerContent';

const YouTubeContainer = forwardRef(({ width, playVideo, height, trailer }, youTubeContainerRef) => {
  // console.log('RENDERING YouTubeContainer', trailer);

  if (!trailer) return null;
  // <div ref={youTubeContainerRef3} style={{ position: 'relative', width: `${width}`, height: `${height}` }}>
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
  // <div style={{ position: 'absolute', top: 0, left: 0 }}>
  //   <PlayerControllComponent player={playerRef} />
  // </div>
  // </div>
});
  
export default React.memo(YouTubeContainer);
