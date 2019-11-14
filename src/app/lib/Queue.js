import Queue from "bull";
import path from "path";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

// Create one queue for job type
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  processor: path.resolve(__dirname, `../processors/${job.processor}`),
  options: job.options
}));

export default {
  queues,
  add(name, data) {
    // Find respective job queue and add the new task
    const queue = this.queues.find(queue => queue.name == name);
    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(
        "__default__",
        process.env.PROCESSES_PER_JOB,
        queue.processor
      );
      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.key, job.data);
        console.log("Error", err);
      });
    });
  }
};

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on("failed", job => {
//   console.log("Job failed", job.name, job.data);
// });
