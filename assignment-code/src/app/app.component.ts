import { ChangeDetectionStrategy, Component } from "@angular/core";
import { $$ } from "protractor";
import { TodosService } from "./todos/services/todos.service";
import { allActiveTodos, allTodos } from "./todos/state/todo.selectors";
import { Store, select } from "@ngrx/store";
import { ITodosState } from './todos/state/todos.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(private todoService: TodosService, private store: Store<ITodosState>, ) {}
  activeTodosCount:number = 0;
  todosCount: number = 0;
  filterMode: string = "All";

  ngOnInit() {
    this.store.pipe(select(allActiveTodos)).subscribe((todoList) => {
      this.activeTodosCount = todoList.length;
    });

    this.store.pipe(select(allTodos)).subscribe((todos) => {
      this.todosCount = todos.length;
    });
  }

  addTodo(event) {
    if (event.target.value.trim()) {
      this.todoService.addTodo(event.target.value);
      event.target.value = "";
    }
  }


  showFilteredTodos(mode) {
    this.filterMode = mode;
    this.todoService.changeFilterMode(mode);
  }

  clearCompletedTodos(){
    this.todoService.clearCompleted();
  }

}
