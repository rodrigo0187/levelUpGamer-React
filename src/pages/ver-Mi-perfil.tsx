import React, { useEffect, useState } from "react";
import "../assets/css/stylesheet-ver-mi-perfil.css";
// import perfilBase from "../assets/img/perfil/perfil-base.png";

// Button tipado correctamente para aceptar className y otros props de <button>
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ asChild, children, ...props }) => {
  if (asChild) return <>{children}</>;
  return <button {...props}>{children}</button>;
};

export default function PerfilPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("jhon@example.com");
  const perfilBase = "https://via.placeholder.com/150";
  const [image, setImage] = useState(perfilBase);

  useEffect(() => {
    // Aquí cargarías datos reales desde API
    setUsername("Usuario Ejemplo");
  }, []);

  return (
    <div className="profile-ver-mi-perfil p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>

      <div className="card bg-white shadow rounded-2xl p-4">
        <img src={image} alt="perfil" className="w-full rounded-xl" />

        <h1 className="text-center text-xl font-bold mt-3">{username}</h1>
        <p className="title text-center text-gray-600">{email}</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-center gap-4 text-xl mt-3">
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-facebook"></i></a>
        </div>

        <div className="flex justify-center mt-4">
          <Button asChild>
            <a href="/editarperfil">Editar perfil</a>
          </Button>
        </div>

        <div className="mt-6">
          <label className="font-medium">Cambiar foto de perfil:</label>
          <input
            type="file"
            accept="image/*"
            className="block mt-2"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                setImage(url);
              }
            }}
          />
          <Button className="mt-2">Subir</Button>
        </div>
      </div>

      <hr className="my-8" />

      <div id="actividad">
        <h3 className="text-lg font-semibold mb-2">Actividad reciente</h3>
        <ul id="userposts" className="list-disc ml-6"></ul>
      </div>

      <div id="compras" className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Compras realizadas</h3>
        <ul id="userCompras" className="list-disc ml-6"></ul>
      </div>

      <hr className="my-8" />

      <div id="productosVistos">
        <h3 className="text-lg font-semibold mb-2">Productos más vistos</h3>
        <ul id="userProductosVistos" className="list-disc ml-6"></ul>
      </div>
    </div>
  );
}
