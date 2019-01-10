import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSaPasswordComponent } from './change-sa-password.component';

describe('ChangeSaPasswordComponent', () => {
  let component: ChangeSaPasswordComponent;
  let fixture: ComponentFixture<ChangeSaPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSaPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
