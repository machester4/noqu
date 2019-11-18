import { Queue, Worker } from "bullmq";
import path from "path";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

// Create one queue for job type
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, { connection: redisConfig }),
  worker: new Worker(
    job.key,
    path.resolve(__dirname, `../processors/${job.processor}`),
    { connection: redisConfig, concurrency: process.env.PROCESSES_PER_JOB }
  ),
  name: job.key,
  options: job.options
}));

export default {
  queues,
  add(name, id, data) {
    // Find respective job queue and add the new task
    const queue = this.queues.find(queue => queue.name == name);
    return queue.bull.add(id, data, queue.options);
  }
  //
};

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on("failed", job => {
//   console.log("Job failed", job.name, job.data);
// });

/*  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(
        "__default__",
        process.env.PROCESSES_PER_JOB,
        queue.processor
      );
    });
    // this.handleEventQueue();
  } */
