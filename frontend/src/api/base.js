import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

const axiosclient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_NODE_API_URL
      : "http://localhost:5000",
});

Session.addAxiosInterceptors(axiosclient);

export { axiosclient };
