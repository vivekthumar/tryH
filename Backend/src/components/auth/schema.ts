import * as Joi from 'joi';

export const SignInSchema = {
  email: Joi.string().required().label('Email'),
  password: Joi.string().required().label('Password'),
};

export const SignUpSchema = {
  email: Joi.string().required().label('Email'),
  password: Joi.string().required().label('Password'),
  name: Joi.string().required().label('Name'),
};
