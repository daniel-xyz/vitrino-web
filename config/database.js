let mongoConfig = {
  uri: {
    productive: process.env.MONGODB_URI,
    development: process.env.MONGODB_URI_SANDBOX,
    local: 'mongodb://localhost:27017/test'
  }
};

module.exports = mongoConfig;