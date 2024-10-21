import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

// Define the notification reducer
const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        console.log('Reducer received SHOW_NOTIFICATION action:', action.payload);
        return { message: action.payload, visible: true };  // Set both message and visible to true
      case 'HIDE_NOTIFICATION':
        console.log('Reducer received HIDE_NOTIFICATION action');
        return { ...state, visible: false };  // Only update the visibility
      default:
        return state;  // Return the existing state for unrecognized actions
    }
  };
  

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, { message: '', visible: false});

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
