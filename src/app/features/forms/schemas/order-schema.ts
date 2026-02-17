import { email, required, schema } from "@angular/forms/signals";
import { IOrderForm } from "../model/form.model";


export const orderSchema = schema<IOrderForm>((f)=>{
    required(f.name,{message: 'Name is required' });
    required(f.email,{message: 'Email is required' });
    email(f.email,{message: 'Invalid email address' });
});