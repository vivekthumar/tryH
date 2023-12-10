import * as fs from 'fs';
import * as path from 'path';
import { config as configDotenv } from 'dotenv';

class Environment {
	public port: number;

	public env: string;
	
	public MONGO_URL: string;

	public JWT_SECRET: string;

  public FRONT_URL: string;

	public EXPIRES_IN: number;

	constructor() {
    this.setEnvironment();
		this.env = process.env.NODE_ENV;
		this.port = Number(process.env.PORT);
		this.MONGO_URL = process.env.MONGO_URL;
		this.EXPIRES_IN = Number(process.env.EXPIRES_IN);
		this.JWT_SECRET = process.env.JWT_SECRET;
    this.FRONT_URL = process.env.FRONT_URL;
	}


	public setEnvironment(): void {
		const envPath: string = path.resolve(__dirname, '../../', '.env');
		if (!fs.existsSync(envPath)) {
			throw new Error('.env file is missing in root directory');
		}
		configDotenv({ path: envPath });
	}
}

export default Environment;
