import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/stylesheet-nav-bar-custom.css"
import "../assets/css/stylesheet-Politica-y-Privacidad.css"


export default function PoliticaPrivacidad() {
  return (
    <div className="profilepoliticaprivacidad">
      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <header
        style={{
          textAlign: "center",
          padding: "20px",
          background: "#222",
          color: "#fff",
        }}
      >
        <h1>Política de Privacidad</h1>
        <p>Última actualización: 14 de febrero de 2025</p>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "20px",
          lineHeight: "1.6",
        }}
      >
        <article>
          <p>
            En <strong>Level Up Gamer</strong>, respetamos la privacidad de
            nuestros clientes y visitantes en línea. Esta Política de
            Privacidad explica cómo recopilamos, utilizamos y protegemos tu
            información personal cuando usas nuestra tienda en línea y nuestros
            servicios.
          </p>

          <br />

          <h2>1. Definiciones</h2>
          <p>
            Cuando hablamos de <em>Datos Personales</em>, nos referimos a
            cualquier información que pueda identificarte directamente (como tu
            nombre o dirección de correo electrónico) o indirectamente (como tu
            dirección IP).
          </p>

          <br />

          <h2>2. Datos que recopilamos</h2>
          <ul>
            <li>
              <strong>Datos de contacto:</strong> nombre, correo electrónico,
              teléfono, dirección.
            </li>
            <li>
              <strong>Datos de la cuenta:</strong> nombre de usuario,
              contraseña cifrada.
            </li>
            <li>
              <strong>Datos de compra:</strong> historial de pedidos, métodos de
              pago utilizados.
            </li>
            <li>
              <strong>Datos técnicos:</strong> dirección IP, navegador,
              dispositivo.
            </li>
          </ul>

          <br />

          <h2>3. Uso de los datos</h2>
          <p>Utilizamos tus datos personales para:</p>
          <ul>
            <li>Procesar y entregar tus pedidos.</li>
            <li>Ofrecer soporte al cliente.</li>
            <li>Enviar notificaciones sobre tu cuenta o pedidos.</li>
            <li>Mejorar nuestros servicios y personalizar tu experiencia.</li>
          </ul>

          <br />

          <h2>4. Compartición de datos</h2>
          <p>
            No vendemos tus datos personales. Solo los compartimos con
            proveedores de servicios de confianza (ej. empresas de pago y
            logística) que nos ayudan a operar nuestra tienda.
          </p>

          <br />

          <h2>5. Seguridad</h2>
          <p>
            Protegemos tu información utilizando medidas técnicas y
            organizativas como cifrado y control de accesos. Sin embargo,
            recuerda que ningún sistema es 100% seguro.
          </p>

          <br />

          <h2>6. Derechos del usuario</h2>
          <p>Como cliente tienes derecho a:</p>
          <ul>
            <li>Acceder a tus datos personales.</li>
            <li>Solicitar su corrección o eliminación.</li>
            <li>Oponerte a su uso para fines de marketing.</li>
          </ul>

          <br />

          <h2>7. Cookies</h2>
          <p>
            Nuestra web utiliza cookies para mejorar tu experiencia, por
            ejemplo, guardando tu carrito de compras. Puedes desactivarlas en tu
            navegador, aunque algunas funciones pueden verse afectadas.
          </p>

          <br />

          <h2>8. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política de vez en cuando. Te notificaremos
            mediante un aviso en nuestra web si realizamos cambios importantes.
          </p>

          <br />

          <h2>9. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta Política de Privacidad, puedes
            escribirnos a:{" "}
            <a href="mailto:soporte@levelupgamer.com">
              soporte@levelupgamer.com
            </a>
          </p>
        </article>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
