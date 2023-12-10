/* eslint-disable no-throw-literal */
import { Request, Response } from 'express';
import Task from './model';
import {
  StatusCodes,
} from 'http-status-codes';

import { CreateTaskResponse, ListTaskResponse } from './types';

type SortOrder = 'asc' | 'desc';
type SortOptions = { [key: string]: SortOrder };

export default class TaskController {

  constructor() { }

  public async create(req: Request, res: Response) {
    try {
      const task = new Task(req.body);
      const taskJson = await task.save();

      const response: CreateTaskResponse = {
        message: "Task created successfully",
        task: taskJson,
      }
      return res.status(StatusCodes.OK).send(response);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Internal Error.',
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const query: any = {};
      const { id, search, status, priority, limit, offset, sortField, sortType } = req.query;
      let resultLimit = 0;
      let resultOffset = 0;
      let resultSortField = '';
      let resultSortType = '';

      if (search) {
        query.$or = [
          { name: { $regex: new RegExp(String(search), 'i') } },
          { description: { $regex: new RegExp(String(search), 'i') } },
        ];
      }

      if (id) {
        query._id = id;
      }

      if (status) {
        query.status = status;
      }

      if (priority) {
        query.priority = Number(priority);
      }

      if (!limit) {
        resultLimit = 10;
      }

      if (!offset) {
        resultOffset = 0;
      }

      if (!sortField) {
        resultSortField = 'createdAt'
      } else {
        resultSortField = sortField.toString();
      }

      if (!sortType) {
        resultSortType = 'desc'
      } else {
        resultSortType = sortType.toString();
      }
      
      
      if (limit === 'all') {
        resultLimit = 0;
      } else {
        resultLimit = Number(limit);
      }
  
      const sortOptions: SortOptions = {};
      if (resultSortType === 'asc' || resultSortType === 'desc') {
        sortOptions[resultSortField] = resultSortType;
      }

      const count: number = await Task.countDocuments(query);
      const tasks: Task[] = await Task.find(query).skip(resultOffset).limit(resultLimit).sort(sortOptions);
      const response: ListTaskResponse = {
        data: tasks,
        count,
      }
      return res.status(StatusCodes.OK).send(response);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Internal Error.',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const taskJson = await Task.findOneAndUpdate({ _id: req.params.id}, { $set: req.body });
      const response: CreateTaskResponse = {
        message: "Task updated successfully",
        task: taskJson,
      }
      return res.status(StatusCodes.OK).send(response);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Internal Error.',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await Task.findOneAndDelete({ _id: req.params.id});
      return res.status(StatusCodes.OK).send({ message: 'Task delete successfully'});
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Internal Error.',
      });
    }
  }
}
