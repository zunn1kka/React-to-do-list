const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
