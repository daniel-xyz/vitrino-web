let initialize = function(app) {

  require("./mongoDB")();
  require("./passport")();
  require("./nunjucks")(app);
};

module.exports = {
  initialize
};