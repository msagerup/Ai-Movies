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
  },
  backdropFilter: {
    backgroundImage: theme.palette.mode === 'dark' 
      ? 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(18 18 18))' 
      : 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(255 255 255))',    
    position: 'absolute',
    inset: ' 0px',
    [theme.breakpoints.up('xl')]: {
      // backgroundImage: theme.palette.mode === 'dark'
      //   ? 'radial-gradient(closest-side at 44% 35%, transparent, rgb(18 18 18) 145%)' 
      //   : 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(255 255 255))',    
    },
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
  footerGradient: {
    [theme.breakpoints.up('xl')]: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      inset: '0px',
      zIndex: -1,
      backgroundImage: theme.palette.mode === 'dark' 
        ? 'radial-gradient(closest-side at 62% 27%, transparent 85%, rgb(18 18 18) 144%)' 
        : 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(255 255 255))',    
    },
  },
}));
