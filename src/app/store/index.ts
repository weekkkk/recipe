import { ingredientSlice } from "@/entities/ingredient";
import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: {
    ingredient: ingredientSlice.reducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof appStore;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();
