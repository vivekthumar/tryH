import { NextFunction, Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import * as Joi from 'joi';

const joiValidate = (validations) => {
  function validate(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const schema = Joi.object(validations);
    const { error, value } = schema.validate(body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
    } 
    req.body = value;
    return next();
  }

  return validate;
};


export default joiValidate;

