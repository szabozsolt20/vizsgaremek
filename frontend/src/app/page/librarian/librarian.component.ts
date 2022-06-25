import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { combineLatest } from 'rxjs';
import { Librarian } from 'src/app/model/librarian';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { LibrarianService } from 'src/app/service/librarian.service';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.scss']
})
export class LibrarianComponent implements OnInit {
  columns = this.config.librarianTableColumns;  // a congfigban lesz minden minden a tála adatszerkezetésől (oszlopok fejléc, és adat tartalma)

  list$ = this.librarianService.getAll();

  categories$ = this.categoryService.getAll();

  constructor(
    private config: ConfigService,
    private librarianService: LibrarianService,
    private categoryService: CategoryService, // hogy category-kat be tudjunk szúrni
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(librarian: Librarian): void {
    this.router.navigate(['/', 'librarian', 'edit', librarian._id]);
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
