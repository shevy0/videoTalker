import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainReducer from "./reducer";

const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
