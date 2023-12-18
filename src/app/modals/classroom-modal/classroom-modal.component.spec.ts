import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomModalComponent } from './classroom-modal.component';

describe('ClassroomModalTsComponent', () => {
  let component: ClassroomModalComponent;
  let fixture: ComponentFixture<ClassroomModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomModalComponent]
    });
    fixture = TestBed.createComponent(ClassroomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
