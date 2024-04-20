import { License } from "@/interfaces";

export interface User {
  name: string;
  email: string;
  image: File | string;
  type: string;
  jobTitle: string;
  active: boolean;
  course: string;
  schedule: string;
  startDate: string;
  endDate: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  image?: File;
  type?: string;
  jobTitle?: string;
  active?: boolean;
  course?: string;
  schedule?: string;
  startDate?: string;
  endDate?: string;
}

export interface UserPassword {
  password: string;
  passwordConfirmation: string;
}

export interface UserResponse extends User {
  id: string;
  imageUrl: string;
  license: License;
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

export type UsersSearch = {
  message: string;
  users: UserResponse[];
};

export type UsersList = {
  pagination: Pagination;
  users: UserResponse[];
};
