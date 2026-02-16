import { Component } from '@angular/core';
import { FieldTree, FormField, ValidationError, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { OrderFormModel } from '../../model/form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'form',
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  orderForm = form(OrderFormModel, (f)=>{
    required(f.name,{message: 'Name is required' });
  });

  public submitForm(e: Event) {
    e.preventDefault();
    console.log(this.orderForm().value());
  }
}
