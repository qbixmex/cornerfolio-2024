export interface User {
  id: string;
  name: string;
  email: string;
  type: string;
  jobTitle: string;
  active: string;
  course: string;
  schedule: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  next: string | null;
  previous: string | null;
}

export type UsersList = {
  pagination: Pagination;
  users: User[];
};
