const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
import logoutMiddleware  from "./middlewares/logout";
export default function (reducer) {
  const store = configureStore({
    reducer: reducer,
    middleware: [...getDefaultMiddleware(), logoutMiddleware],
  });
  return store;
}
