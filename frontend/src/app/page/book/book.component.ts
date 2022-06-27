import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { ConfigService } from 'src/app/service/config.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  columns = this.config.bookTableColumns;

  list$ = this.bookService.getAll();

  constructor(
    private config: ConfigService,
    private bookService: BookService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(book: Book): void {
    this.router.navigate(['/', 'book', 'edit', book._id]);
  }

  startDelete(book_id: string): void {
    this.bookService.delete(book_id).subscribe({
      next: deletedItem =>  {alert("Item deleted"); this.list$ = this.bookService.getAll()},
      error: err => console.error(err),
    });

  }
}
