import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CastTvComponent} from './cast-tv.component';

describe('CastTvComponent', () => {
  let component: CastTvComponent;
  let fixture: ComponentFixture<CastTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
