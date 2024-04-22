const accountRouter = require("./account.route")
const profileRouter = require("./profile.route")


/**
 * Root of routes for API endpoint
 * @param {Express} app Express application started
 */
function route(app) {
  // Account router api
  app.use("/api/accounts", accountRouter);

  // Profile router api
  app.use("/api/profiles", profileRouter);
}

module.exports = route;
