const https = require("https");

function sendServerNotification(jobData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(jobData);

    const options = {
      hostname: process.env.NOTIFICATION_HOST_NAME,
      port: process.env.NOTIFICATION_HOST_PORT,
      path: process.env.NOTIFICATION_PATH,
      method: process.env.NOTIFICATION_METHOD,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
      }
    };

    const req = https.request(options, res => {
      console.log(`ServerNotification code: ${res.statusCode}`);
      resolve(res.statusCod);
    });

    req.on("error", error => {
      console.error(error);
      reject(error);
    });
    req.end();
  });
}

module.exports = {
  sendServerNotification
};
