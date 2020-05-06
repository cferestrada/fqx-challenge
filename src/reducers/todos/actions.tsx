import { ActionTypes } from "./types";

export const addTodo = (listId: string, title: string, description: string, tags: string[]) => {
  return {
    type: ActionTypes.ADD_TODO,
    payload: { title, description, listId, tags }
  };
};

export const deleteTodo = (id: string, listId: string) => {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: { id, listId }
  };
};

export const addTag = (todoId: string, listId: string, text: string) => {
  return {
    type: ActionTypes.ADD_TAG,
    payload: { todoId, listId, text }
  };
};

export const deleteTag = (todoId: string, listId: string, text: string) => {
  return {
    type: ActionTypes.DELETE_TAG,
    payload: { todoId, listId, text }
  };
};