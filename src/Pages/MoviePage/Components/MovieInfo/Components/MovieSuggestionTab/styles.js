import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    position: 'relative',
    height: '100%',
    width: '160px',
    [theme.breakpoints.down('md')]: {
      width: '140px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '130px',
    },
  },

  content: {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
    width: '100%',
    padding: '3px 2px',
  },
 
}));
