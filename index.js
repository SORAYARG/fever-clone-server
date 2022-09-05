require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./configs/db");
//const errors = require("./errors/commons");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () =>
  console.info("🎈listening at:", process.env.PORT)
);