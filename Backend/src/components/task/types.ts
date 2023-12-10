
export interface Task {
  name: string;
  description: string;
  status: string;
  priority: Number;
  createdAt?: String;
  updatedAt?: String;
  _id?: String;
}

export interface CreateTaskResponse {
  message: string;
  task: Task
}

export interface ListTaskResponse {
	data: Task[];
  count: Number;
}

