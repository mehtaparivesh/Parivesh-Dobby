// importing modules
import React, { lazy, memo, Suspense, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import Router from "next/router";
import { motion } from "framer-motion";
// importing actions
import { loginAction } from "../store/auth";
// importing utils
import { CHECK_URL } from "../config";
// importing components
import Loader from "../components/Loader";
import Header from "../components/Header";
// to send http cookie with every request
axios.defaults.withCredentials = true;
function UploadsPage({ isLoggedIn }) {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(CHECK_URL, { withCredentials: true }).then(
      (res) => {
        if (res.data.isLoggedIn === true) {
          dispatch(loginAction({}));
        }
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/login");
    }
  }, []);
  const Uploads = lazy(() => import("../components/Uploads"));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen  items-center justify-center w-screen"
    >
      <Header />
      <Suspense fallback={<Loader />}>
        <Uploads />
      </Suspense>
    </motion.div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default memo(connect(mapStateToProps)(UploadsPage));
