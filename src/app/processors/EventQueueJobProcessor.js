const Notification = require("../lib/Notification");

module.exports = async function(job, done) {
  const { data } = job;
  console.log("Running EventQueueJob", data);
  // await Notification.sendServerNotification(data);
  done();
};
