// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", abierto);
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Enlace activo según la sección visible
const secciones = document.querySelectorAll("main section[id]");
const enlaces = document.querySelectorAll(".nav a");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        enlaces.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${entrada.target.id}`)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
secciones.forEach((s) => observador.observe(s));

// Formulario de contacto (base: abre el correo con los datos)
// Más adelante puedes conectarlo a un backend Spring Boot con fetch()
const form = document.getElementById("form-contacto");
const mensaje = form.querySelector(".form-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(form);
  const asunto = encodeURIComponent(`Contacto desde tu portafolio - ${datos.get("nombre")}`);
  const cuerpo = encodeURIComponent(`${datos.get("mensaje")}\n\nCorreo: ${datos.get("correo")}\nTeléfono: ${datos.get("telefono") || "No indicado"}`);
  window.location.href = `mailto:yesidh464@gmail.com?subject=${asunto}&body=${cuerpo}`;
  mensaje.textContent = "Se abrió tu cliente de correo para enviar el mensaje.";
  form.reset();
});