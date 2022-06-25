import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { combineLatest } from 'rxjs';
import { User } from 'src/app/model/user';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  columns = this.config.userTableColumns;  // a congfigban lesz minden minden a tála adatszerkezetésől (oszlopok fejléc, és adat tartalma)

  list$ = this.userService.getAll();

  categories$ = this.categoryService.getAll();

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private categoryService: CategoryService, // hogy category-kat be tudjunk szúrni
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(user: User): void {
    this.router.navigate(['/', 'user', 'edit', user._id]);
  }

  // Seed-eléshez itt hagyom lehetőségnek
  // createCategories(): void {
  //   combineLatest([ // amikor mindegyik elkészült, összefogja őket
  //     this.categoryService.create({name: 'Háztartás', description: 'konyhai cuccok'}),
  //     this.categoryService.create({name: 'Barkács', description: ' barkács cuccok'}),
  //     this.categoryService.create({name: 'Egészség', description: 'mama cuccok'}),
  //   ]).subscribe(
  //     () => console.log('Categories have been created.'),
  //   );
  // }
}
