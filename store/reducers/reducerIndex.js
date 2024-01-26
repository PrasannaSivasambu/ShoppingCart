// store/reducers/index.js

import { combineReducers } from 'redux';
import productSlice from '../slices/productSlice';
import CartSlice from '../slices/CartSlice';
import OrderSlice from '../slices/OrderSlice';

const rootReducer = combineReducers({
  Product:productSlice,
  Cart:CartSlice,
  Order:OrderSlice
  // Add more slices here if needed
});

export default rootReducer;
