import type { PageKey } from "./bmw";

export type UserRole =
  | "Admin"
  | "BMW Officer"
  | "Nurse"
  | "Housekeeping"
  | "CBWTF Operator";

export type DemoUser = {
  name: string;
  role: UserRole;
  allowedPages: PageKey[];
};