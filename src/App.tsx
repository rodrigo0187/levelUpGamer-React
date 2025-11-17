import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Index />
      <Footer />
    </>
  );
}

export default App;