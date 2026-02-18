import { signal } from "@angular/core";

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
    cardNumber: string;
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
    cardNumber: '',
});