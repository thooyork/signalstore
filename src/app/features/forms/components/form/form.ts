import { Component, computed, signal } from '@angular/core';
import { FormField, ValidationError, form, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { IOrderForm, OrderFormModel } from '../../model/form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { orderSchema } from '../../schemas/order-schema';

@Component({
  selector: 'form',
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatIconModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  orderForm = form(OrderFormModel, orderSchema);

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  toggleShowPassword() {
    this.showPassword.update(val => !val);
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword.update(val => !val);
  }

  hasError(field: keyof IOrderForm, kind: string): boolean {
    return this.orderForm[field]().errors().some(e => e.kind === kind);
  }

  stateSummary = computed(() => {
    const state = this.orderForm();
    return {
      value: state.value(),
      valid: state.valid(),
      dirty: state.dirty(),
      touched: state.touched(),
      fields: {
        name: {
          value: this.orderForm.name().value(),
          errors: this.orderForm.name().errors().map(e => ({ kind: e.kind, message: e.message })),
        },
        email: {
          value: this.orderForm.email().value(),
          errors: this.orderForm.email().errors().map(e => ({ kind: e.kind, message: e.message })),
        },
      },
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
        console.log("payload ----->", this.orderForm().value());
        console.log("response -----> ", await response.json());
        return undefined;
      } catch (error) {
        return { message: 'Failed to submit form', kind: "submit" } as ValidationError;
      }
    });
  }
}
