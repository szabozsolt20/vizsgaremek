import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianEditorComponent } from './librarian-editor.component';

describe('LibrarianEditorComponent', () => {
  let component: LibrarianEditorComponent;
  let fixture: ComponentFixture<LibrarianEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
