import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as todosState from './todos.reducer';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');

export const allTodos = createSelector(
  todosSelector,
  todosState.todos,
);

export const allActiveTodos = createSelector(
  todosSelector,
  todosState.activeTodos,
);

export const allFilteredTodos = createSelector(
  todosSelector,
  todosState.filteredTodos,
);