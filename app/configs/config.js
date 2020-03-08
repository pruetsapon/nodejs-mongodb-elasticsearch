module.exports = {
    app: {
      name: process.env.APP_NAME,
      port: process.env.APP_PORT || 8000,
      environment: process.env.APPLICATION_ENV
    },
    mongo: {
      dbUser: process.env.DB_USER,
      dbPass: process.env.DB_PASS,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      authDB: process.env.DB_AUTH
    },
    elastic: {
      host: process.env.ELASTIC_HOST,
      port: process.env.ELASTIC_PORT
    }
};