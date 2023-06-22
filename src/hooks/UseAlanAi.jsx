import React, { useCallback, useContext, useEffect, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useSelector } from 'react-redux';
import { ColorModeContext } from '../Context/ToggleColorMode';
import { fetchToken } from '../utils';
import { userSelector } from '../Redux/Features/auth';

const UseAlanAi = () => {
  const { setMode, mode } = useContext(ColorModeContext);
  const modeRef = useRef(mode); // Create a ref to store the mode value
  const alanBtnInstance = useRef(); // Use a ref to store the alanBtnInstance
  const { user } = useSelector(userSelector);
  const userRef = useRef(user.username);

  console.log('user', user.username);

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
      });
    }
  }, []); // Remove the dependency on mode

  useEffect(() => {
    alanBtnInstance.current = alanBtn({
      key: process.env.REACT_APP_ALAN_AI_KEY,
      onEvent: (event) => {
        setAlanAiState();
        console.log('EVENT:', event);
      },
      onCommand: ({ command, mode: receivedColorMode }) => {
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
          // Perform logout logic
          localStorage.removeItem('session_id');
          localStorage.removeItem('request_token');
          userRef.current = null;
        }

        if (command === 'bye_bye') {
          // Rick roll the user
          localStorage.removeItem('session_id');
          localStorage.removeItem('request_token');
          userRef.current = null;
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
        if (command === 'test') {
          // Perform test logic
        }
      },
    });
  }, [setMode, setAlanAiState]);
};

export default UseAlanAi;
