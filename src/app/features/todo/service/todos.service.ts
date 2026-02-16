import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private _todos: Todo[] = [];

  async getTodos() {
    //await sleep(1000);
    this._todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return this._todos;
  }

  async addTodo(todo: Partial<Todo>) {
    // await sleep(50);
    const newTodo = {
      id: Math.random().toString(36).substring(2, 15),
      ...todo,
    } as Todo;
    this._todos = [...this._todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(this._todos));
    return newTodo;
  }

  async deleteTodo(id: string) {
    //await sleep(50);
    this._todos = this._todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(this._todos));
  }

  async updateTodo(id: string, completed: boolean): Promise<void> {
    await sleep(50);
    this._todos = this._todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo));
    localStorage.setItem('todos', JSON.stringify(this._todos));
  }
}
