import { Component, computed, effect } from '@angular/core';
import { FieldTree, FormField, ValidationError, email, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { IOrderForm, OrderFormModel } from '../../model/form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form',
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  orderForm = form(OrderFormModel, (f)=>{
    required(f.name,{message: 'Name is strictly  required' });

    required(f.email,{message: 'Email is required' });
    email(f.email,{message: 'Invalid email' });
  });

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
    console.log(this.orderForm().value());
  }
}
