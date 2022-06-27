import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Borrow } from 'src/app/model/borrow';
import { ConfigService } from 'src/app/service/config.service';
import { BorrowService } from 'src/app/service/borrow.service';
import { map } from 'rxjs';
// import { combineLatest } from 'rxjs';
// import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {
  columns = this.config.borrowTableColumns;

  list$ = this.borrowService.getAll();

  ngOnInit(): void {
  }
  startEdit(borrow: Borrow): void {
    this.router.navigate(['/', 'borrow', 'edit', borrow._id]);
  }

  startDelete(borrow_id: string): void {
    this.borrowService.delete(borrow_id).subscribe({
      next: deletedItem =>  {alert("Item deleted"); this.list$ = this.borrowService.getAll()},
      error: err => console.error(err),
    });

  }
  constructor(
    private config: ConfigService,
    private borrowService: BorrowService,
   // private categoryService: CategoryService, // hogy category-kat be tudjunk szúrni
    private router: Router,
  ) { }

  //.pipe(map(list => list.map(borrow => {
  //borrow.(col=> {if (col.projector) {col.key=col.projector(col)}});
  // return {...borrow, member_id: borrow?.member_id.name}
  // return borrow;
  //})));
  // categories$ = this.categoryService.getAll();


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
