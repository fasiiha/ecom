import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { initializeAuth } from "@/services/initializeAuth";
import "@/styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    initializeAuth();
  }, []);
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen w-screen">
        <div className="flex-grow ">
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>{" "}
    </Provider>
  );
}
