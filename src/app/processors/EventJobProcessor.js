const Log = require("../lib/Log");
const Notification = require("../lib/Notification");

module.exports = async function(job, done) {
  try {
    const { data } = job;
    console.log("Running EventQueueJob", data);
    // await Notification.sendServerNotification(data);
    done();
  } catch (error) {
    Log.error(error.message);
    done(error);
  }
};
