import { afterNextRender, Component, effect, input } from '@angular/core';
import { FieldTree, FormField, metadata } from '@angular/forms/signals';
import { ICreditCardInformation } from './creditcard.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CARD_TYPE } from './creditcard.schema';
import { hasError } from '../shared/has-error';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'creditcard-form',
  imports: [
    FormField,
    MatInputModule,
    MatFormFieldModule,
    CommonModule
  ],
  templateUrl: './creditcard-form.html',
  styleUrl: './creditcard-form.scss',
})
export class CreditcardForm {
  public readonly CARD_TYPE = CARD_TYPE;
  
  public readonly subform = input.required<FieldTree<ICreditCardInformation>>();

  public hasError = hasError;

  constructor() {

    afterNextRender(() => {
      this.subform().name().focusBoundControl();
    });
    
    effect(() => {
      const cardType = this.subform().number().metadata(CARD_TYPE)?.();
      this.subform().type().value.set(cardType ?? '');
    });
  }


}
