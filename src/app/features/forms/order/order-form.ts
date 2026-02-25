import { Component, computed, effect, afterNextRender } from '@angular/core';
import { FormField, ValidationError, form, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { OrderFormModel } from './order-form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { orderFormSchema } from './order-form.schema';
import { MatIconModule } from '@angular/material/icon';
import { CreditcardForm } from '../creditcard/creditcard-form';
import { hasError } from '../shared/has-error';
import { PasswordForm } from '../password/password-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'order-form',
  imports: [
    FormField,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    CreditcardForm,
    PasswordForm,
    MatProgressSpinnerModule,
  ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
})
export class OrderForm {
  public orderForm = form(OrderFormModel, orderFormSchema);

  public hasError = hasError;

  constructor() {
    afterNextRender(() => {
      this.orderForm.name().focusBoundControl();
    });
   


    effect(() => {
      if (this.orderForm.creditcardinformation().hidden()) {
        this.orderForm.creditcardinformation().reset({
          name: '',
          number: '',
          expirationDate: '',
          cvv: '',
          type: '',
        });
      }
    });
  }

  stateSummary = computed(() => {
    const state = this.orderForm();
    return {
      value: state.value(),
      valid: state.valid(),
      dirty: state.dirty(),
      touched: state.touched(),
    };
  });

  public submitForm(e: Event) {
    e.preventDefault();

    submit(this.orderForm, async (form) => {
      try {
        const delay = new Promise((resolve) => setTimeout(resolve, 2500));
        await delay;
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(form().value()),
        });
        // console.log('payload ----->', this.orderForm().value());
        console.log('response -----> ', await response.json());
        return undefined;
      } catch (error) {
        return { message: 'Failed to submit form', kind: 'submit' } as ValidationError;
      }
    });
  }
}
