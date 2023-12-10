import bcrypt from 'bcryptjs';
import mongoose, {  Schema } from 'mongoose';
import validator from 'validator';
import { IUser, IUserModel } from './types';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    name: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
      trim: true,
      private: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
