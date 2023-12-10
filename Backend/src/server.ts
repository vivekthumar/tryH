import * as http from 'http';
import App from './App';
import Environment from './environments/environment';
import connection from './lib/connection';
import logger from './lib/logger';

const env: Environment = new Environment();
const app: App = new App();
let server: http.Server;

function serverListening(): void {
	logger.info(`Listening on :${env.port}`);
}

// Wait for connection and then init app
connection.then(() => {
  app.init()
    .then(() => {
      app.express.set('port', env.port);
      server = app.httpServer;
      server.on('listening', serverListening);
      server.listen(env.port);
    });
  
});


process.on('unhandledRejection', (reason: Error) => {
	logger.error('Unhandled', reason.message);
	logger.error(reason.stack);
});
