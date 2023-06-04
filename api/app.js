const express = require("express");
const compression = require("compression");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const connectDb = require("./db/connect");
const errorHandler = require("./middlewares/errorHandler");
const Auth = require("./routes/authentication");
const Post = require("./routes/post");
const User = require("./routes/user");
//middlewares
app.use(compression());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
// routes
app.use("/api/v1/auth", Auth);
app.use("/api/v1/posts", Post);
app.use("/api/v1/user", User);
// custom error handler
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
