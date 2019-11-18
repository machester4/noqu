export default {
  key: "EventQueueJob",
  options: {
    delay: 5000
  },
  processor: "EventJobProcessor.js"
};
