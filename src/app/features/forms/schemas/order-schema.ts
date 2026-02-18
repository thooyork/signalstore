import { email, hidden, required, schema, validate, validateTree, metadata, apply } from '@angular/forms/signals';
import { IOrderForm, PaymentMethod } from '../model/form.model';
import * as cardvalidator from 'card-validator';
import { createMetadataKey } from '@angular/forms/signals';
import { emailSchema } from './email.schema';
import { passwordSchema } from './password.schema';

export const CARD_TYPE = createMetadataKey<string>();

export const orderSchema = schema<IOrderForm>((f) => {
  required(f.name, { message: 'Name is required' });
  
  apply(f.email, emailSchema);
  
  apply(f, passwordSchema);

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
