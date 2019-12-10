require("dotenv/config");
const express = require("express");
const noqu = require("./app");
const queue = require("./app/lib/queue");

// Noqu-board-connector
// draft folder is fake node_modules clone noqu-board-connector here
const connector = require("../draft");

const app = express();
const port = process.env.port || 3333;

app.use(express.json());

// Noqu app controller
app.post("/", noqu);

// Use Noqu-board-connector routes
connector(app, "/app", queue.get());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
