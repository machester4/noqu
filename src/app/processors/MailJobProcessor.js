const Mail = require("../lib/Mail");

module.exports = async function(job, done) {
  console.log(job.progress);
  const { data, progress } = job;
  await Mail.sendMail({
    from: "Noqu",
    to: `${data.name} <${data.email}>`,
    subject: "Hello from Noqu",
    html: `Hello, ${data.name}, Thank for use Noqu`
  });
  done();
};
