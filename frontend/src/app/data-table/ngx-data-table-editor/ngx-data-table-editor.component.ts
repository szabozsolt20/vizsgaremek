import { Component, Input, OnInit } from '@angular/core';

export interface INgxTableColumn { // kiexportálva az ezt felhasználó kompnensek tudják, hogy milyen oszlopokat használok a táblában
  title: string; // fejléce
  key: string; ///adata
  projector?: Function;
}

@Component({
  selector: 'ngx-data-table-editor',
  templateUrl: './ngx-data-table-editor.component.html',
  styleUrls: ['./ngx-data-table-editor.component.scss']
})
export class NgxDataTableEditorComponent<T extends { [x: string]: any }> implements OnInit {

  @Input() list?: T ; // az adatsor, amiket meg akarok jeleníteni: ezt a komnkrét megjelenítést kérő szülő komponenstől kapja

  @Input() columns: INgxTableColumn[] = []; // oszlopaim



  constructor( ) { }

  ngOnInit(): void {
  }

}
