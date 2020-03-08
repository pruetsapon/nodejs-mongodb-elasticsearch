require('dotenv').config();
const config = require('./app/configs/config');
const restify = require('restify');
const cors = require('restify-cors-middleware');
const serviceLocator = require('./app/configs/di');
const routes = require('./app/routes/routes');
const handler = require('./app/helpers/error_handler');

// Initialize and configure restify server
const server = restify.createServer({
  name: config.app.name
});

// Setup CORS
const corsOptions = cors({  
  origins: ["*"],
  allowHeaders: ["*"],
  exposeHeaders: ["*"]
});
server.pre(corsOptions.preflight);  
server.use(corsOptions.actual); 

// Initialize the database
const Database = require('./app/configs/database');
const databaseOption = { 
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};
new Database(config.mongo.dbUser, config.mongo.dbPass, config.mongo.port, config.mongo.host, config.mongo.name, config.mongo.authDB, databaseOption);

// Set request handling and parsing
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    mapParams: false
  })
);

// Setup Error Event Handling
handler.register(server);

// Setup route Handling
routes.register(server, serviceLocator);

// start server
server.listen(config.app.port, () => {
  console.info(`${config.app.name} Server is running on port - ${config.app.port}`);
});