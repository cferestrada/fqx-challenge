import { ActionTypes } from "./types";

export const drag = (
  droppableIdStart: any,
  droppableIdEnd: any,
  droppableIndexStart: any,
  droppableIndexEnd: any,
  draggableId: any,
) => {
  return {
    type: ActionTypes.DRAGGED_ITEM,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    }
  };
};

