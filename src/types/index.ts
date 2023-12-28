type Id = string | number;
export interface Column {
  id: Id;
  title: string;
  color?: string;
}

export interface Task {
  id: Id;
  columnId: Id;
  title: string;
  color?: string;
}
