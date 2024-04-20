import { License } from "./license.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  type: "student" | "client" | "admin";
  jobTitle: string;
  active: boolean;
  course: string;
  schedule: "morning" | "afternoon" | "evening";
  startDate: Date;
  endDate: Date;
  license: License;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}
