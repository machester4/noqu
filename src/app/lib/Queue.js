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
  handleEventQueue() {
    this.queues.forEach(queue => {
      if (queue.name !== "EventQueueJob") {
        // Jobs events
        queue.bull.on("waiting", function(jobId) {
          // A Job is waiting to be processed as soon as a worker is idling.
          this.add("EventQueueJob", {
            event: "waiting",
            jobId
          });
        });
        queue.bull.on("active", function(job, jobPromise) {
          // A job has started. You can use `jobPromise.cancel()`` to abort it.
          this.add("EventQueueJob", {
            event: "active",
            job: job.data
          });
        });
        queue.bull.on("stalled", function(job) {
          // A job has been marked as stalled. This is useful for debugging job
          // workers that crash or pause the event loop.
          this.add("EventQueueJob", {
            event: "stalled",
            job: job.data
          });
        });
        queue.bull.on("progress", function(job, progress) {
          // A job's progress was updated!
          this.add("EventQueueJob", {
            event: "progress",
            job: { ...job.data, progress }
          });
        });
        queue.bull.on("completed", function(job, result) {
          // A job successfully completed with a `result`.
          this.add("EventQueueJob", {
            event: "completed",
            job: { ...job.data, result }
          });
        });
        queue.bull.on("failed", (job, error) => {
          this.add("EventQueueJob", {
            event: "failed",
            queue: queue.name,
            job: { ...job.data, error }
          });
          console.log("Job failed", queue.key, job.data);
          console.log("Error", error);
        });
      }
    });
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(
        "__default__",
        process.env.PROCESSES_PER_JOB,
        queue.processor
      );
    });
    // this.handleEventQueue();
  }
};

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on("failed", job => {
//   console.log("Job failed", job.name, job.data);
// });
