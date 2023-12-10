import mongoose, { Schema } from 'mongoose';
import { Task } from './types';

const taskSchema = new Schema<Task>(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
        },
        priority: {
            type: Number,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Task = mongoose.model<Task>('task', taskSchema);

export default Task;
