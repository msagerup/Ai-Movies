import { makeStyles } from '@mui/styles';
// @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap');
export default makeStyles((theme) => ({
  reviewContainer: {
    maxWidth: '65%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '80%',
    }, 
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },   
  },
}));
