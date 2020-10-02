import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => ({
      ...existingState,
      todos: [{ text, completed: false }, ...existingState.todos],
    })),
    on(TodoActions.removeTodo, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) => ({
      ...existingState,
      filterMode: mode,
    })),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
    on(TodoActions.toggleCompleted, (existingState, { index }) => {
      const updatedTodos = [...existingState.todos];
      updatedTodos[index] = {...updatedTodos[index], completed: !updatedTodos[index].completed};

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.toggleAllCompleted, (existingState) => {
      const updatedTodos = [...existingState.todos].map(el => {
        return Object.assign({}, el, {completed: true});
      });
      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
export const filteredTodos = (state: ITodosState) => state.todos.filter(el => {
  if(state.filterMode === 'All'){
    return true;
  }
  if (state.filterMode === 'Completed' && el.completed){
    return true;
  }
  if (state.filterMode === 'Active' && !el.completed){
    return true;
  }
  return false;
});

export const activeTodos = (state: ITodosState) => state.todos.filter(el => {
  if (!el.completed){
    return true;
  }
  return false;
});


