import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  item$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap(params => this.userService.getOne(params['id'])));

  keys: string[] = Object.keys(new User());

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  update(user: User): void {
    this.userService.update(user).subscribe({
      next: updatedItem => this.location.back(),
      error: err => console.error(err),
    });
  }
  create(user: User): void {
    delete user._id;
    this.userService.create(user).subscribe({
      next: createdItem => alert('Item created'),
      error: err => console.error(err),
    });
  }


}
