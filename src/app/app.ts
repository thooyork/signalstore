import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todo.store';
import { TODOS } from './model/mock-data';
import { CommonModule } from '@angular/common';
import { TodosList } from './todos-list/todos-list';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TodosList, MatSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  protected readonly title = signal('signalstore');

  store = inject(TodosStore);


  ngOnInit(): void {
   
   this.loadTodos().then(() => {
    console.log(this.store.todos());
   });

  }

  async loadTodos() {
    await this.store.loadAll();
  }


}
