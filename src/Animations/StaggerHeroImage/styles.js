import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({

  container: {

    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    backgroundImage: 'var(--background)',
  },
    
  tilesWrapper: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), 1fr)  ',
    gridTemplateRows: 'repeat(var(--rows), 1fr)',
  },

  tile: {
    // outline: '1px solid white',
  },
}));
