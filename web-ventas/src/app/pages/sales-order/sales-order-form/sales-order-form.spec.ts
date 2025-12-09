import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderForm } from './sales-order-form';

describe('SalesOrderForm', () => {
  let component: SalesOrderForm;
  let fixture: ComponentFixture<SalesOrderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
