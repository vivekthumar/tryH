import * as Joi from 'joi';

export const CreateSchema = {
  name: Joi.string().required().label('Name'),
  description: Joi.string().optional().label('Description'),
  status: Joi.string().required().label('Status'),
  priority: Joi.number().required().label('Priority'),
};

export const UpdateSchema = {
  name: Joi.string().optional().label('Name'),
  description: Joi.string().optional().label('Description'),
  status: Joi.string().optional().label('Status'),
  priority: Joi.number().optional().label('Priority'),
};
