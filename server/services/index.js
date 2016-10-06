let initialize = function(app) {
  require("./passport")();
  require("./nunjucks")(app);
};

module.exports = {
  initialize
};