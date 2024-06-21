import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormEditComponent } from './order-form-edit.component';

describe('OrderFormEditComponent', () => {
  let component: OrderFormEditComponent;
  let fixture: ComponentFixture<OrderFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
