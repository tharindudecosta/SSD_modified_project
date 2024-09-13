import Routes from "./Routes";
import { Footer, Navbar } from "./components";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
      <Footer />

      <ToastContainer />
    </div>
  );
}

export default App;
