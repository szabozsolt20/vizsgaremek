import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { UnfoldPipe } from '../pipe/unfold.pipe';
import { NgxDataTableEditorComponent } from './ngx-data-table-editor/ngx-data-table-editor.component';


@NgModule({
  declarations: [
    NgxDataTableComponent,
    UnfoldPipe,
    NgxDataTableEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxDataTableComponent,
    NgxDataTableEditorComponent,
  ],
})
export class DataTableModule { }
