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
     
      height: '400px',
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
    color: theme.palette.mode === 'dark' ? 'white' : '#121212',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      color: 'white',
      width: '100%',
    },
  },
  cardContentRoot: {
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
    [theme.breakpoints.down('md')]: {
      backgroundColor: 'rgba(0,0,0,0.575)',
      // background-color: #00000069;
    },
  },

  override: {
    zIndex: 5,
    backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#dcdcdc',
    position: 'relative',
    width: '95% !important',  
    boxShadow: theme.palette.mode === 'dark' ? '0px 17px 16px 0px rgba(0,0,0,1)' : ' 0px 17px 16px 0px rgba(140,140,140,1)',
    paddingTop: '100px',
    top: '-40px',
    paddingBottom: '60px',  
  },

  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
  
}));
