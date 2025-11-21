import React, { useEffect } from "react";
import "../assets/css/stylesheet-termino-y-condiciones.css"

const TerminosYPrivacidad: React.FC = () => {
  useEffect(() => {
    document.title = "Términos y Condiciones - Level Up Gamer";
  }, []);
  return (
    <div className="profileterminosycondiciones page-container">

      {/* Encabezado */}
      <header>
        <h1>Término y Condiciones</h1>
        <p>Última actualización: 13 de Septiembre de 2025</p>
      </header>

      {/* Contenido principal */}
      <main style={{ maxWidth: "900px", margin: "auto", padding: "20px", lineHeight: 1.6 }}>
        {/* Términos y condiciones */}
        <div className="container">
          <article>
            <p>
              Términos y Condiciones de Uso – Level Up Gamer. Bienvenido/a a{" "}
              <strong>Level Up Gamer.</strong> Al registrarte y utilizar nuestro sitio web aceptas los
              siguientes términos y condiciones. Te recomendamos leerlos cuidadosamente.
            </p>

            <br />
            <h2>1. Aceptación de los términos</h2>
            <p>
              Al crear una cuenta en Level Up Gamer, confirmas que has leído, comprendido y aceptado estos
              Términos y Condiciones, así como nuestra Política de Privacidad. Si no estás de acuerdo, por
              favor no utilices nuestros servicios.
            </p>

            <br />
            <h2>2. Registro de usuarios</h2>
            <p>
              Para acceder a ciertas secciones del sitio debes crear una cuenta proporcionando información
              veraz y actualizada. Eres responsable de mantener la confidencialidad de tu contraseña y de toda
              actividad que ocurra en tu cuenta. Level Up Gamer no se hace responsable por el uso indebido de tu
              cuenta por terceros.
            </p>

            <br />
            <h2>3. Uso permitido</h2>
            <p>
              El sitio se ofrece únicamente con fines de entretenimiento y comunidad gamer. Está prohibido
              utilizar Level Up Gamer para actividades ilegales, ofensivas, fraudulentas o que afecten la
              experiencia de otros usuarios. Nos reservamos el derecho de suspender o eliminar cuentas que
              incumplan estas reglas.
            </p>

            <br />
            <h2>4. Contenido del usuario</h2>
            <p>
              Los usuarios pueden publicar comentarios, reseñas u otro contenido, siempre que no sea ofensivo,
              discriminatorio, difamatorio o infrinja derechos de terceros. Al subir contenido, otorgas a Level
              Up Gamer una licencia no exclusiva para mostrarlo dentro de la plataforma.
            </p>

            <br />
            <h2>5. Propiedad intelectual</h2>
            <p>
              Todo el contenido propio de <strong>Level Up Gamer</strong> (diseños, logotipos, imágenes, textos,
              software, etc.) está protegido por derechos de autor. Queda prohibida su reproducción sin autorización
              previa.
            </p>

            <br />
            <h2>6. Modificaciones</h2>
            <p>
              Podemos actualizar estos Términos en cualquier momento. Te notificaremos los cambios mediante el
              sitio web. El uso continuado del servicio implica la aceptación de los nuevos términos.
            </p>
          </article>
        </div>

        {/* Política de privacidad */}
        <div className="container mt-4">
          <article>
            <h2 className="politica">Política de Privacidad – Level Up Gamer</h2>
            <p className="po">
              En Level Up Gamer respetamos tu privacidad y nos comprometemos a proteger tus datos personales.
            </p>

            <br />
            <h2>1. Datos que recopilamos</h2>
            <p>Al registrarte podemos solicitar:</p>

            <ul>
              <li>Nombre de usuario o nickname.</li>
              <li>Correo electrónico.</li>
              <li>Contraseña cifrada.</li>
              <li>Información opcional de perfil gamer (plataformas, juegos favoritos, etc.).</li>
            </ul>

            <br />
            <h2>2. Uso de la información</h2>
            <p>Utilizamos tu información para:</p>

            <ul>
              <li>Crear y gestionar tu cuenta.</li>
              <li>Mejorar tu experiencia en la comunidad.</li>
              <li>Enviarte notificaciones relevantes (nunca spam).</li>
              <li>Proteger la seguridad de nuestra plataforma.</li>
            </ul>

            <br />
            <h2>3. Protección de datos</h2>
            <ul>
              <li>Tu contraseña se almacena de forma cifrada.</li>
              <li>
                No compartimos tu información personal con terceros sin tu consentimiento, salvo obligación legal.
              </li>
            </ul>

            <br />
            <h2>Cookies</h2>
            <p>
              Nuestro sitio utiliza cookies para mejorar la navegación y personalizar la experiencia del usuario.
              Puedes desactivarlas desde la configuración de tu navegador, aunque algunas funciones podrían no estar
              disponibles.
            </p>

            <br />
            <h2>5. Derechos del usuario</h2>
            <p>Tienes derecho a:</p>
            <ul>
              <li>Acceder a tus datos personales.</li>
              <li>Solicitar la modificación o eliminación de tu cuenta.</li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
            </ul>

            <br />
            <h2>Contacto</h2>
            <p>
              Si tienes dudas sobre estos términos o sobre nuestra política de privacidad, puedes escribirnos a:{" "}
              <a href="mailto:soporte@levelupgamer.com">soporte@levelupgamer.com</a>.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default TerminosYPrivacidad;
