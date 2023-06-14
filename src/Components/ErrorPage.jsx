import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const { error } = useRouteError();
  // eslint-disable-next-line
  console.error('error', error);

  return (
    <>
      <h2>Obs..</h2>
      <p>Sorry, seems the page looking for does not exist</p>
      <p>
        <i>
          {error?.statusText} || {error.message}
        </i>
      </p>
    </>
  );
};

export default ErrorPage;
