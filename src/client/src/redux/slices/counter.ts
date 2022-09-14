import { createSlice } from "@reduxjs/toolkit";

interface InitalStateCounter {
  value: number;
}

const initalStateCounter: InitalStateCounter = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initalStateCounter,
  reducers: {
    increament: (state) => {
      state = {
        value: state.value++,
      };
    },
    decreasement: (state) => {
      state = {
        value: state.value--,
      };
    },
    changeByAmount: (state, action: { type: string; payload: number }) => {
      console.log(state.value + action.payload);
      //   state.value += action.payload;
      state = {
        value: state.value + 1,
      };
    },
  },
});

export const { increament, decreasement, changeByAmount } =
  counterSlice.actions;
export const counterReducer = counterSlice.reducer;
