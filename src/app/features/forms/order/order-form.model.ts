import { signal } from "@angular/core";
import { ICreditCardInformation } from "../creditcard/creditcard.model";

export enum PaymentMethod {
    Cash = 'cash',
    Card = 'card',
}

export interface IOrderForm {
    name: string;
    email: string;
    street: string;
    city: string;
    zip: string;
    password: string;
    confirmPassword: string;
    paymentMethod: string;
    creditcardinformation: ICreditCardInformation;
    totalAmount: string;
}

export const OrderFormModel = signal<IOrderForm>({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: '',
    password: '',
    confirmPassword: '',
    paymentMethod: PaymentMethod.Cash,
    creditcardinformation: {
        name: '',
        number: '',
        expirationDate: '',
        cvv: '',
        type: '',
    },
    totalAmount: '150.00',
});
