import React, { useEffect, useState } from 'react';

const UseElmDimentions = (elmRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  console.log('elmRef: ', elmRef);

  useEffect(() => {
    function handleResize() {
      if (elmRef.current) {
        setDimensions({
          width: elmRef.current.offsetWidth, 
          height: elmRef.current.offsetHeight,
        });
      }
    }

    if (elmRef.current) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(elmRef.current);
          
      // Clean-up function
      return () => {
        if (!elmRef) return;
        if (resizeObserver && elmRef.current) {
          resizeObserver.unobserve(elmRef.current);
        }
      };
    }
  }, [elmRef]);
  
  return dimensions;
};

export default UseElmDimentions;
