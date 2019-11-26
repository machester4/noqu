const Log = require("../lib/Log");

module.exports = async function(job, done) {
  try {
    console.log("Running TestJob");
    const { data, progress } = job;
    setTimeout(() => {
      Log.success(`TestJob - ${job.id} Completed`);
      done(true);
    }, 1000 * 5);
  } catch (error) {
    Log.error(`TestJob - ${job.id} Failed`);
    done(error);
  }
};
