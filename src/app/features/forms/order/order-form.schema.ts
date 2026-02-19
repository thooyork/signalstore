import { required, schema, apply, hidden, readonly, disabled } from '@angular/forms/signals';
import { IOrderForm, PaymentMethod } from './order-form.model';
import { emailSchema } from '../shared/email.schema';
import { passwordSchema } from '../password/password.schema';
import { creditcardSchema } from '../creditcard/creditcard.schema';

export const orderFormSchema = schema<IOrderForm>((f) => {
  required(f.name, { message: 'Name is required' });

  apply(f.email, emailSchema);

  apply(f, passwordSchema);

  hidden(f.creditcardinformation, (ctx) => {
    return ctx.valueOf(f.paymentMethod) !== PaymentMethod.Card;
  });

  disabled(f.totalAmount, (ctx) => {
    return true;
  });

  apply(f.creditcardinformation, creditcardSchema);
});
