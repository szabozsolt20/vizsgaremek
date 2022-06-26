export class User {
  [key: string]: any;
  _id?: string = '';
  email: string = '';
  lastName: string = '';
  firstName: string = '';
  password?: string = '';
  role?: number = 1;
}
