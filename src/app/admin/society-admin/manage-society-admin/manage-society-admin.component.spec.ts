import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSocietyAdminComponent } from './manage-society-admin.component';

describe('ManageSocietyAdminComponent', () => {
  let component: ManageSocietyAdminComponent;
  let fixture: ComponentFixture<ManageSocietyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSocietyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSocietyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
