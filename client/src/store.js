import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./services/post.service";
import commentReducer from "./services/comment.service";
import authReducer from "./services/auth.service";
import userReducer from "./services/user.service";
import authSlice from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    authReducer: authSlice,
    [postReducer.reducerPath]: postReducer.reducer,
    [authReducer.reducerPath]: authReducer.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [commentReducer.reducerPath]: commentReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postReducer.middleware,
      commentReducer.middleware,
      authReducer.middleware,
      userReducer.middleware,
    ]),
});


setupListeners(store.dispatch)


export default store;
