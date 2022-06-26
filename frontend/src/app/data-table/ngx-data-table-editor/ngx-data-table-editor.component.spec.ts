import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDataTableEditorComponent } from './ngx-data-table-editor.component';

describe('NgxDataTableEditorComponent', () => {
  let component: NgxDataTableEditorComponent;
  let fixture: ComponentFixture<NgxDataTableEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDataTableEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDataTableEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
