import { authSlice } from '@/modules/auth';
import { persistCombineReducers } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfigRoot = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const rootReducer = persistCombineReducers(persistConfigRoot, {
  auth: authSlice.reducer,
});
