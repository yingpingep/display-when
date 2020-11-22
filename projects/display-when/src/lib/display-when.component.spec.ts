import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWhenComponent } from './display-when.component';

describe('DisplayWhenComponent', () => {
  let component: DisplayWhenComponent;
  let fixture: ComponentFixture<DisplayWhenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayWhenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
