import React, { useEffect } from 'react';
import "../assets/css/stylesheet-politica-privacidad.css";

const PoliticaPrivacidad: React.FC = () => {
  useEffect(() => {
    document.title = "Politica y Privacidad - Level Up Gamer";
  }, []);
  return (
    <div className="profilepoliticaprivacidad">

      {/* HEADER */}
      <header>
        <h1>Política de Privacidad</h1>
        <p>Última actualización: 14 de febrero de 2025</p>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        <article>
          <p>
            En <strong>Level Up Gamer</strong>, respetamos la privacidad de
            nuestros clientes y visitantes en línea...
          </p>

          <h2>1. Definiciones</h2>
          <p>
            Cuando hablamos de <em>Datos Personales</em>...
          </p>

          <h2>2. Datos que recopilamos</h2>
          <ul>
            <p>
              <strong>Datos de contacto:</strong> nombre, correo electrónico... <br />
              <strong>Datos de la cuenta:</strong> nombre de usuario... <br />
              <strong>Datos de compra:</strong> historial de pedidos... <br />
              <strong>Datos técnicos:</strong> IP, navegador...
            </p>
          </ul>
          {/* uso de los datos */}
          <h2>3. Uso de los datos</h2>
          <ul>
            <p>
              Procesar y entregar tus pedidos. <br />
              Ofrecer soporte al cliente. <br />
              Enviar notificaciones.
            </p>
          </ul>
          {/* datos */}
          <h2>4. Datos</h2>
          <p>No vendemos tus datos personales...</p>
          {/* seguridad */}
          <h2>5. Seguridad</h2>
          <p>Protegemos tu información utilizando medidas técnicas...</p>

          {/* Derecho del usuario */}
          <h2>6. Derechos del usuario</h2>
          <ul>
            <p>
              Acceder a tus datos. <br />
              Solicitar corrección o eliminación. <br />
              Oponerte a marketing.
            </p>
          </ul>

          <h2>7. Cookies</h2>
          <p>Nuestra web utiliza cookies para mejorar tu experiencia...</p>

          <h2>8. Cambios</h2>
          <p>Podemos actualizar esta política ocasionalmente...</p>

          <h2>9. Contacto</h2>
          <p>
            Puedes escribirnos a:{" "}
            <a href="mailto:soporte@levelupgamer.com">soporte@levelupgamer.com</a>
          </p>
        </article>
      </main>
    </div >
  );
}
export default PoliticaPrivacidad;