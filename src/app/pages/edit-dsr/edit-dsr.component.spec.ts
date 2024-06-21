import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDsrComponent } from './edit-dsr.component';

describe('EditDsrComponent', () => {
  let component: EditDsrComponent;
  let fixture: ComponentFixture<EditDsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDsrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
