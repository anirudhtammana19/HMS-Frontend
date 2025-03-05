
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logout } from './UserSlice';
import { notification } from 'antd';

const autoLogoutMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === 'user/login') {
    clearTimeout(store.autoLogoutTimer); 
    store.autoLogoutTimer = setTimeout(() => {
      notification.warning({
        message: 'Session Expired',
        description: `Login Again to continue using AmazeCare`,
        placement: 'top',
        duration:3.0 ,
      });
      store.dispatch(logout());
    }, 30 * 60 * 1000); 
  }

  if (action.type === 'user/logout') {
    clearTimeout(store.autoLogoutTimer); 
  }

  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoLogoutMiddleware),
});

export default store;
