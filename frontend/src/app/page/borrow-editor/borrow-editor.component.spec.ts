import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowEditorComponent } from './borrow-editor.component';

describe('BorrowEditorComponent', () => {
  let component: BorrowEditorComponent;
  let fixture: ComponentFixture<BorrowEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
