import { email, hidden, required, schema, validate, validateTree, metadata } from '@angular/forms/signals';
import { IOrderForm, PaymentMethod } from '../model/form.model';
import * as cardvalidator from 'card-validator';
import { createMetadataKey } from '@angular/forms/signals';

export const CARD_TYPE = createMetadataKey<string>();

export const orderSchema = schema<IOrderForm>((f) => {
  required(f.name, { message: 'Name is required' });
  required(f.email, { message: 'Email is required' });
  email(f.email, { message: 'Invalid email address' });

  validateTree(f, ({value, fieldTreeOf})=>{
    return value().password === value().confirmPassword
      ? undefined
      : [
        { fieldTree: fieldTreeOf(f.confirmPassword), kind: 'passwordmatch', message: 'Passwords do not match' },
        { fieldTree: fieldTreeOf(f.password), kind: 'passwordmatch', message: 'Passwords do not match' },
      ];
  });

  // required(f.cardNumber, { 
  //   when: (ctx) => {
  //     return ctx.valueOf(f.paymentMethod) === PaymentMethod.Card;
  //   }
  //  });

  required(f.cardNumber);
  hidden(f.cardNumber, (ctx) => {
    return ctx.valueOf(f.paymentMethod) !== PaymentMethod.Card;
  });

   validate(f.cardNumber, (ctx) => {
    const options = {
      maxLength: 16,
      luhnValidateUnionPay: true,
      skipLuhnValidation: false,
    };
    
    console.log(cardvalidator.number(ctx.value(), options).card?.type ?? 'unknown');

    return cardvalidator.number(ctx.value(), options).isValid
      ? undefined
      : { kind: 'cardnumberlength', message: 'Card number must be 16 digits long' };
   });

   metadata(f.cardNumber, CARD_TYPE, (ctx) => {
    const result = cardvalidator.number(ctx.value());
    return result.card?.type ?? 'unknown';
  });
});
