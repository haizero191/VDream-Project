const FormResponse = require("../utils/response/FormResponse");
const jwt = require("jsonwebtoken");
/**
 * Auth Controller for handler request from client and response data
 */
class AuthController {
  async refreshToken(req, res) {
    var refreshToken = req.headers["x-refresh-token"];

    if (!refreshToken) {
      return res
        .status(400)
        .json(FormResponse(false, null, "Missing refresh token"));
    }

    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.SECRET_KEY
      );
      // 3. If valid, generate a new access token
      const newAccessToken = jwt.sign(
        { account: decodedRefreshToken.account }, // Replace 'account' with your data
        process.env.SECRET_KEY,
        { expiresIn: "1m" } // Set access token expiration (e.g., 1 minute)
      );
      // 4. Respond with the new access token
      res.json(FormResponse(true, newAccessToken, "Refresh token success"));
    } catch (error) {
      console.error("Invalid refresh token:", error);
      return res
        .status(401)
        .json(FormResponse(false, null, "Invalid refresh token"));
    }
  }
}

module.exports = new AuthController();
