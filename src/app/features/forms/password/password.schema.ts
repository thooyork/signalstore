import { schema, validateTree } from '@angular/forms/signals';
import { IPasswords } from './password.model';

export const passwordSchema = schema<IPasswords>((f) => {
  validateTree(f, ({ value, fieldTreeOf }) => {
    return value().password === value().confirmPassword
      ? undefined
      : [
          { fieldTree: fieldTreeOf(f.confirmPassword), kind: 'passwordmatch', message: 'Passwords do not match' },
          { fieldTree: fieldTreeOf(f.password), kind: 'passwordmatch', message: 'Passwords do not match' },
        ];
  });
});
