import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import Cookies from 'js-cookie';

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? token : null;
};

export const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem('userId');
  return userId ? userId : null;
};


const getCookieData = () => {
  const cookieData = Cookies.get('cookieData');

  if (cookieData) {
    return JSON.parse(cookieData);
  }

  return null;
};

export const getTokenFromCookie = () => {
  const cookieData = getCookieData();
  if (cookieData) {
    return cookieData.jwtToken;
  } else {
    return null;
  }
};

export const getUserIdFromCookie = () => {
  const cookieData = getCookieData();
  if (cookieData) {
    return cookieData.userId;
  } else {
    return null;
  }
};


const axiosclient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_NODE_API_URL
      : "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  },
});

axiosclient.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }

    const userId = getUserIdFromCookie();
    if (userId) {
      config.headers['UserId'] = userId;
    } else {
      delete config.headers['UserId'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Session.addAxiosInterceptors(axiosclient);

export { axiosclient };
