import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  columns = this.config.userTableColumns;

  list$ = this.userService.getAll();


  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(user: User): void {
    this.router.navigate(['/', 'user', 'edit', user._id]);
  }

  startDelete(user_id: string): void {
    this.userService.delete(user_id).subscribe({
      next: deletedItem => { alert("Item deleted"); this.list$ = this.userService.getAll()},
      error: err => console.error(err),
    });

  }

}
