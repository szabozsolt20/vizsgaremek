import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Borrow } from '../model/borrow';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowService  extends BaseService<Borrow>  {

  constructor(
    http: HttpClient,
  ) {
    super(http, 'borrow'); // a base.service-nek entityName és HttpClient átadása
  }
}
