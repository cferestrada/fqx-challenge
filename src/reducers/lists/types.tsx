import { List } from "../../model/List";

export enum ActionTypes {
  ADD_LIST = "ADD_LIST",
  DRAGGED_ITEM = "DRAGGED_ITEM",
}


/**
 * Action Types
 */
export type Addlist = {
  type: ActionTypes.ADD_LIST;
  loading: boolean;
  payload: string,
};
export type DraggedItem = {
  lists: List[];
  type: ActionTypes.DRAGGED_ITEM;
  payload: {
    droppableIdStart: any,
    droppableIdEnd: any,
    droppableIndexStart: any,
    droppableIndexEnd: any,
  },
};

/**
 * State Type
 */
export type ListsState = List[];
