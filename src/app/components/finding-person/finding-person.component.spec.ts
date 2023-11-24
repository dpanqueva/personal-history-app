import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingPersonComponent } from './finding-person.component';

describe('FindingPersonComponent', () => {
  let component: FindingPersonComponent;
  let fixture: ComponentFixture<FindingPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindingPersonComponent]
    });
    fixture = TestBed.createComponent(FindingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
