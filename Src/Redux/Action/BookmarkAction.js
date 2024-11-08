// bookmarkActions.js
export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

// Action to add a bookmark
export const addBookmark = (job) => ({
  type: ADD_BOOKMARK,
  payload: job,
});

// Action to remove a bookmark
export const removeBookmark = (jobId) => ({
  type: REMOVE_BOOKMARK,
  payload: jobId,
});
