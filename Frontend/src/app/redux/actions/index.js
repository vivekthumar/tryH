import axios from 'axios.js';

export const getTask = async (query) => {
  return await axios.get(`api/task?${query}`);
};

export const createTask = async (data) => {
  return await axios.post(`api/task`, data);
};

export const updateTask = async (id, data) => {
  return await axios.patch(`api/task/${id}`, data);
};

export const deleteTask = async (id) => {
  return await axios.delete(`api/task/${id}`);
};

export const userLogin = async (data) => {
  return await axios.post(`api/auth/signin`, data);
};

export const userSignUp = async (data) => {
  return await axios.post(`api/auth/signup`, data);
};








