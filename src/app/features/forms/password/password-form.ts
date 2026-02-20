import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IPasswords } from './password.model';
import { hasError } from '../shared/has-error';

@Component({
  selector: 'password-form',
  imports: [FormField, MatFormFieldModule, MatInputModule, CommonModule, MatIconModule],
  templateUrl: './password-form.html',
  styleUrl: './password-form.scss',
})
export class PasswordForm {
  public readonly subform = input.required<FieldTree<IPasswords>>();
  public hasError = hasError;
  public showPassword = signal(false);
  public showConfirmPassword = signal(false);

  public toggleShowPassword() {
    this.showPassword.update((val) => !val);
  }

  public toggleShowConfirmPassword() {
    this.showConfirmPassword.update((val) => !val);
  }
}
