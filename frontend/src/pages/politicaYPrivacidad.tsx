import "../assets/css/stylesheet-politica-privacidad.css";

export default function PoliticaPrivacidad() {
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
            <li><strong>Datos de contacto:</strong> nombre, correo electrónico...</li>
            <li><strong>Datos de la cuenta:</strong> nombre de usuario...</li>
            <li><strong>Datos de compra:</strong> historial de pedidos...</li>
            <li><strong>Datos técnicos:</strong> IP, navegador...</li>
          </ul>

          <h2>3. Uso de los datos</h2>
          <p>Utilizamos tus datos para:</p>
          <ul>
            <li>Procesar y entregar tus pedidos.</li>
            <li>Ofrecer soporte al cliente.</li>
            <li>Enviar notificaciones.</li>
          </ul>

          <h2>4. Compartición de datos</h2>
          <p>No vendemos tus datos personales...</p>

          <h2>5. Seguridad</h2>
          <p>Protegemos tu información utilizando medidas técnicas...</p>

          <h2>6. Derechos del usuario</h2>
          <ul>
            <li>Acceder a tus datos.</li>
            <li>Solicitar corrección o eliminación.</li>
            <li>Oponerte a marketing.</li>
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
    </div>
  );
}
