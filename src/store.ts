import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./redux/userInfo";
import exchangeData from "./redux/exchangeData";

export const store = configureStore({
  reducer: {
    userInfo: userInfo,
    exchangeData: exchangeData,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
