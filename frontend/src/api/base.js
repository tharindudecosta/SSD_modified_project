import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('jwtToken');
  return token ? token : null;
};

export const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem('userId');
  return userId ? userId : null;
};

const axiosclient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_NODE_API_URL
      : "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer }`, // Add your token or custom header here
  },
});

axiosclient.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }

    const userId = getUserIdFromLocalStorage();
    if (userId) {
      config.headers['UserId'] =userId;
    } else {
      delete config.headers['UserId'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Session.addAxiosInterceptors(axiosclient);

export { axiosclient };
