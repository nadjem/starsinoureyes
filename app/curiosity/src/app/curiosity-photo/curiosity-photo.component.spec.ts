import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriosityPhotoComponent } from './curiosity-photo.component';

describe('CuriosityPhotoComponent', () => {
  let component: CuriosityPhotoComponent;
  let fixture: ComponentFixture<CuriosityPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuriosityPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriosityPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
