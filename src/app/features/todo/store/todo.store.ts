import { signalStore, withMethods, withState, patchState, withComputed } from '@ngrx/signals';
import { Todo } from '../model/todo.model';
import { TodosService } from '../service/todos.service';
import { computed, inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all',
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withDevtools('todos'),
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({

    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todosService.getTodos();
      patchState(store, { todos, loading: false });
    },

    async addTodo(title: string) {
      const todo = await todosService.addTodo({ title, completed: false });
      patchState(store, (state) => ({
        todos: [...state.todos, todo],
      }));
    },

    async deleteTodo(id: string) {
      await todosService.deleteTodo(id);
      patchState(store, (state) => ({
        todos: state.todos.filter(todo => todo.id !== id),
      }));
    },

   async updateTodo(id: string, completed: boolean) {
    await todosService.updateTodo(id, completed);
    patchState(store, (state) => ({
      todos: state.todos.map(todo => todo.id === id ? { ...todo, completed } : todo),
    }));
   },

   updateFilter(filter: TodosFilter) {
    patchState(store, { filter });
   },

  })),
  withComputed((store)=>({
    filteredTodos: computed(()=> {
        return store.todos().filter(todo => {
            if (store.filter() === 'all') {
                return true;
            }
            if (store.filter() === 'pending') {
                return !todo.completed;
            }
            return todo.completed;
        });
    })
  }))
);
