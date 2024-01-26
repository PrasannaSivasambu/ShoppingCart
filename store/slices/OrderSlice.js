import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
    name: 'Order',
    initialState: {
      value: [],
    },
    reducers: {
      addToOrder: (state,action) => {
        state.value = [...state.value,action.payload]
      },
       removeFromOrder: (state,action) => {
        state.value = state.value.filter(ele=>ele.OrderId!==action.payload.OrderId)
      },
      assignToOrder:(state,action)=>{
        state.value=[...action.payload]
      }
    },
  });

  export const { addToOrder,removeFromOrder,assignToOrder} = OrderSlice.actions;
  export default OrderSlice.reducer;