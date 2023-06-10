import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
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
    borderRadius: '20px',
    height: '300px',
    marginBotton: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));
