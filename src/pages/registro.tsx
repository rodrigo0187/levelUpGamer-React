import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/stylesheet-registro.css";
import {API_URL} from "../Hooks/api" ;

export default function Registro() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Registro - Level Up Gamer";
  }, []);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [psw, setPsw] = useState("");
  const [pswRepeat, setPswRepeat] = useState("");

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [msgExito, setMsgExito] = useState("");

  // Validación de campos
  const validar = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    const telRegex = /^\d{8}$/;

    if (!nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!emailRegex.test(email)) newErrors.email = "Email inválido o dominio no permitido.";
    if (email !== repeatEmail) newErrors.repeatEmail = "Los emails no coinciden.";
    if (telefono && !telRegex.test(telefono)) newErrors.telefono = "Formato esperado: 12345678";
    if (psw.length < 4 || psw.length > 10) newErrors.psw = "Debe tener entre 4 y 10 caracteres.";
    if (psw !== pswRepeat) newErrors.pswRepeat = "Las contraseñas no coinciden.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});
    setMsgExito("");

    const erroresVal = validar();
    if (Object.keys(erroresVal).length > 0) {
      setErrores(erroresVal);
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, psw }),
      });

      const data = await resp.json();
      console.log(JSON.stringify(data));

      if (!resp.ok) {
        setErrores({ general: data.message || "Error en el registro" });
        return;
      }

      setMsgExito("✅ Registro exitoso. Ahora puedes iniciar sesión.");

      // Limpiar formulario
      setNombre(""); setEmail(""); setRepeatEmail(""); setTelefono(""); setPsw(""); setPswRepeat("");

      // Redirección usando React Router
      setTimeout(() => navigate("/inicio-sesion"), 1500);

    } catch (err) {
      setErrores({ general: "Error de conexión con el servidor." });
    }
  };

  const inputClass = (campo: string) =>
    errores[campo] ? "form-control is-invalid ps-5" : "form-control ps-5";

  return (
    <div className="registro-page">
      <div className="registro-container">
        <h2 className="mb-4 text-center">Registro de Usuario</h2>

        {errores.general && <p className="text-danger text-center">{errores.general}</p>}
        {msgExito && <p className="text-success text-center">{msgExito}</p>}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3 input-icon">
            <input
              type="text"
              className={inputClass("nombre")}
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
          </div>

          {/* Email */}
          <div className="mb-3 input-icon">
            <input
              type="email"
              className={inputClass("email")}
              placeholder="ejemplo@dominio.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errores.email && <small className="text-danger">{errores.email}</small>}
          </div>

          {/* Repetir Email */}
          <div className="mb-3 input-icon">
            <input
              type="email"
              className={inputClass("repeatEmail")}
              placeholder="Repetir email"
              value={repeatEmail}
              onChange={(e) => setRepeatEmail(e.target.value)}
            />
            {errores.repeatEmail && <small className="text-danger">{errores.repeatEmail}</small>}
          </div>

          {/* Teléfono */}
          <div className="mb-3 input-icon">
            <input
              type="tel"
              className={inputClass("telefono")}
              placeholder="12345678"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            {errores.telefono && <small className="text-danger">{errores.telefono}</small>}
          </div>

          {/* Contraseña */}
          <div className="mb-3 input-icon">
            <input
              type="password"
              className={inputClass("psw")}
              placeholder="Contraseña"
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
            />
            {errores.psw && <small className="text-danger">{errores.psw}</small>}
          </div>

          {/* Repetir Contraseña */}
          <div className="mb-3 input-icon">
            <input
              type="password"
              className={inputClass("pswRepeat")}
              placeholder="Repetir contraseña"
              value={pswRepeat}
              onChange={(e) => setPswRepeat(e.target.value)}
            />
            {errores.pswRepeat && <small className="text-danger">{errores.pswRepeat}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Registrar</button>
        </form>
      </div>
    </div>
  );
}
