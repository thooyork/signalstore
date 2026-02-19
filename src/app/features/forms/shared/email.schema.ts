import { email, required, schema } from "@angular/forms/signals";

export const emailSchema = schema<string>((path) => {
    required(path, { message: 'Email is required' });
    email(path, { message: 'Invalid email address' });
});
