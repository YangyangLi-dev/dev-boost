export interface Website {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReleaseNote {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  year: number;
  month: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum TodoStatus {
  INIT = "init",
  IN_PROGRESS = "in progress",
  COMPLETE = "complete",
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  owner: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}
