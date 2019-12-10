const { Queue, Worker } = require("bullmq");
const path = require("path");
const redisConfig = require("../../config/redis");
const jobs = require("../jobs");

console.log(path.resolve(__dirname, `../jobs/demo/processor.js`));
// Create one queue for job type
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    connection: redisConfig,
    defaultJobOptions: job.options
  }),
  worker: new Worker(
    job.key,
    path.resolve(__dirname, `../jobs/demo/processor.js`),
    {
      connection: redisConfig,
      concurrency: process.env.PROCESSES_PER_JOB
    }
  ),
  name: job.key,
  options: job.options
}));

module.exports = {
  queues,
  add(name, data) {
    // Find respective Queue and add the new job
    const queue = this.queues.find(queue => queue.name == name);
    return queue.bull.add(queue.name, data);
  },
  get() {
    return this.queues.map(queue => queue.bull);
  }
};
