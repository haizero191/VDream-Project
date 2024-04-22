const jwt = require("jsonwebtoken");
const FormResponse = require("../utils/response/FormResponse");

const isTokenExpired = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      expired: false,
      decoded: decoded,
    };
  } catch (error) {
    return {
      expired: true,
      decoded: null,
    }; // Consider any error as expired for safety
  }
};

const authMiddleWare = (req, res, next) => {
  var accessToken = req.headers["authorization"];
//   var refreshToken = req.headers["x-refresh-token"];
  if (!accessToken || accessToken.split(" ")[0] !== 'Bearer') {
    res.status(401).json(FormResponse(false, null, "Unauthorized"));
  } else {
    accessToken = accessToken.split(" ")[1];
    // check access token expired
    const Check_AccessToken_Result = isTokenExpired(
      accessToken,
      process.env.SECRET_KEY
    );

    if (Check_AccessToken_Result.expired) {
      res.status(403).json(FormResponse(false, null, "Access token expired."));
    } else {
      next();
    }
  }
};


module.exports = authMiddleWare;
