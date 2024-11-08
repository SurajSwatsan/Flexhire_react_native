// bookmarkReducer.js

import {ADD_BOOKMARK, REMOVE_BOOKMARK} from '../Action/BookmarkAction';

const initialState = {
  bookmarks: [],
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          job => job.id !== action.payload, // Assuming each job has a unique `id`
        ),
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
