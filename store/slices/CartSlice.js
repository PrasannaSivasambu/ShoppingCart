import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
      value: [],
    },
    reducers: {
      addToCart: (state,action) => {
        state.value = [...state.value,action.payload]
      },
       removeFromCart: (state,action) => {
        const index= state.value.findIndex(ele=>ele.id===action.payload.id)
        if (index !== -1) {
         state.value.splice(index, 1);
        }
      },
      emptyCart:(state)=>{
        state.value=[]
      }
    },
  });

  export const { addToCart,removeFromCart,emptyCart} = CartSlice.actions;
  export default CartSlice.reducer;