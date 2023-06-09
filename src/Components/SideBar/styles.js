import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
  },
  image: {
    width: '60%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImages: {
    filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)',
    height: '30px',
  },
}));
