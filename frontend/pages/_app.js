import configureStore from "../store/configStore";
import rootReducer from "../store/rootReducer";
import "../styles/globals.css";
import { Provider } from "react-redux";
const store = configureStore(rootReducer);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
