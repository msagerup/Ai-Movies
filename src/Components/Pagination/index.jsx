import React from 'react';
import { Pagination as PaginationController, Stack, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { selectPage, setPagination } from '../../Redux/Features/pagination';

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  const classes = useStyles();
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));  
  const handleChange = (event, value) => {
    dispatch(setPagination(value));
  };

  // if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Stack spacing={2}>
        <PaginationController 
          count={500}
          page={page}
          onChange={handleChange}
          size={lg ? 'large' : 'small'}
          variant="outlined"
          shape="rounded"
          color="primary"
          showFirstButton={!!lg}
          showLastButton={!!lg}       
         
        />
      </Stack>
    </div>
  );
};

export default Pagination;
