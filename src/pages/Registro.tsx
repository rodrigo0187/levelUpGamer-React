import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Registro() {
  return (
    <div className="profileregistro">
      <div className="page-container">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENEDOR DEL REGISTRO */}
        <div className="register-container">
          <form id="registerForm">
            <h1>Regístrate</h1>
            <p>Completa este formulario para crear tu cuenta</p>
            <p id="asterisco">Los campos con asterisco (*) son obligatorios.</p>

            {/* Nombre */}
            <label htmlFor="nombre"><b>Nombre (*)</b></label>
            <input
              type="text"
              id="nombre"
              placeholder="Jhon Doe"
              name="nombre"
              required
            />
            <small id="error-nombre" className="text-danger"></small>

            {/* Email */}
            <label htmlFor="email"><b>Email (*)</b></label>
            <input
              type="email"
              id="email"
              placeholder="JhonDoe@dominio.cl"
              name="email"
              required
            />
            <small id="error-email" className="text-danger"></small>

            {/* Repetir Email */}
            <label htmlFor="repeat-email"><b>Repite Email (*)</b></label>
            <input
              type="email"
              id="repeat-email"
              placeholder="JhonDoe@dominio.cl"
              name="repeat-email"
              required
            />
            <small id="error-repeat-email" className="text-danger"></small>

            {/* Teléfono */}
            <label htmlFor="telefono"><b>Teléfono</b></label>
            <input
              type="tel"
              id="telefono"
              placeholder="+569-1234-5678"
              name="telefono"
            />
            <small id="error-telefono" className="text-danger"></small>

            {/* Contraseña */}
            <label htmlFor="psw"><b>Contraseña (*)</b></label>
            <input
              type="password"
              id="psw"
              placeholder="******"
              name="psw"
              required
            />
            <small id="error-psw" className="text-danger"></small>

            {/* Repetir Contraseña */}
            <label htmlFor="psw-repeat"><b>Repite Contraseña (*)</b></label>
            <input
              type="password"
              id="psw-repeat"
              placeholder="******"
              name="psw-repeat"
              required
            />
            <small id="error-psw-repeat" className="text-danger"></small>

            <p id="msgExito" className="text-success mt-1"></p>

            <div className="clearfix mt-1">
              <button type="button" className="cancelbtn">
                Cancelar
              </button>
              <button type="submit" className="signupbtn">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
