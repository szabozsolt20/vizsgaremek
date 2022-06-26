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


  constructor(
    private config: ConfigService,
    private librarianService: LibrarianService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(librarian: Librarian): void {
    this.router.navigate(['/', 'librarian', 'edit', librarian._id]);
  }

}
