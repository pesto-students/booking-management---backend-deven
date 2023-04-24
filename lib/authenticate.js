const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const authenticate = async (req, res, next) => {
  try {
    //jwt secret
    const jwtSecret = "your_secret_key";

    const token = req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    const decoded = jwt.verify(token, jwtSecret);
    // console.log(decoded);
    const user = await User.findOne({ _id: decoded.userId });
    // console.log(user);

    // const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshToken');
    try {
    //   jwt.decode(token);
      const { exp } = jwt.decode(token);
      if (exp < (new Date().getTime() + 1) / 1000) {
        res.status(401).send({ error: "Authentication expired." });
      } else {
        if (!user) {
          throw new Error();
        }
        console.log(user);
        req.user = user;
        req.token = token;
        next();
      }
    } catch (err) {
      res.status(401).send({ error: "Unkown error while reading token", err });
    }
  } catch (err) {
    res.status(401).send({ error: "Please authenticate.", err });
  }
};

module.exports = authenticate;
