import http from 'http';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import registerRoutes from './routes';

export default class App {
	public express: express.Application;

	public httpServer: http.Server;

	public async init(): Promise<void> {
		this.express = express();

    // Append middleware to req. We can create another file for middleware if we are using so many.
		this.middleware();

    // Define Routes
		this.routes();

		this.httpServer = http.createServer(this.express);
	}

  private routes(): void {
		this.express.use('/api', registerRoutes());
	}

  private middleware(): void {
		this.express.use(express.json({ limit: '100mb' }));
		this.express.use(
			express.urlencoded({ limit: '100mb', extended: true }),
		);
		this.express.use(cors({
      'allowedHeaders': ['Content-Type', 'authorization'],
      'origin': process.env.FRONT_URL
    }));

		this.express.use(helmet());
	}
}
