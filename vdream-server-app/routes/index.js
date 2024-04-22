const accountRouter = require("./account.route")
const profileRouter = require("./profile.route")
const authRouter = require("./auth.route")

/**
 * Root of routes for API endpoint
 * @param {Express} app Express application started
 */
function route(app) {
  // Account router api
  app.use("/api/accounts", accountRouter);

  // Profile router api
  app.use("/api/profiles", profileRouter);

  // Auth router api
  app.use("/api/auth", authRouter);
}

module.exports = route;
