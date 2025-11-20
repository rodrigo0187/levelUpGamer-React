import React, { useState } from "react";
import "../assets/css/stylesheet-registro.css"; // Tu CSS actual

interface Usuario {
  nombre: string;
  email: string;
  telefono?: string;
  psw: string;
}

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [psw, setPsw] = useState("");
  const [pswRepeat, setPswRepeat] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [msgExito, setMsgExito] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setMsgExito("");

    // Validaciones
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    const telRegex = /^\+569\d{8}$/;

    if (!nombre) return setErrorMsg("El nombre es obligatorio.");
    if (!emailRegex.test(email)) return setErrorMsg("Email inválido o dominio no permitido.");
    if (email !== repeatEmail) return setErrorMsg("Los emails no coinciden.");
    if (telefono && !telRegex.test(telefono)) return setErrorMsg("Formato esperado: +56912345678");
    if (psw.length < 4 || psw.length > 10) return setErrorMsg("La contraseña debe tener entre 4 y 10 caracteres.");
    if (psw !== pswRepeat) return setErrorMsg("Las contraseñas no coinciden.");

    // Guardar usuario en localStorage
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some(u => u.email === email)) return setErrorMsg("Este email ya está registrado.");

    const nuevoUsuario: Usuario = { nombre, email, telefono, psw };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMsgExito("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    // Limpiar campos
    setNombre("");
    setEmail("");
    setRepeatEmail("");
    setTelefono("");
    setPsw("");
    setPswRepeat("");

    setTimeout(() => {
      window.location.href = "/inicioSesion"; // Ajusta según React Router
    }, 1500);
  };

  const handleCancel = () => {
    setNombre("");
    setEmail("");
    setRepeatEmail("");
    setTelefono("");
    setPsw("");
    setPswRepeat("");
    setErrorMsg(null);
    setMsgExito("");
  };

  return (
    <div className="registro-page">
      <div className="registro-container">
        <h2 className="mb-4 text-center">Registro de Usuario</h2>

        {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
        {msgExito && <p className="text-success text-center">{msgExito}</p>}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3 input-icon">
            <span className="icon-left"><i className="fa fa-user"></i></span>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 input-icon">
            <span className="icon-left"><i className="fa fa-envelope"></i></span>
            <input
              type="email"
              className="form-control ps-5"
              placeholder="ejemplo@dominio.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Repetir Email */}
          <div className="mb-3 input-icon">
            <span className="icon-left"><i className="fa fa-envelope"></i></span>
            <input
              type="email"
              className="form-control ps-5"
              placeholder="Repetir email"
              value={repeatEmail}
              onChange={(e) => setRepeatEmail(e.target.value)}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="mb-3 input-icon">
            <span className="icon-left"><i className="fa fa-phone"></i></span>
            <input
              type="tel"
              className="form-control ps-5"
              placeholder="+569-12345678"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3 input-icon">
            <span className="icon-left"><i className="fa fa-lock"></i></span>
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Contraseña"
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
              required
            />
          </div>

          {/* Repetir Contraseña */}
          <div className="mb-3 input-icon">
            <span className="icon-left"><i className="fa fa-lock"></i></span>
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Repetir contraseña"
              value={pswRepeat}
              onChange={(e) => setPswRepeat(e.target.value)}
              required
            />
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
