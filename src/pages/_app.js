import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex-grow ">
        <Navbar />

        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
