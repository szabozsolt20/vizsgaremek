import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Borrow } from 'src/app/model/borrow';
import { ConfigService } from 'src/app/service/config.service';
import { BorrowService } from 'src/app/service/borrow.service';

@Component({
  selector: 'app-borrow-editor',
  templateUrl: './borrow-editor.component.html',
  styleUrls: ['./borrow-editor.component.scss']
})
export class BorrowEditorComponent implements OnInit {

  item$: Observable<Borrow> = this.activatedRoute.params.pipe(
    switchMap(params => this.borrowService.getOne(params['id'])));

  keys: string[] = Object.keys(new Borrow());

  constructor(
    private borrowService: BorrowService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  update(borrow: Borrow): void {
    this.borrowService.update(borrow).subscribe({
      next: updatedItem => this.location.back(),
      error: err => console.error(err),
    });
  }
  create(borrow: Borrow): void {
    delete borrow._id;
    this.borrowService.create(borrow).subscribe({
      next: createdItem => alert('Item created'),
      error: err => console.error(err),
    });
  }


}
