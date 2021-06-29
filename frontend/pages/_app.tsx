import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "./beststyle.css";
import Animations from "../components/Animations";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="position">
        <h1>Smire</h1>
        <Animations />
      </div>

      <div className="grid h-screen font-serif text-white place-items-center">
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
