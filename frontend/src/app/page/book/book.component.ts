import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { combineLatest } from 'rxjs';
import { Book } from 'src/app/model/book';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  columns = this.config.bookTableColumns;  // a congfigban lesz minden minden a tála adatszerkezetésől (oszlopok fejléc, és adat tartalma)

  list$ = this.bookService.getAll();

  categories$ = this.categoryService.getAll();

  constructor(
    private config: ConfigService,
    private bookService: BookService,
    private categoryService: CategoryService, // hogy category-kat be tudjunk szúrni
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(book: Book): void {
    this.router.navigate(['/', 'book', 'edit', book._id]);
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
