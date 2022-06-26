export class Member {
  [key: string]: any;
  _id?: string = '';
  name: string = '';
  uid: number = 0;
  mother: string = '';
  birthplace: string = '';
  birthdate: string = ''; // Date???
  address: string = '';
  email?: string = '';
  phone?: string = '';
  active: Boolean = true;
}
