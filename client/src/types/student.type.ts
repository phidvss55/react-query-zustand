export interface Student {
  id: number;
  last_name: string;
  first_name: string;
  gender: string;
  country: string;
  email: string;
  avatar: string;
  btc_address: string;
}

export type Students = Pick<Student, "id" | "email" | "avatar" | "last_name">[];

export interface StudentsApiResult {
  currentPage: number;
  data: Students;
  message: string;
  status: number;
  totalPages: number;
}
