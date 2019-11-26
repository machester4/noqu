import "dotenv/config";
import express from "express";
import BullBoard from "bull-board";
import TestController from "./app/controller/TestController";
import NotificationController from "./app/controller/NotificationController";
import Queue from "./app/lib/Queue";

// Noqu-board-connector
// draft folder is fake node_modules clone noqu-board-connector here
const connector = require("../draft");

const app = express();
const port = process.env.port || 3333;
//BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
// app.use("/", BullBoard.UI);
app.post("/test", TestController);
// This is only for example hook notification
app.post("/notification", NotificationController);

// Use Noqu-board-connector routes
connector(
  app,
  "/app",
  Queue.queues.map(queue => queue.bull)
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
