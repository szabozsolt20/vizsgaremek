import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Librarian } from 'src/app/model/librarian';
import { ConfigService } from 'src/app/service/config.service';
import { LibrarianService } from 'src/app/service/librarian.service';

@Component({
  selector: 'app-librarian-editor',
  templateUrl: './librarian-editor.component.html',
  styleUrls: ['./librarian-editor.component.scss']
})
export class LibrarianEditorComponent implements OnInit {

  item$: Observable<Librarian> = this.activatedRoute.params.pipe(
    switchMap(params => this.librarianService.getOne(params['id'])));

  keys: string[] = Object.keys(new Librarian());

  constructor(
    private librarianService: LibrarianService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  update(librarian: Librarian): void {
    this.librarianService.update(librarian).subscribe({
      next: updatedItem => this.location.back(),
      error: err => console.error(err),
    });
  }


}
