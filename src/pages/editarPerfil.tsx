import React, { useState } from "react";
import "../assets/css/stylesheet-editar-perfil.css"


const EditarPerfil: React.FC = () => {
  const [avatar, setAvatar] = useState<string>("/img/icon/LOGO.ico");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="container mt-5 pt-5 mb-5">
        <h2 className="text-center mb-4">Editar Perfil</h2>

        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Tarjeta principal */}
            <div className="card shadow-lg p-4">

              {/* Avatar */}
              <div className="text-center mb-4">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="rounded-circle"
                  width={120}
                  height={120}
                />
                <div className="mt-3">
                  <label className="btn btn-outline-primary btn-sm">
                    Cambiar foto
                    <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                  </label>
                </div>
              </div>

              {/* Formulario */}
              <form>
                <h5 className="mb-3">Información Personal</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" placeholder="Jhon" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" placeholder="Doe" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="correo@ejemplo.cl" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" placeholder="+56 9 1234 5678" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input type="text" className="form-control" placeholder="Av. Siempre Viva 123" />
                </div>

                <hr className="my-4" />

                {/* Cambiar contraseña */}
                <h5 className="mb-3">Cambiar Contraseña</h5>
                <div className="mb-3">
                  <label className="form-label">Contraseña Actual</label>
                  <input type="password" className="form-control" placeholder="********" />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nueva Contraseña</label>
                    <input type="password" className="form-control" placeholder="********" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Repetir Contraseña</label>
                    <input type="password" className="form-control" placeholder="********" />
                  </div>
                </div>

                {/* Botones */}
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">
                    Guardar Cambios
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default EditarPerfil;
