import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  backgroundImageContainer: {
    position: 'fixed',
    top: 0,
    left: '200px',
    zIndex: -1,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      left: '0px',
    },
  },
 
  backgroundImage: {
    
    width: '100vw',
    // maxHeight: '60vh',
  },
  backdropFilter: {
    backgroundImage: theme.palette.mode === 'dark' ? 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(18 18 18))' : 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(255 255 255))',    
    position: 'absolute',
    inset: ' 0px',
  },

  gridItem: {
    flex: '1 1 auto !important',
  },

  logo: {
    maxWidth: '341px',
    minWidth: '100px',
    width: '35vw',
  },

  overview: {
    maxWidth: '60vw',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '55vw',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
    },

  },

}));
