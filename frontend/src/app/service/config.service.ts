import { Injectable } from '@angular/core';
import { INgxTableColumn } from '../data-table/ngx-data-table/ngx-data-table.component';

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  sidebarMenu: IMenuItem[] = [
    {link: '/', title: 'Home', icon: 'home'},
   // {link: '/product', title: 'Products', icon: 'archive'},
    {link: '/book', title: 'Books', icon: 'book'},
    {link: '/borrow', title: 'Borrows', icon: 'upload'},
    {link: '/librarian', title: 'Librarians', icon: 'user-check'},
    {link: '/member', title: 'Members', icon: 'users'},
    {link: '/user', title: 'Users', icon: 'user'},
    {link: '/seed', title: 'SEED', icon: 'user'},
  ];

  productTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'name', title: 'Name'},
    {key: 'description', title: 'Desc.'},
    {key: 'price', title: 'Price'},
    {key: 'active', title: 'Active'},
  ];

  bookTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'ISBN', title: 'ISBN'},
    {key: 'author', title: 'Author'},
    {key: 'title', title: 'Title'},
    {key: 'publisher', title: 'Publisher'},
    {key: 'year', title: 'Year'},
    {key: 'genre', title: 'Genre'},
    {key: 'location', title: 'Location'},
    {key: 'active', title: 'Active'},
  ];

  borrowTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'date', title: 'Date'},
    // {key: 'member_id', title: 'Member'},
    {key: 'member_id', title: 'Member', projector: (row: { member_id: { name: string; }; }) => row.member_id?.name,},
    {key: 'book_ids', title: 'Books'},
    {key: 'active', title: 'Active'},
  ];

  librarianTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'name', title: 'Name'},
    {key: 'username', title: 'User name'},
    {key: 'location', title: 'Location'},
    {key: 'role', title: 'Role'},
    {key: 'phone', title: 'Phone'},
    {key: 'active', title: 'Active'},
  ];

  memberTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'name', title: 'Name'},
    {key: 'uid', title: 'User id'},
    {key: 'mother', title: 'Mother name'},
    {key: 'birthplace', title: 'Birthplace'},
    {key: 'birthdate', title: 'Birthdate'},
    {key: 'address', title: 'Address'},
    {key: 'email', title: 'Email'},
    {key: 'phone', title: 'Phone'},
    {key: 'active', title: 'Active'},
  ];
  userTableColumns: INgxTableColumn[] = [
    {key: '_id', title: '#'},
    {key: 'email', title: 'Email'},
    {key: 'lastName', title: 'Last name'},
    {key: 'firstName', title: 'First name'},
    {key: 'password', title: 'Password'},
  ];

  constructor() { }
}
