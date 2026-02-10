import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock-data";
import { Todo } from "../model/todo.model";


async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable({
    providedIn: 'root'
})
export class TodosService {

   
    async getTodos() {
        await sleep(2000);
        return TODOS;
    }

    async addTodo(todo: Partial<Todo>): Promise<Todo> {
        await sleep(50);
        return {  
            id: Math.random().toString(36).substring(2, 15),
            ...todo
        } as Todo;
    }

    async deleteTodo(id: string): Promise<void> {
        await sleep(50);
    }

    async updateTodo(id: string, completed: boolean): Promise<void> {
        await sleep(50);
    }

}