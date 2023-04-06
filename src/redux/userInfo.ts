import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MyFavorites } from "./../commons/util/type/type";

export interface UserInfoState {
  userId: string;
  isSub: boolean;
  myFavorites: MyFavorites[];
  userPremium: {
    id: number;
    type: string;
    userId: number;
    endDate: string;
    startDate: string;
    updated_at: string;
    created_at: string;
    subscription: boolean;
  };
  isLoading: boolean;
}
const initialState: UserInfoState = {
  userId: "",
  isSub: false,
  myFavorites: [],
  userPremium: {
    id: 0,
    type: "",
    userId: 0,
    endDate: "",
    startDate: "",
    updated_at: "",
    created_at: "",
    subscription: false,
  },
  isLoading: true,
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setIsLoading: (state, action: any) => {
      state.isLoading = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isLoading = false;
    },
    setIsSub: (state, action: PayloadAction<boolean>) => {
      state.isSub = action.payload;
      state.isLoading = false;
    },
    setMyFavorites: (state, action: PayloadAction<any>) => {
      if (action.payload.length > 0) {
        state.myFavorites = action.payload;
      }
    },
    setUserPremium: (state, action: any) => {
      state.userPremium = action.payload;
    },
    setLogout: (state) => {
      state.userId = "";
      state.isSub = false;
      state.myFavorites = [];
      state.userPremium = {
        id: 0,
        type: "",
        userId: 0,
        endDate: "",
        startDate: "",
        updated_at: "",
        created_at: "",
        subscription: false,
      };
    },
  },
});

export const {
  setUserId,
  setIsSub,
  setMyFavorites,
  setUserPremium,
  setLogout,
  setIsLoading,
} = userInfo.actions;

export default userInfo.reducer;
