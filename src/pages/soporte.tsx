import React from "react";
import "../assets/css/stylesheet-formulario-soporte.css";

export default function Soporte() {
  return (
    <div className="profilesoporte page-container">

      {/* CONTENEDOR FORMULARIO + MAPA */}
      <div className="contenedor-form-mapa">

        {/* FORMULARIO */}
        <div className="formulario">
          <form>
            <label htmlFor="fname">Nombres</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Tus Nombres.."
              className="mb-3"
            />

            <label htmlFor="lname">Apellidos</label>
            <input
              type="text"
              id="lname"
              name="lastname"
              placeholder="Tus Apellidos.."
              className="mb-3"
            />

            <label htmlFor="country">País</label>
            <select id="country" name="country" className="mb-3">
              <option value="chile">Chile</option>
              <option value="argentina">Argentina</option>
              <option value="peru">Perú</option>
            </select>

            <label htmlFor="subject">Asunto</label>
            <textarea
              id="subject"
              name="subject"
              placeholder="Escribe algo.."
              className="mb-3"
            />

            <input type="submit" value="Enviar" className="btn" />
          </form>
        </div>

        {/* MAPA */}
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9036.840546535235!2d-73.06175933793867!3d-36.7944157561956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b4503c9a1735%3A0x3fc32996839e6986!2sDuoc%20UC%3A%20Sede%20San%20Andr%C3%A9s%20De%20Concepci%C3%B3n!5e0!3m2!1ses!2scl!4v1757751331192!5m2!1ses!2scl"
            loading="lazy"
            allowFullScreen
            title="Ubicación Duoc UC"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
