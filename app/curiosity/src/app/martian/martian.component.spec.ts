import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MartianComponent } from './martian.component';

describe('MartianComponent', () => {
  let component: MartianComponent;
  let fixture: ComponentFixture<MartianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MartianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MartianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
