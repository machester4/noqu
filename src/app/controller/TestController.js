import Queue from "../lib/Queue";
import * as jobs from "../jobs";

export default async (req, res) => {
  // Test all you jobs exept EventQueueJob he is system job
  const allJobsKeys = Object.keys(jobs).filter(
    jobKey => jobKey !== "EventQueueJob"
  );
  const promises = allJobsKeys.map(jobKey => Queue.add(jobKey, req.body));
  await Promise.all(promises);

  return res.json({ status: "OK" });
};
