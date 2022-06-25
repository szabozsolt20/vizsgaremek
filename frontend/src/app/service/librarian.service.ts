import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Librarian } from '../model/librarian';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService  extends BaseService<Librarian>  {

  constructor(
    http: HttpClient,
  ) {
    super(http, 'librarian'); // a base.service-nek entityName és HttpClient átadása
  }
}
