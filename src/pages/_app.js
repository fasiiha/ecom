import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { initializeAuth } from "@/services/initializeAuth";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen w-screen">
        <div className="flex-grow ">
          <Navbar />
          {initializeAuth()}
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>{" "}
    </Provider>
  );
}
