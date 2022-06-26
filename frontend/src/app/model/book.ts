export class Book {
  [key: string]: any;
  _id?: string = '';
  ISBN: string = '';
  author: string = '';
  title: string = '';
  publisher: string = '';
  year: number = 0;
  genre: string = '';
  location: number = 0;
  active: Boolean =  true
}
