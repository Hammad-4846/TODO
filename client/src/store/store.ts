import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./Slices/appConfigSlice";
import todoReducer from "./Slices/todoConfigSlice";

/* eslint-disable no-underscore-dangle */
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = configureStore({
  reducer: {
    app: appReducer,
    // composeEnhancers,
    todos: todoReducer,
  },
});
/* eslint-enable */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
