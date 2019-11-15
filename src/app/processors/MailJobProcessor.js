const Mail = require("../lib/Mail");

module.exports = async function(job, done) {
  const { data, progress } = job;
  console.log("Running MailJob", data);
  await Mail.sendMail({
    from: "Noqu",
    to: `${data.name} <${data.email}>`,
    subject: "Hello from Noqu",
    html: `Hello, ${data.name}, Thank for use Noqu`
  });
  done();
};
