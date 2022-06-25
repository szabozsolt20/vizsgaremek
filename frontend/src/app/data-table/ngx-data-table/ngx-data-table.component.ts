import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface INgxTableColumn { // kiexportálva az ezt felhasználó kompnensek tudják, hogy milyen oszlopokat használok a táblában
  title: string; // fejléce
  key: string; ///adata
  projector?: Function;
}

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss']
})
export class NgxDataTableComponent<T extends {[x: string]: any}> implements OnInit { // a szokásos: a kulcsok (indexelhető)stringek, az érték, meg bármi

  @Input() list: T[] = []; // az adatsor, amiket meg akarok jeleníteni: ezt a komnkrét megjelenítést kérő szülő komponenstől kapja

  @Input() columns: INgxTableColumn[] = []; // oszlopaim

  @Output() onEdit: EventEmitter<T> = new EventEmitter();

  pageSize: number = 10;

  startSlice: number = 0;

  endSlice: number = 10;

  page: number = 1;

  get pageList(): number[] {
    const pageSize = Math.ceil( this.list.length / this.pageSize );
    return new Array(pageSize).fill(1).map( (item, index) => index + 1 );
  }

  constructor() { }

  ngOnInit(): void {
  }

  jumpToPage(pageNum: number): void {
    this.page = pageNum;
    this.startSlice = this.pageSize * (pageNum - 1);
    this.endSlice = this.startSlice + this.pageSize;
  }

  raiseEdit(entity: T): void {
    this.onEdit.emit(entity);
  }

}
