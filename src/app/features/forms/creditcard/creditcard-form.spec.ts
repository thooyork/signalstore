import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardinformationForm } from './creditcard-form';

describe('CreditcardinformationForm', () => {
  let component: CreditcardinformationForm;
  let fixture: ComponentFixture<CreditcardinformationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditcardinformationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardinformationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
