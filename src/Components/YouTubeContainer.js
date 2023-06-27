import { forwardRef, useRef } from 'react';
import YouTubePlayer from './YouTubePlayer';

const YouTubeContainer = forwardRef(({ width, height, playerControllComp, trailer }, youTubeContainerRef) => {
  const playerRef = useRef(null);
  const youTubeContainerRef3 = useRef(null);
  
  const PlayerControllComponent = playerControllComp;
    
  return (
    <div ref={youTubeContainerRef3} style={{ position: 'relative', width: `${width}`, height: `${height}` }}>
      <YouTubePlayer
        ref={playerRef}
        youTubeContainerRef={youTubeContainerRef3}
        videoId="AYZmL9D3BEI"
        playerWidth={width}
        playerHeight={height}
      />
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <PlayerControllComponent player={playerRef} />
      </div>
    </div>
  );
});
  
export default YouTubeContainer;
