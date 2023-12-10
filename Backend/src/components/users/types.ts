import mongoose, { Document, Model } from 'mongoose';


export interface IUser extends Document {
    email: string;
    name: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    isEmailTaken?(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
    isPasswordMatch?(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}