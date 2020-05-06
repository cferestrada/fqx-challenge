import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { addTodo } from '../../reducers/todos/actions';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TagButton from '../TagButton';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

interface ActionButtonProps {
  /** List id to identify which list the todo will belong to */
  listId: string,
}

const TagContainer = styled.div`
  margin-right: 5px;
  margin-top: 5px;
  display: inline-block;
`;

const CardActionsContainer = styled.div`
  margin: auto;
  width: fit-content;
`;

const ActionButton = (props: ActionButtonProps) => {
  
  const { listId } = props;
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  
  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleAddTodo = () => {
    if (title) {
      setTitle('');
      dispatch(addTodo(listId, title, description, tags));
      setFormOpen(false);
    }
    return;
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleDeleteTag = (text: string): void => {
    setTags(tags.filter((tag)=> tag !== text))
  };

  const buttonContent = (
    <CardActionsContainer>
      <IconButton
        onClick={openForm}
        aria-label="add"
      >
        <AddCircleOutline />
      </IconButton>
    </CardActionsContainer>
  );
  
  const formContent = (
    <div>
      <Card
        style={{
          overflow: 'visible',
          minHeight: 80,
        }}
      >
        <CardContent>
        <TextField
          fullWidth
          autoFocus
          id="standard-basic"
          label="Title"
          onChange={handleTitleChange}
          value={title}
        />
        <TextareaAutosize
          placeholder='Add some description...'
          value={description}
          onChange={handleDescriptionChange}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            resize: 'none',
            width: '100%',
            overflow: 'hidden',
            outline: 'none',
            border: 'none',
            fontSize: 'inherit',
          }}
        />
        {tags.map((tag) => (
          <TagContainer>
            <Chip
              key={`${title}-${tag}`}
              size="small"
              label={tag}
              color="secondary"
              onDelete={() => handleDeleteTag(tag)}
            />
          </TagContainer>
        ))}
        <TagButton open={tags.length === 0} tags={tags} setTags={setTags}/>
        </CardContent>
        <CardActions>
          <CardActionsContainer>
            <IconButton
              onClick={closeForm}
              aria-label="delete"
            >
              <DeleteOutlinedIcon />
            </IconButton>
            <IconButton
              onMouseDown={handleAddTodo}
              aria-label="add"
            >
              <CheckCircle />
            </IconButton>
          </CardActionsContainer>
        </CardActions>
      </Card>
      
    </div>
  );

  return formOpen ? formContent : buttonContent;
  
}



export default ActionButton;
