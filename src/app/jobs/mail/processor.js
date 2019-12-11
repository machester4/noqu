const log = require("../../lib/log");
const Mail = require("../../lib/mail");

module.exports = async function(job, done) {
  try {
    const { data, progress } = job;
    console.log("Running MailJob", data);
    await Mail.sendMail({
      from: "Noqu",
      to: `${data.name} <${data.email}>`,
      subject: "Hello from Noqu",
      html: `Hello, ${data.name}, Thank for use Noqu`
    });
    log.success(`MailJob - ${job.id} Completed`);
    done();
  } catch (error) {
    console.log(job);
    log.error(`MailJob - ${job.id} Failed`);
    done(error);
  }
};
