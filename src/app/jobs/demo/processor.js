const log = require("../../lib/log");

module.exports = async function(job, done) {
  try {
    console.log("Running TestJob");
    const { data, progress } = job;
    setTimeout(() => {
      log.success(`TestJob - ${job.id} Completed`);
      done();
    }, 1000 * 5);
  } catch (error) {
    log.error(`TestJob - ${job.id} Failed`);
    done(error);
  }
};
