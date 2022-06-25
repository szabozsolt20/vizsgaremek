import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { combineLatest } from 'rxjs';
import { Borrow } from 'src/app/model/borrow';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { BorrowService } from 'src/app/service/borrow.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {
  columns = this.config.borrowTableColumns;  // a congfigban lesz minden minden a tála adatszerkezetésől (oszlopok fejléc, és adat tartalma)

  list$ = this.borrowService.getAll();

  categories$ = this.categoryService.getAll();

  constructor(
    private config: ConfigService,
    private borrowService: BorrowService,
    private categoryService: CategoryService, // hogy category-kat be tudjunk szúrni
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(borrow: Borrow): void {
    this.router.navigate(['/', 'borrow', 'edit', borrow._id]);
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
