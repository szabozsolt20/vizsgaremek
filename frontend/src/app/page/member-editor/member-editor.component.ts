import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Member } from 'src/app/model/member';
import { ConfigService } from 'src/app/service/config.service';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-member-editor',
  templateUrl: './member-editor.component.html',
  styleUrls: ['./member-editor.component.scss']
})
export class MemberEditorComponent implements OnInit {

  item$: Observable<Member> = this.activatedRoute.params.pipe(
    switchMap(params => this.memberService.getOne(params['id'])));

  keys: string[] = Object.keys(new Member());

  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  update(member: Member): void {
    this.memberService.update(member).subscribe({
      next: updatedItem => this.location.back(),
      error: err => console.error(err),
    });
  }
  create(member: Member): void {
    delete member._id;
    this.memberService.create(member).subscribe({
      next: createdItem => alert('Item created'),
      error: err => console.error(err),
    });
  }


}
