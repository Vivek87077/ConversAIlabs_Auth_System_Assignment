module.exports = function (req, res, next) {
  const time = new Date().toISOString();

  console.log(`[${time}] ${req.method} ${req.url}`);

  if (Object.keys(req.body || {}).length) {
    console.log("Body:", req.body);
  }

  next();
};
