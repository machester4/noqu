const log = require("./lib/log");
const queue = require("./lib/queue");
const jobs = require("./jobs");

module.exports = function(req, res) {
  try {
    const { name, data } = req.body;
    log.info(`New job recived ${name}`);

    const job = Object.values(jobs).find(jobI => jobI.key === name);

    if (!!job) {
      queue.add(name, data);
      res.json({ status: "OK" });
    } else {
      res.status(404);
      res.json({ status: "FAILED" });
    }
  } catch (error) {
    res.status(500);
    res.json({ status: "ERROR" });
  }
};
