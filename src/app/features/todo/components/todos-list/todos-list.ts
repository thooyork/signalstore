import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TodosFilter, TodosStore } from '../../store/todo.store';
import { MatListModule, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'todos-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatSuffix,
    MatButtonToggleModule,
    MatListModule,
    MatListOption,
    MatProgressSpinner,
  ],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
  standalone: true,
})
export class TodosList implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos().then(() => {
      //console.log(this.store.todos());
    });
  }

  filter = viewChild(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filterEl = this.filter();
      if (filterEl) {
        filterEl.value = this.store.filter();
      }
    });
  }

  async loadTodos() {
    await this.store.loadAll();
  }

  async addTodo(title: string) {
    this.input.nativeElement.value = '';
    await this.store.addTodo(title);
  }

  async deleteTodo(id: string, evt: MouseEvent) {
    evt.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onSelectionChange(event: MatSelectionListChange) {
    for (const option of event.options) {
      await this.store.updateTodo(option.value.id, option.selected);
    }
  }

  updateFilter(event: MatButtonToggleChange) {
    this.store.updateFilter(event.value as TodosFilter);
  }
}
