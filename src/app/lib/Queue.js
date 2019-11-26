import { Queue, Worker } from "bullmq";
import path from "path";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

// Create one queue for job type
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    connection: redisConfig,
    defaultJobOptions: job.options
  }),
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
  add(name, data) {
    // Find respective Queue and add the new job
    const queue = this.queues.find(queue => queue.name == name);
    return queue.bull.add(queue.name, data);
  }
};
