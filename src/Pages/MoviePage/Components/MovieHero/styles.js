import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    zIndex: 10,
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none',
    aspectRatio: '16 / 9 !important',
    textDecoration: 'none',
    boxShadow: theme.palette.mode === 'dark' ? '0px 17px 16px 0px rgba(0,0,0,1)' : ' 0px 17px 16px 0px rgba(140,140,140,1)',
    [theme.breakpoints.down('md')]: {
     
      height: '600px',
      width: '100%',
    },
  },
  
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cardRoot: {
    position: 'relative',
    borderRadius: '0px !important',
  },
  cardMedia: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.575)',
    backgroundBlendMode: theme.palette.mode === 'dark' ? 'luminosity' : 'luminosity',
    
  },
  cardContent: {
    position: 'relative',
    color: theme.palette.mode === 'dark' ? 'white' : '#121212',
    aspectRatio: '16 / 9 !important',
    width: '60%',
    [theme.breakpoints.down('md')]: {
      color: 'white',
      width: '100%',
      
    },
  },

  movieTitle: {
    maxWidth: '70%',
  },

  cardContentRoot: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundImage: theme.palette.mode === 'dark' ? 'radial-gradient(farthest-side at 73% 21%, transparent 65%, rgb(18 18 18))' : 'radial-gradient(farthest-side at 73% 21%, transparent, rgb(255 255 255) )',    
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 39%)' : 'rgb(212 212 212 / 57%)',
      color: theme.palette.mode === 'dark' ? 'white' : '#121212',
      height: '100%',
    },
  },

  genreImage: {
    filter: 'invert(1)',
  },
  
}));
