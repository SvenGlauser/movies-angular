import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewTvComponent} from './view-tv.component';

describe('ViewTvComponent', () => {
  let component: ViewTvComponent;
  let fixture: ComponentFixture<ViewTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
