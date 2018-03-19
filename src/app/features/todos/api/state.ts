import { ToDoActions } from './actions';

export interface ToDosState {
  initialized: boolean;
  collection: any;
  currentToDo: any;
  selectedTags: string[];
  tags: string[];
}

const INITIAL_TODOS_STATE: any = {
  initialized: false,
  tags: [
    'work',
    'books',
    'movies',
    'private'
  ],
  selectedTags: []
};

export function todosStateReducers() {
  return function reducer(state: ToDosState = INITIAL_TODOS_STATE,
    action: any): ToDosState {

    switch (action.type) {
      case ToDoActions.OVERVIEW_ACTIVATED:
        return {
          ...state,
          initialized: true
        };

      case ToDoActions.COLLECTION_DATA_RECEIVED:
        return {
          ...state,
          collection: action.payload
        };

      case ToDoActions.DETAIL_DATA_RECEIVED:
        return {
          ...state,
          currentToDo: action.payload
        };

      case ToDoActions.ADD_TAG:
        return {
          ...state,
          selectedTags: [...state.selectedTags, action.payload],
          tags: state.tags.filter(t => t !== action.payload)
        };

      case ToDoActions.REMOVE_TAG:
        return {
          ...state,
          selectedTags: state.selectedTags.filter(t => t !== action.payload),
          tags: [...state.tags, action.payload]
        };

      case ToDoActions.RESET_TAGS:
        return {
          ...state,
          selectedTags: [],
          tags: INITIAL_TODOS_STATE.tags
        };
    }

    return state;
  };
}
