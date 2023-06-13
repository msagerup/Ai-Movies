import React, {
  createContext,
  useEffect,
  useReducer,
} from 'react';

import axios from 'axios';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
};

const setSession = (accessToken) => {
  if (accessToken) {
    return localStorage.setItem('accessToken', accessToken);
  }
  return localStorage.removeItem('accessToken');
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user, establishment } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
        establishment,
      };
    }
    case 'LOGIN': {
      const { user, establishment } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,

      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        establishment: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, { email, password });
    console.log(response);
    const { token, user } = response.data;

    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, name, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
      email,
      name,
      password,
    });
    const { token, user } = response.data;

    window.localStorage.setItem('accessToken', token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get(`${process.env.REACT_APP_API}/api/auth/me`);
          const { data, establishment } = response.data;

          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user: data,
              establishment,

            },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
