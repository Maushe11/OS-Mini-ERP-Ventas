import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWrapper } from './user-wrapper';

describe('UserWrapper', () => {
  let component: UserWrapper;
  let fixture: ComponentFixture<UserWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
