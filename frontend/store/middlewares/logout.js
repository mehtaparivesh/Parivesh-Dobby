import axios from "axios";
import { LOGOUT_URL } from "../../config";
import { logoutAction } from "../auth";
axios.defaults.withCredentials = true;
const logoutMiddleWare =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === logoutAction.type) {
      console.log(action.type);
      axios.get(LOGOUT_URL, { withCredentials: true }).then(
        (res) => console.log(res),
        (err) => console.log(err)
      );
      next(action);
    } else {
      next(action);
    }
  };

export default logoutMiddleWare;
