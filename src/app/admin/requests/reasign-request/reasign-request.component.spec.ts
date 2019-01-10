import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignRequestComponent } from './reasign-request.component';

describe('ReasignRequestComponent', () => {
  let component: ReasignRequestComponent;
  let fixture: ComponentFixture<ReasignRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasignRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasignRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
