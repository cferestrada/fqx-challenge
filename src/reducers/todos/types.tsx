export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  ADD_TAG = 'ADD_TAG',
  DELETE_TAG = 'DELETE_TAG',
}

/**
 * Action Types
 */

export type AddTodo = {
  type: ActionTypes.ADD_TODO;
  payload: {
    id: string,
    text: string
    listId: string,
    tags: string[]
  }
};

export type DeleteTodo = {
  type: ActionTypes.DELETE_TODO;
  payload: {
    id: string,
    listId: string,
  }
};

export type AddTag = {
  type: ActionTypes.ADD_TAG;
  payload: {
    todoId: string,
    text: string
    listId: string,
    tags: string[]
  }
};

export type DeleteTag = {
  type: ActionTypes.DELETE_TAG;
  payload: {
    todoId: string,
    listId: string,
    text: string,
  }
};