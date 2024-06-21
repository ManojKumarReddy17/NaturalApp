import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDsrComponent } from './add-dsr.component';

describe('AddDsrComponent', () => {
  let component: AddDsrComponent;
  let fixture: ComponentFixture<AddDsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDsrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
