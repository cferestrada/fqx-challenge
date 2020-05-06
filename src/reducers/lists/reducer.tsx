import {
  ActionTypes,
} from "./types";
import {
  ActionTypes as TodosActionTypes,
} from "../todos/types"
import { List } from "../../model/List";
import { Todo } from "../../model/Todo";
import hash from 'object-hash';

const initialState = [
    {
      title: 'To Do',
      id: '0',
      todos: [
        {
          id: '96784481687d8e42049687bfaf82351edaa3c96c',
          title: 'Walk the dog',
          description: 'For at least 30 min.',
          tags: ['home duties'],
        },
        {
          id: '87e76cb53d0dad60d4a33bafc0e817a1fd9a04ec',
          title: 'Play a board game',
          description: 'A different one from last time.',
          tags: ['event'],
        }
      ]
    },
    {
      title: 'In Progress',
      id: '1',
      todos: [
        {
          id: '1bb6fda791fdf2fe81ec0dfe9922df20c512aa48',
          title: 'Do some laundry',
          description: 'Terrace stuff too',
          tags: ['home duties' ],
        },
        {
          id: 'c371ffd2a4e96bba9b2fadba816abc5e222f779a',
          title: 'Pick up the new printer',
          description: 'Make sure it has consumables.',
          tags: ['work'],
        }
      ]
    },
    {
      title: 'Done',
      id: '2',
      todos: [
        {
          id: '35af5645e8c0f4bf36d791850ea979a4a9d7bad6',
          title: 'Turn on the Rumba',
          description: 'Configure it with Alexha please.',
          tags: ['home duties'],
        },
      ]
    }
  ];

const listsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case TodosActionTypes.ADD_TODO: {
        const todoID = hash({
          title: action.payload.title,
          description: action.payload.description,
          tags: action.payload.tags
        });
        const newTodo = {
          id: todoID,
          title: action.payload.title,
          description: action.payload.description,
          tags: action.payload.tags,
        };        
        const newState = state.map(list => {
          if (list.id === action.payload.listId) {
            return {
              ...list,
              todos: [...list.todos, newTodo]
            };
          } else {
            return list;
          }
        });
        return newState;
      }
      case TodosActionTypes.DELETE_TODO:  {
        const list = state.find((list) => list.id === action.payload.listId);
        if (list && list.todos) {
          const todos = [...list.todos.filter((todo) => todo.id !== action.payload.id)];
          list.todos = todos;
        }
        if (action.payload.listId === '0') {
          return [list, state[1], state[2]];
        } else if (action.payload.listId === '1') {
          return [state[0], list, state[2]];
        } else if (action.payload.listId === '2') {
          return [state[0], state[1], list];
        }
        return [...state.filter((list) => list.id !== action.payload.listId), list];
      }
      case TodosActionTypes.ADD_TAG: {
        const newState = [...state];
        let listIndex; 
        let todoIndex; 

        const list = state.find((list, index) => {
          if(list.id === action.payload.listId) {
            listIndex = index;
            return true;
          }
          return false;
        });
        
        if (list && list.todos ) {
          const todo = list.todos.find((todo, index) => { 
            if( todo.id === action.payload.todoId ) {
              todoIndex = index;
              return true;
            }
            return false;
          });
          if (todo) todo.tags.push(action.payload.text);
          if( listIndex && todoIndex && todo) {
            newState[listIndex].todos[todoIndex] = todo;
          }
        }
        
        return newState;
      }
      case TodosActionTypes.DELETE_TAG: {
        const newState = [...state];
        let listIndex; 
        let todoIndex; 

        const list = state.find((list, index) => {
          if(list.id === action.payload.listId) {
            listIndex = index;
            return true;
          }
          return false;
        });
        
        if (list && list.todos ) {
          const todo = list.todos.find((todo, index) => { 
            if( todo.id === action.payload.todoId ) {
              todoIndex = index;
              return true;
            }
            return false;
          });
          if (todo) todo.tags = todo.tags.filter((tag)=> tag !== action.payload.text);
          if( listIndex && todoIndex && todo) {
            newState[listIndex].todos[todoIndex] = todo;
          }
        }
        return newState;
      }
      case ActionTypes.DRAGGED_ITEM:
        const {
          droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
        } = action.payload;
        
        const newState = [...state];
  
        //In the same list
        if (droppableIdStart === droppableIdEnd) {
          let someList: List = { id: '', title: '', todos: []};
          const list: List = state.find(list => droppableIdStart === list.id) || someList;
          if (list.todos) {
            const todo = list.todos.splice(droppableIndexStart, 1);
            list.todos.splice(droppableIndexEnd, 0, ...todo);
          }
        }
  
        // other list
        if (droppableIdStart !== droppableIdEnd) {
          // find the origin list
          let someList: List = { id: '', title: '', todos: []};
          const listStart: List = state.find(list => droppableIdStart === list.id) || someList;
          // take out the todo from the list
          let someTodos: Todo[] = [{ id: '', title: '', description: '', tags: []}];
          const todo: Todo[] = listStart.todos.splice(droppableIndexStart, 1) || someTodos;
          // set the destination list
          const listEnd: List = state.find(list => droppableIdEnd === list.id)|| someList;
          // put the todo in the destination list
          listEnd.todos.splice(droppableIndexEnd, 0, ...todo);
        }
        return newState;
  
      default:
        return state;
    }
};

export default listsReducer;
