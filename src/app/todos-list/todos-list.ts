import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, inject, viewChild, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TodosFilter, TodosStore } from '../store/todo.store';
import { MatListOption } from '@angular/material/list';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'todos-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatSuffix,
    MatButton,
    MatButtonToggleModule,
    MatListOption,
    MatListModule,
  ],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
  standalone: true,
})
export class TodosList {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
 
  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      this.filter().value = this.store.filter();
    });
  }

  store = inject(TodosStore);

  async addTodo(title: string) {
    this.input.nativeElement.value = '';
    await this.store.addTodo(title);
  }

  async deleteTodo(id: string, evt: MouseEvent) {
    evt.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async toggleTodo(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }

  updateFilter(event: MatButtonToggleChange) {
    this.store.updateFilter(event.value as TodosFilter);
  }
}
