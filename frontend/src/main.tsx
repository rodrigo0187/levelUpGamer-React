import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PerfilProvider } from "./context/perfilContext";
import "./assets/css/variables.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  
    <BrowserRouter>
    <PerfilProvider>
    <App/>
    </PerfilProvider>
    </BrowserRouter>
  
);
