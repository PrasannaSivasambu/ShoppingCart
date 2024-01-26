import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'Product',
    initialState: {
      value: [],
    },
    reducers: {
      assignToArray:(state,action) => {
        state.value = [...action.payload]
      },
        
    },
  });

  export const { assignToArray} = ProductSlice.actions;
  export default ProductSlice.reducer;