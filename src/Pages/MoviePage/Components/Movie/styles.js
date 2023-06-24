import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  movie: {
    // padding: '10px',
    // // maxWidth: '20% !important', 
    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: '9% !important',
    // },
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      curson: 'pointer',
    },
  },

  title: {
    fontSize: '15px !important',
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBotton: 0,
    textAlign: 'center',
  },
  image: {
    borderRadius: '10px',
    height: '300px',
    marginBotton: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: '250px',
    },
  },
}));
