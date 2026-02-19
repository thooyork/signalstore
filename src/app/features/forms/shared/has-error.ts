import { FieldTree } from '@angular/forms/signals';

export const hasError = <T extends Record<string, any>>(form: FieldTree<T>, field: keyof T & string, kind: string): boolean => {
  return (form as any)[field]().errors().some((e: any) => e.kind === kind);
}
