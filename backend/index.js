import express from "express";
import dotenv from "dotenv";
import log from "loglevel";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";

import routes from "./src/routes/index.js";
// import swaggeroption from "./src/utils/swaggerConfig.js";

import ip from "ip"

dotenv.config();
log.enableAll();

const app = express();
app.use(express.json());
app.use(cors());
// const specs = swaggerJsDoc(swaggeroption);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api", routes);

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
