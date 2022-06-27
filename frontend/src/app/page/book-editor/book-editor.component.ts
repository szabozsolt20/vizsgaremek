import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Book } from 'src/app/model/book';
import { ConfigService } from 'src/app/service/config.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {

  item$: Observable<Book> = this.activatedRoute.params.pipe(
    switchMap(params => this.bookService.getOne(params['id'])));

  keys: string[] = Object.keys(new Book());

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  update(book: Book): void {
    this.bookService.update(book).subscribe({
      next: updatedItem => this.location.back(),
      error: err => console.error(err),
    });
  }
  create(book: Book): void {
    delete book._id;
    this.bookService.create(book).subscribe({
      next: createdItem => alert('Item created'),
      error: err => console.error(err),
    });
  }


}
