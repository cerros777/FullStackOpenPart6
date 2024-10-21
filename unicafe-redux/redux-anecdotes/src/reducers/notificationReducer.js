import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to the anecdote app',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => '',  // Clears the notification
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

// Thunk to set notification with a timeout
export const setNotificationWithTimeout = (message, timeInSeconds = 5) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);  // Convert seconds to milliseconds
  };
};

export default notificationSlice.reducer;
