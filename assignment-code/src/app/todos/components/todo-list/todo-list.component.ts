import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ITodosState } from "../../state/todos.reducer";
import { allFilteredTodos } from "../../state/todo.selectors";
import {TodosService} from "../../services/todos.service";

@Component({
  selector: "app-todos-list",
  styleUrls: ["./todo-list.component.scss"],
  templateUrl: "./todo-list.component.html",
})
export class TodosListComponent {
  todoList:any[];
  constructor(private store: Store<ITodosState>, private todosService: TodosService) {}

  ngOnInit() {
    this.store.pipe(select(allFilteredTodos)).subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  updateTodo(indx){
    this.todosService.toggleComplete(indx);
  }

  removeTodo(indx){
    this.todosService.removeTodo(indx);
  }
}
