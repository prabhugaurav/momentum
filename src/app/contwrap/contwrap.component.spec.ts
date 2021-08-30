import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContwrapComponent } from './contwrap.component';

describe('ContwrapComponent', () => {
  let component: ContwrapComponent;
  let fixture: ComponentFixture<ContwrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContwrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContwrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
