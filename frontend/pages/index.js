// importing modules
import { lazy, memo, Suspense, useLayoutEffect } from "react";
import axios from "axios";
import { loginAction } from "../store/auth";
import { useDispatch, connect } from "react-redux";
// importing utils
import { CHECK_URL } from "../config";
// importing  components
import Upload from "../components/ImageUpload";
import Loader from "../components/Loader";
import Notifi, { fire } from "../components/Notifi";
import Header from "../components/Header";

// to send http cookie with request
axios.defaults.withCredentials = true;

// lazy component
const Uploads = lazy(() => import("../components/Uploads"));

function Home({ isLoggedIn }) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    axios.get(CHECK_URL, { withCredentials: true }).then(
      (res) => {
        if (res.data.isLoggedIn === true) {
          dispatch(loginAction({}));
        }
      },
      (err) => console.log(err)
    );
  }, []);
  return (
    <main className="min-h-screen w-screen ">
      <Header />
      {isLoggedIn && (
        <>
          <Notifi />
          <div className="top mt-20 w-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl w-full p-4 text-center">Upload</h1>
            <Upload />
          </div>
          <div className="w-screen flex justify-center">
            <Suspense fallback={<Loader />}>
              <Uploads />
            </Suspense>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <div className="flex  h-screen w-screen items-center justify-center p-1 2xl:text-3xl xl:text-2xl text-lg text-blue-400 ">
          Please Login to upload and see your gallery
        </div>
      )}
    </main>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default memo(connect(mapStateToProps)(Home));
