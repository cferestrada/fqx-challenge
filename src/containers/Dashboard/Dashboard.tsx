import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';
import { drag } from '../../reducers/lists/actions';
import styled from 'styled-components';
import { RootState } from "../../reducers/store";
import { Todo } from "../../model/Todo";
import { SMALL_DEVICES } from "../../layout/Mobile";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${SMALL_DEVICES`
    flex-direction: row;
  `};
`;

export const Dashboard = () => {

  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists);

  const [listas, setListas] = useState(lists);
  const [dragging, setDragging] = useState(false);

  const onDragStart = () => {
    setDragging(true);
  };

  const onDragEnd = (result: DropResult):void => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    setDragging(false);
    dispatch(
      drag(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
      )
    );
  };

  useEffect(()=> {
    if(lists) {
      setListas(lists);
    }
  },[lists]);

  return (
    <DragDropContext onBeforeDragStart={onDragStart} onDragEnd={onDragEnd}>
          <ListContainer>
            {listas.map((list: { id: string ; title: string; todos: Todo[]; }, index: number) => (
              <List
                listId={list.id}
                key={list.id}
                title={list.title}
                todos={list.todos}
                dragging={dragging}
              />
            ))}
          </ListContainer>
      </DragDropContext>
  );
};

export default Dashboard;
