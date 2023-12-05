import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPaymentComponent } from './after-payment.component';

describe('AfterPaymentComponent', () => {
  let component: AfterPaymentComponent;
  let fixture: ComponentFixture<AfterPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfterPaymentComponent]
    });
    fixture = TestBed.createComponent(AfterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
