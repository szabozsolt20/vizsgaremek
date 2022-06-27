import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/model/member';
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

  constructor(
    private config: ConfigService,
    private memberService: MemberService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  startEdit(member: Member): void {
    this.router.navigate(['/', 'member', 'edit', member._id]);
  }

  startDelete(member_id: string): void {
    this.memberService.delete(member_id).subscribe({
      next: deletedItem =>  {alert("Item deleted"); this.list$ = this.memberService.getAll()},
      error: err => console.error(err),
    });

  }

}
