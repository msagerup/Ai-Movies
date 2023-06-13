import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { createSessionId } from '../utils';

const token = localStorage.getItem('request_token');
const sessionIdFromLocalStorrage = localStorage.getItem('session_id');

export default function useAuth() {
  async function loginInUser() {
    console.log('runnign');
    if (token) {
      console.log('TOKEN', sessionIdFromLocalStorrage);

      if (sessionIdFromLocalStorrage) {
        console.log('SESSION ID');
        const response = await axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${sessionIdFromLocalStorrage}`);
        console.log(response);
      } else {
        console.log('HEEEEEEEEEEEES');
        const test = await createSessionId();
        console.log(test);
      }
    }
  }

  return [loginInUser];
}

