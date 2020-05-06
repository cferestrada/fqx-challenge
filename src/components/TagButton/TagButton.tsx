import React, { useState, useEffect } from 'react';
import { addTag } from '../../reducers/todos/actions';
import { useDispatch } from 'react-redux';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import Add from '@material-ui/icons/Add';
import styled from 'styled-components';

interface TagButtonProps {
  /** Open flag to control how th button shows open/closed */
  open?: boolean,
  /** Todo identifier the tag belongs to */
  todoId?: string,
  /** List identifier the tag todo belongs to*/
  listId?: string,
  /** Tag setter on parent component, this will be present on new dtodos creation form */
  setTags?: any,
  /** Todos tags, this will be present on new dtodos creation form */
  tags?:string[],
}

const InlineContainer = styled.div`
  display: inline-block;
`;

const FormContainer = styled.div`
  margin-top: 5px;
`;


const TagButton = (props: TagButtonProps) => {
  
  const { todoId, listId, open, setTags, tags } = props;
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(open);
  const [text, setText] = useState('');

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleAddTag = (e: any) => {
    if (e.key === 'Enter') {
      if ( setTags && tags ) {
        setText('');
        setFormOpen(false);
        setTags([...tags, text]);
      }
      if( text !== '' && todoId && listId ) {
        dispatch(addTag(todoId, listId, text));
        setText('');
        setFormOpen(false);
      }
    }
    return;
  }

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  useEffect(()=> {
    setFormOpen(open);
  }, [open]);

  const renderAddButton = () => (
    <InlineContainer>
      <IconButton
        onClick={openForm}
        aria-label="add"
        size="small"
        color="secondary"
      >
        <Add />
      </IconButton>
    </InlineContainer>
  );
  

  const renderForm = () => (
    <FormContainer>
      <Input
        autoFocus
        onKeyDown={handleAddTag}
        placeholder="Add a new tag"
        onChange={handleTextChange}
        inputProps={{ 'aria-label': 'description' }}
        color="secondary"
      />
        <IconButton
          size="small"
          onClick={closeForm}
          aria-label="delete"
          color="secondary"
        >
          <CloseOutlined />
        </IconButton>
    </FormContainer>
  );

  return formOpen ? renderForm() : renderAddButton();
  
}



export default TagButton;
