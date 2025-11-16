import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/stylesheet-inicio-sesion.css"
import "../assets/css/stylesheet-nav-bar-custom.css"
import "../assets/css/stylesheet-footer.css"

const InicioSesion: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="login-container profileiniciosesion">
        <form>
          <div className="imgcontainer">
            <img
              src="/img/icon/LOGO.ico"
              alt="Avatar"
              className="avatar"
            />
          </div>

          <div className="container">
            <label htmlFor="email">
              <b>Nombre de usuario</b>
            </label>
            <input
              type="email"
              id="email"
              placeholder="JhonDoe@dominio.cl"
              name="email"
              required
            />

            <label htmlFor="psw">
              <b>Contraseña</b>
            </label>
            <input
              type="password"
              id="psw"
              placeholder="Ingresa la contraseña"
              name="psw"
              required
            />

            <button type="submit">Ingresar</button>

            <label>
              <input type="checkbox" defaultChecked /> Recuérdame
            </label>
          </div>

          <div className="container">
            <button type="button" className="cancelbtn">
              Cancelar
            </button>
            <span className="psw">
              ¿Olvidó su <a href="#">contraseña?</a>
            </span>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default InicioSesion;
