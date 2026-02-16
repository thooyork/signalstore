import { Component } from '@angular/core';
import { FieldTree, FormField, ValidationError, email, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { OrderFormModel } from '../../model/form.model';
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

  public submitForm(e: Event) {
    e.preventDefault();
    console.log(this.orderForm().value());
  }
}
