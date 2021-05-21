import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostUpdateComponent } from './admin-post-update.component';

describe('AdminPostUpdateComponent', () => {
  let component: AdminPostUpdateComponent;
  let fixture: ComponentFixture<AdminPostUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
