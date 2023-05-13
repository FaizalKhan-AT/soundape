const express = require("express");
const compression = require("compression");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const connectDb = require("./db/connect");
const errorHandler = require("./middlewares/errorHandler");
const Auth = require("./routes/authentication");
//middlewares
app.use(compression());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
// routes
app.use("/api/v1/auth", Auth);
app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`server and database started running at ${process.env.PORT} `)
    );
  } catch (err) {
    console.error(err);
  }
};
startServer();
