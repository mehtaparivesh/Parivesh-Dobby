import axios from "axios";
import { LOGOUT_URL } from "../../config";
import { logoutAction } from "../auth";
axios.defaults.withCredentials = true;
const logoutMiddleWare =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);
  };

export default logoutMiddleWare;
