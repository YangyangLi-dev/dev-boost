export interface Website {
  id: string;
  name: string;
  url: string;
  image_url: string;
  tags: string[];
  notes: string;
  created_at: Date;
  updated_at: Date;
}

export interface ReleaseNote {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  year: number;
  month: number;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export enum TodoStatus {
  INIT = "init",
  IN_PROGRESS = "processing",
  COMPLETE = "complete",
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  owner: string;
  status: TodoStatus;
  created_at: Date;
  updated_at: Date;
}
