import express from "express";
import dotenv from "dotenv";
import log from "loglevel";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParser from "cookie-parser"; // Required for CSRF token storage in cookies
import csrf from "csurf"; // CSRF middleware
import helmet from "helmet";

import routes from "./src/routes/index.js";
// import swaggeroption from "./src/utils/swaggerConfig.js";

import ip from "ip"

dotenv.config();
log.enableAll();

const app = express();

app.disable('x-powered-by');
const helmet = require('helmet');
app.use(helmet());

app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.use(express.json());
app.use(cors());
// const specs = swaggerJsDoc(swaggeroption);

app.get("/", csrfProtection, (req, res) => {
  res.sendStatus(200).json({ message: "Welcome", csrfToken: req.csrfToken() });
});

app.use("/api", routes);


// Error handling for CSRF token
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ error: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

const PORT = process.env.PORT || 5000;

// Connect to Database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  log.info(`DB connected successfully with ${mongoose.connection.host}`);
});

app.listen(PORT, () => {
  log.info(`Server has been started on PORT: ${PORT}`);
  console.dir ( ip.address() );
});
