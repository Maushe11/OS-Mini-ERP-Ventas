import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWrapper } from './customer-wrapper';

describe('CustomerWrapper', () => {
  let component: CustomerWrapper;
  let fixture: ComponentFixture<CustomerWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
