import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '490px',
    textDecoration: 'none',
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
}));
