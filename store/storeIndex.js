// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducerIndex';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
