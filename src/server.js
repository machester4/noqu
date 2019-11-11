import "dotenv/config";
import express from "express";
import BullBoard from "bull-board";
import UserController from "./app/controller/UserController";
import Queue from "./app/lib/Queue";

const app = express();
const port = process.env.port || 3333;
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
app.use("/status", BullBoard.UI);
app.post("/users", UserController.store);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
