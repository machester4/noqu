export default (req, res) => {
  console.log("New Notification!", req.body);
  res.status(200);
};
