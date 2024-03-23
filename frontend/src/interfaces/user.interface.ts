export interface User {
  id: string;
  course: string;
  createdAt: string;
  email: string;
  imageUrl: string;
  jobTitle : string;
  name: string;
  schedule: string;
  updatedAt: string;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}
