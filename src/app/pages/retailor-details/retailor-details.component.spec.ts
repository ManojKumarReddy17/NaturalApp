import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailorDetailsComponent } from './retailor-details.component';

describe('RetailorDetailsComponent', () => {
  let component: RetailorDetailsComponent;
  let fixture: ComponentFixture<RetailorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailorDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetailorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
