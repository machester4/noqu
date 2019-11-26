const Log = require("../lib/Log");
const Mail = require("../lib/Mail");

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
    Log.success(`MailJob - ${job.id} Completed`);
    done(true);
  } catch (error) {
    console.log(job);
    Log.error(`MailJob - ${job.id} Failed`);
    done(error);
  }
};
