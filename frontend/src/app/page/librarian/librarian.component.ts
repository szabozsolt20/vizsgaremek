import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Librarian } from 'src/app/model/librarian';
import { ConfigService } from 'src/app/service/config.service';
import { LibrarianService } from 'src/app/service/librarian.service';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.scss']
})
export class LibrarianComponent implements OnInit {
  columns = this.config.librarianTableColumns;

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

  startDelete(librarian_id: string): void {
    this.librarianService.delete(librarian_id).subscribe({
      next: deletedItem =>  {alert("Item deleted"); this.list$ = this.librarianService.getAll()},
      error: err => console.error(err),
    });

  }
}
