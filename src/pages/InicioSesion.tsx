import "../assets/css/stylesheet-inicio-sesion.css";

const InicioSesion = () => {
  return (
    <div className="inicio-sesion-page">
      <div className="login-container">

        <div className="imgcontainer">
          <img src="/img/icon/LOGO.ico" alt="Avatar" className="avatar" />
        </div>

        <form>
          <label htmlFor="email"><b>Nombre de usuario</b></label>
          <input type="email" id="email" placeholder="ejemplo@dominio.cl" required />

          <label htmlFor="psw"><b>Contraseña</b></label>
          <input type="password" id="psw" placeholder="Ingresa tu contraseña" required />

          <button type="submit">Ingresar</button>

          <label>
            <input type="checkbox" defaultChecked /> Recuérdame
          </label>

          <button type="button" className="cancelbtn">Cancelar</button>
        </form>

      </div>
    </div>
  );
};

export default InicioSesion;
