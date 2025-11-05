import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopCardComponent } from './pop-card.component';

describe('PopCardComponent', () => {
  let component: PopCardComponent;
  let fixture: ComponentFixture<PopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
