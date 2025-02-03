const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(decoded, req.user);
    return next();
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
