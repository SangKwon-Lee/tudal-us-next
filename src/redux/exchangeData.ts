import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ExchangeDataState {
  exchangeData: {
    currency: number;
    date: string;
  };
}
const initialState: ExchangeDataState = {
  exchangeData: {
    currency: 0,
    date: "",
  },
};

export const exchangeData = createSlice({
  name: "exchangeData",
  initialState,
  reducers: {
    setExchangeData: (state, action: PayloadAction<any>) => {
      state.exchangeData = action.payload;
    },
  },
});

export const { setExchangeData } = exchangeData.actions;

export default exchangeData.reducer;
