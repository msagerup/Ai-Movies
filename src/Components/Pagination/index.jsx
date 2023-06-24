import React from 'react';
import { Pagination as PaginationController, Stack, useMediaQuery } from '@mui/material';

import useStyles from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const classes = useStyles();
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));  
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Stack spacing={2}>
        <PaginationController 
          count={500}
          page={currentPage}
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
