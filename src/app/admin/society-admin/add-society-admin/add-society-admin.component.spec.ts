import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocietyAdminComponent } from './add-society-admin.component';

describe('AddSocietyAdminComponent', () => {
  let component: AddSocietyAdminComponent;
  let fixture: ComponentFixture<AddSocietyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSocietyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocietyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
