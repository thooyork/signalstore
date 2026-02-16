import { Injectable } from '@angular/core';

export interface Page {
  path: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly _pages: Page[] = [
    {
      path: 'todos',
      label: 'Todos',
    },
    {
      path: "forms",
      label: 'Forms',
    }
  ];

  public get pages() {
    return this._pages;
  }
}
