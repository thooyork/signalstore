import {
  createMetadataKey,
  metadata,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { IOrderForm, PaymentMethod } from '../order/order-form.model';
import * as cardvalidator from 'card-validator';
import { ICreditCardInformation } from './creditcard.model';

export const CARD_TYPE = createMetadataKey<string>();

export const creditcardSchema = schema<ICreditCardInformation>((path) => {
  required(path.name, { message: 'Cardholders name is required' });
  required(path.number, { message: 'Card number is required' });
  required(path.expirationDate, { message: 'Expiration date is required' });
  required(path.cvv, { message: 'CVV is required' });
  required(path.type, { message: 'Card type is required' });

   validate(path.number, (ctx) => {
     const options = {
       maxLength: 16,
       luhnValidateUnionPay: true,
       skipLuhnValidation: false,
     };

   return cardvalidator.number(ctx.value(), options).isValid
       ? undefined
       : { kind: 'cardnumberlength', message: 'Card number must be 16 digits long' };
   });

   metadata(path.number, CARD_TYPE, (ctx) => {
     const result = cardvalidator.number(ctx.value());
     return result.card?.type ?? 'unknown';
   });

   validate(path.cvv, (ctx) => {
    const result = cardvalidator.cvv(ctx.value());
    return result.isValid
      ? undefined
      : { kind: 'cvvlength', message: 'CVV must be 3 digits long' };
   });

   validate(path.expirationDate, (ctx) => {
    const result = cardvalidator.expirationDate(ctx.value());
    return result.isValid
      ? undefined
      : { kind: 'dateformat', message: 'Expiration date must be in the format MM/YY' };
   });
});
