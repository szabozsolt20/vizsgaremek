import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { UnfoldPipe } from '../pipe/unfold.pipe';


@NgModule({
  declarations: [
    NgxDataTableComponent,
    UnfoldPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxDataTableComponent,
  ],
})
export class DataTableModule { }
