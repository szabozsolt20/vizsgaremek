import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BaseService<User>  {

  constructor(
    http: HttpClient,
  ) {
    super(http, 'user'); // a base.service-nek entityName és HttpClient átadása
  }
}
