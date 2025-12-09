import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderWrapper } from './sales-order-wrapper';

describe('SalesOrderWrapper', () => {
  let component: SalesOrderWrapper;
  let fixture: ComponentFixture<SalesOrderWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
