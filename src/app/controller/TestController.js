import Queue from "../lib/Queue";
import * as jobs from "../jobs";

export default async (req, res) => {
  // Test all you jobs
  const promises = Object.keys(jobs).map(jobKey => Queue.add(jobKey, req.body));
  await Promise.all(promises);

  return res.json({ status: "OK" });
};
