import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { deleteTodo, deleteTag } from '../../reducers/todos/actions';
import { useDispatch } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import TagButton from '../TagButton';

const Container = styled.div`
  margin-bottom: 10px;
`;

const TagContainer = styled.div`
  margin-right: 5px;
  margin-top: 5px;
  display: inline-block;
`;


interface TodoProps {
  id: string,
  index: number,
  title: string,
  description: string
  listId: string,
  tags: string[],
}


const Todo = (props: TodoProps) => {

  const dispatch = useDispatch();
  const { id, index, title, description, listId, tags } = props;

  const handleDeleteTodo = (): void => {
    dispatch(deleteTodo(id, listId));
  };

  const handleDeleteTag = (tag: string): void => {
    dispatch(deleteTag(id, listId, tag));
  };

  const handleDrag = (ev: React.DragEvent<HTMLDivElement>): void => {
    const id = (ev.target as HTMLDivElement).id;
    ev.dataTransfer.setData("text/plain", id);
  };


  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <Container>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDragStart={handleDrag}
          >
            <Card>
              <CardContent>
                <h3>{title}</h3>
                <Container>
                  <p>{description}</p>
                </Container>
                {tags.map((tag) => (
                  <TagContainer key={`container-${tag}`}>
                    <Chip
                      key={`${id}-${tag}`}
                      size="small"
                      label={tag}
                      color="secondary"
                      onDelete={() => handleDeleteTag(tag)}
                    />
                  </TagContainer>
                ))}
                <TagButton open={tags.length === 0} todoId={id} listId={listId}/>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  onClick={handleDeleteTodo}
                  aria-label="delete"
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Todo;
