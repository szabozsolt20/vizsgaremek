export class Member {
  _id?: string = '';
  name: string = '';
  uid: number = 0;
  mother: string = '';
  birthplace: string = '';
  birthdate: string = ''; // Date???
  address: string = '';
  email?: string = '';
  phone?: string = '';
  book_ids?: string[] = [];
  active: Boolean = true;
}
