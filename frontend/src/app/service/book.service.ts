import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BookService  extends BaseService<Book>  {

  constructor(
    http: HttpClient,
  ) {
    super(http, 'book'); // a base.service-nek entityName és HttpClient átadása
  }
}
