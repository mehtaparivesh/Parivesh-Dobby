import axios from "axios";
import { logoutAction } from "../auth";
const logoutMiddleWare =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === logoutAction.type) {
      console.log(action.type);
      axios.get("http://localhost:8000/user/logout").then(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      next(action);
    } else {
      next(action);
    }
  };

export default logoutMiddleWare;
