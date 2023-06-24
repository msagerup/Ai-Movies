import React, { useCallback, useContext, useEffect, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../Context/ToggleColorMode';
import { fetchToken } from '../utils';
import { userSelector } from '../Redux/Features/auth';
import { setSearchQuery, setgenreIdOrCategoryName } from '../Redux/Features/currentGenreIdOrCategory';

const UseAlanAi = () => {
  const { setMode, mode } = useContext(ColorModeContext);
  const modeRef = useRef(mode); // Create a ref to store the mode value
  const alanBtnInstance = useRef(); // Use a ref to store the alanBtnInstance
  const { user } = useSelector(userSelector);
  const userRef = useRef(user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current = user.username; // Update the user ref whenever the user value changes
  }, [user.username]);

  useEffect(() => {
    modeRef.current = mode; // Update the mode ref whenever the mode value changes
  }, [mode]);

  const setAlanAiState = useCallback(() => {
    // Use the modeRef in the setAlanAiState callback
    if (alanBtnInstance.current) {
      alanBtnInstance.current.setVisualState({ 
        colorMode: modeRef.current,
        user: userRef.current,
        kickedOut: localStorage.getItem('kickedOut'),
      });
    }
    localStorage.removeItem('kickedOut');
  }, []); // Remove the dependency on mode

  useEffect(() => {
    alanBtnInstance.current = alanBtn({
      key: process.env.REACT_APP_ALAN_AI_KEY,
      onEvent: () => {
        setAlanAiState();
      },
      onCommand: ({ command, mode: receivedColorMode, genres, genre, searchValue }) => {
        if (command === 'changeMode') {
          if (receivedColorMode === 'dark') {
            setMode('dark');
          }
          if (receivedColorMode === 'light') {
            setMode('light');
          }
        }
        if (command === 'login') {
          fetchToken();
        }
        if (command === 'logout') {
          localStorage.removeItem('session_id');
          localStorage.removeItem('request_token');
          userRef.current = null;
        }

        if (command === 'bye_bye') {
          // Rick roll the user
          window.location.href = 'https://www.youtube.com/watch?v=mx86-rTclzA';
          localStorage.setItem('kickedOut', true);
        }

        if (command === 'genre') {
          const genreId = genres.find((g) => g.name.toLowerCase() === genre.toLowerCase());
          navigate('/');
          if (genreId) {
            return dispatch(setgenreIdOrCategoryName(genreId.id));
          }
          const categoryName = genre.startsWith('top') ? 'top_rated' : genre;
          dispatch(setgenreIdOrCategoryName(categoryName));
        }
        if (command === 'query') {
          dispatch(setSearchQuery(searchValue));
        }

        if (command === 'test') {
          // Perform test logic
        }
      },
    });
  }, [setMode, setAlanAiState]);
  
  return alanBtnInstance;
};

export default UseAlanAi;
