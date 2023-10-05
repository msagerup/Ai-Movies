import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    
  tilesWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), 1fr)  ',
    gridTemplateRows: 'repeat(var(--rows), 1fr)',
  },

  tile: {
    outline: '1px solid white',
  },
}));
