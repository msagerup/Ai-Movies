import { makeStyles } from '@mui/styles';
import { hover } from '@testing-library/user-event/dist/hover';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    width: '30px',
    height: '30px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth, // 240
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth, // 240
  },
  linkButton: {
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none !important',
    },
  },
}));
