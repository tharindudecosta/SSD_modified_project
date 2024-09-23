import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    var user = localStorage.getItem("userId");
    var token = localStorage.getItem("jwtToken");

    // const decodedToken = jwtDecode(token);
    

    setTimeout(() => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    }, 2000);
  }, []);

  if (currentUser === undefined) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;
