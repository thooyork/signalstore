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
    paymentMethod: string;
}

export const OrderFormModel = signal<IOrderForm>({
    name: 'hans wurst',
    email: '',
    street: '',
    city: '',
    zip: '',
    paymentMethod: PaymentMethod.Cash.toString(),
});