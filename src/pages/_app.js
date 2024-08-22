import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex-grow ">
        <Navbar />

        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
      <Footer />
    </div>
  );
}
