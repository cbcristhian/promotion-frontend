export type UserRole = 'ADMIN' | 'RESIDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
