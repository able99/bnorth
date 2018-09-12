let cache;

function initServerOption(options) {
  cache = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
    protocol: process.env.HTTPS === 'true' ? 'https' : 'http',
    urlHost: process.env.HOST || 'localhost',
  }

  return cache;
}

function getServerOption() {
  return cache;
}

module.exports = {
  initServerOption, getServerOption
}
