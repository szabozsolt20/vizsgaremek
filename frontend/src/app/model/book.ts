export class Book {
  _id?: string = '';
  ISBN: string = '';
  author: string = '';
  title: string = '';
  publisher: string = '';
  year: number = 0;
  genre: string = '';
  member_id?:  string = '';
  location: number = 0;
  active: Boolean =  true
}
