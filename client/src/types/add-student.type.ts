import { Student } from "./student.type";

export type FormStateType = Omit<Student, "id"> | Student;

export const initialFormState: FormStateType = {
  avatar: "",
  email: "",
  btc_address: "",
  country: "",
  first_name: "",
  gender: "other",
  last_name: "",
};

export type FormError =
  | {
      [key in keyof FormStateType]: string;
    }
  | null;

export const gender = {
  male: "Male",
  female: "Female",
  other: "Other",
};
