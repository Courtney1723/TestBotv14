const rateLimit = require('express-rate-limit');
const RateLimitStore = require('rate-limit-mongo');

module.exports = rateLimit({
  max: 300,
  message: 'You are being rate limited.',
  store: new RateLimitStore({ uri: process.env.mongoURI }),
  windowMs: 60 * 1000
});
