import { makeStyles } from '@mui/styles';

const videoWidth = 100;
const videoHeight = (videoWidth * 9) / 16;

export default makeStyles((theme) => ({
  youtubePlayer: {
    width: `${videoHeight}vw`, // 80% of viewport width
    height: `${videoHeight}vh`, // Maintain 16:9 aspect ratio
  },

}));
