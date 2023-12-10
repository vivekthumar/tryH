import mongoose from 'mongoose';
import Environment from '../environments/environment';

const env: Environment = new Environment();

const connection = mongoose.connect(env.MONGO_URL);

export default connection;