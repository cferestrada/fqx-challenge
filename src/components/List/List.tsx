import Todo from '../Todo/Todo';
import * as React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Todo as TodoModel } from '../../model/Todo';
import ActionButton from '../../components/ActionButton/ActionButton';
import { SMALL_DEVICES } from "../../layout/Mobile";
import { __GRAY_SCALE } from '../../layout/Theme';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.75);
  borderradius: 3px;
  width: 95%;
  ${SMALL_DEVICES`
    width: 30%;
  `};
  height: 100%;
  margin-right: 8px;
  background-color: ${__GRAY_SCALE._300};
  padding: 8px;
`;

interface ListProps {
  /** List title */
  title: string,
  /** Todos array that the list contains */
  todos: TodoModel[],
  /** List identifier */
  listId: string,
  /** Controls if add new button is shown when dragging */
  dragging: boolean,
}

const List = (props: ListProps) => {

  const { title, listId, todos, dragging} = props;
  return (
    <Container>
      <Droppable droppableId={String(listId)}>
        {(provided:DroppableProvided, snapshot:DroppableStateSnapshot)  => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <h1>{title}</h1>
            {todos.map((todo: TodoModel, index: number) => (
              <Todo
                listId={listId}
                key={todo.id}
                title={todo.title}
                id={todo.id}
                index={index}
                description={todo.description}
                tags={todo.tags}
              />
            ))}
            {!dragging && <ActionButton listId={listId} />}
          </div>
        )}
      </Droppable>
    </Container>
  );
};

export default List;
