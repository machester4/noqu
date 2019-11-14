module.exports = async function(job, done) {
  console.log("Running TestJob");
  const { progress } = job;
  setTimeout(() => done(), 1000 * 60);
};
