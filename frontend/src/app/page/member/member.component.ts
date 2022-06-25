import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { combineLatest } from 'rxjs';
import { Member } from 'src/app/model/member';
import { CategoryService } from 'src/app/service/category.service';
import { ConfigService } from 'src/app/service/config.service';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  columns = this.config.memberTableColumns;  // a congfigban lesz minden minden a tála adatszerkezetésől (oszlopok fejléc, és adat tartalma)

  list$ = this.memberService.getAll();

  categories$ = this.categoryService.getAll();

  constructor(
    private config: ConfigService,
    private memberService: MemberService,
    private categoryService: CategoryService, // hogy category-kat be tudjunk szúrni
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(member: Member): void {
    this.router.navigate(['/', 'member', 'edit', member._id]);
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
