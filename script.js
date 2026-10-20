/*NAVBAR*/
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar-custom");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


/* CARGAR MENU */
fetch("menu.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("menu-container").innerHTML = data;
  });



/*ANIMACION*/
const elementosFade = document.querySelectorAll(".fade-in");

const observador = new IntersectionObserver(function(elementos) {

  elementos.forEach(function(elemento) {
    if (elemento.isIntersecting) {
      elemento.target.classList.add("visible");
    }
  });

});

elementosFade.forEach(function(elemento) {
  observador.observe(elemento);
});


/* CONSULTA DE PEDIDOS */
const formularioConsulta = document.querySelector("#form-consulta");

if (formularioConsulta) {

    formularioConsulta.addEventListener("submit", async function(evento) {

        evento.preventDefault();

        const numeroPedido = document.querySelector("#numero-pedido").value.trim();
        const resultado = document.querySelector("#resultado-pedido");

        resultado.innerHTML = "<p>Consultando pedido...</p>";

        try {

            const respuesta = await fetch(
                `http://127.0.0.1:5000/pedidos/${encodeURIComponent(numeroPedido)}`
            );

            const pedido = await respuesta.json();

            if (!respuesta.ok) {

                resultado.innerHTML = `
                    <div class="resultado-pedido">
                        <h4>
                            <i class="bi bi-exclamation-circle-fill text-danger"></i>
                            Pedido no encontrado
                        </h4>

                        <p>
                            No encontramos un pedido con el número:
                            <strong>${numeroPedido}</strong>
                        </p>

                        <p>
                            Verifica el número ingresado e inténtalo nuevamente.
                        </p>

                        <button type="button"
                                class="btn-nueva-consulta mt-3"
                                id="nueva-consulta">
                            <i class="bi bi-arrow-repeat"></i>
                            Nueva consulta
                        </button>
                    </div>
                `;

                return;
            }

            let claseEstado = "";

            if (pedido.estado_pedido === "En fabricación") {
                claseEstado = "estado-fabricacion";
            } else if (pedido.estado_pedido === "Listo para entregar") {
                claseEstado = "estado-listo";
            } else if (pedido.estado_pedido === "Entregado") {
                claseEstado = "estado-entregado";
            }

            const fechaEstimada = pedido.fecha_estimada_entrega
                ? new Date(pedido.fecha_estimada_entrega).toLocaleDateString("es-CO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC"
                })
                : "Pendiente por confirmar";

            resultado.innerHTML = `
                <div class="resultado-pedido">

                    <h4>
                        <i class="bi bi-check-circle-fill text-success"></i>
                        Pedido encontrado
                    </h4>

                    <p>
                        <strong>Número de pedido:</strong>
                        ${pedido.numero_pedido}
                    </p>

                    <p>
                        <strong>Tipo de lente:</strong>
                        ${pedido.tipo_lente}
                    </p>

                    <p>
                        <strong>Estado:</strong>
                        <span class="estado-pedido ${claseEstado}">
                            ${pedido.estado_pedido}
                        </span>
                    </p>

                    <p>
                        <strong>Fecha estimada:</strong>
                        ${fechaEstimada}
                    </p>

                </div>

                <button type="button"
                        class="btn-nueva-consulta mt-3"
                        id="nueva-consulta">
                    <i class="bi bi-arrow-repeat"></i>
                    Nueva consulta
                </button>
            `;

        } catch (error) {

            console.error("Error al consultar el pedido:", error);

            resultado.innerHTML = `
                <div class="resultado-pedido">
                    <h4>
                        <i class="bi bi-exclamation-triangle-fill text-danger"></i>
                        No fue posible consultar el pedido
                    </h4>

                    <p>
                        No pudimos conectar con el servidor.
                        Inténtalo nuevamente más tarde.
                    </p>
                </div>
            `;
        }

    });

}

        /* DESPLAZAMIENTO AL RESULTADO */
        resultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });



/* NUEVA CONSULTA */
document.addEventListener("click", function(evento) {

    if (evento.target.closest("#nueva-consulta")) {

        document.querySelector("#numero-pedido").value = "";
        document.querySelector("#resultado-pedido").innerHTML = "";

        document.querySelector("#numero-pedido").focus();
    }

});

/* FORMULARIO DE CONTACTO */
const formularioContacto = document.querySelector("#form-contacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const nombre = document.querySelector("#nombre").value;
        const telefono = document.querySelector("#telefono").value;
        const correo = document.querySelector("#correo").value;
        const mensaje = document.querySelector("#mensaje").value;

        const textoWhatsApp = `
Hola, soy ${nombre}.

Teléfono: ${telefono}
Correo: ${correo}

Mensaje:
${mensaje}
        `;

        const mensajeCodificado = encodeURIComponent(textoWhatsApp);

        const numeroWhatsApp = "573182627710";

        const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

        window.open(enlaceWhatsApp, "_blank");

    });

}

/* COTIZAR - REGLAS DE LOS FILTROS */

const filtros = document.querySelectorAll('input[name="filtros"]');

filtros.forEach(function(filtro) {

    filtro.addEventListener("change", function() {

        const fotocromatico = document.querySelector(
            'input[name="filtros"][value="Fotocromático"]'
        );

        const transition = document.querySelector(
            'input[name="filtros"][value="Transition"]'
        );

        const polarizado = document.querySelector(
            'input[name="filtros"][value="Polarizado"]'
        );

        const terapeuticos = document.querySelector(
            'input[name="filtros"][value="Filtros Terapéuticos Médicos"]'
        );

        const solares = document.querySelector(
            'input[name="filtros"][value="Filtros Solares de Color"]'
        );

        /* Fotocromático y Transition no pueden combinarse */

        if (filtro.value === "Fotocromático" && filtro.checked) {
            transition.checked = false;
        }

        if (filtro.value === "Transition" && filtro.checked) {
            fotocromatico.checked = false;
        }

        /* Filtros exclusivos */

        if (polarizado.checked) {

            filtros.forEach(function(otroFiltro) {

                if (otroFiltro !== polarizado) {
                    otroFiltro.checked = false;
                }

            });

        }

        if (terapeuticos.checked) {

            filtros.forEach(function(otroFiltro) {

                if (otroFiltro !== terapeuticos) {
                    otroFiltro.checked = false;
                }

            });

        }

        if (solares.checked) {

            filtros.forEach(function(otroFiltro) {

                if (otroFiltro !== solares) {
                    otroFiltro.checked = false;
                }

            });

        }

    });

});

/* COTIZAR - REGLAS DE LAS MONTURAS */

const monturas = document.querySelectorAll('input[name="tipo_montura"]');

monturas.forEach(function(montura) {

    montura.addEventListener("change", function() {

        // Al seleccionar una montura,
        // se desmarcan automáticamente las demás.

        monturas.forEach(function(otraMontura) {

            if (otraMontura !== montura) {
                otraMontura.checked = false;
            }

        });

    });

});

/* PREPARAR EL FORMULARIO PARA WHATSAPP */

const formularioCotizacion = document.querySelector("#form-cotizacion");

if (formularioCotizacion) {

    formularioCotizacion.addEventListener("submit", function(evento) {

        evento.preventDefault();

        // DATOS DEL CLIENTE
        const nombre = document.querySelector("#nombre").value;
        const whatsapp = document.querySelector("#whatsapp").value;

        // TIPO DE LENTE
        const tipoLente = document.querySelector(
            'input[name="tipo_lente"]:checked'
        );

        // MATERIAL
        const materialLente = document.querySelector(
            'input[name="material_lente"]:checked'
        );

        // FILTROS
        const filtrosSeleccionados = document.querySelectorAll(
            'input[name="filtros"]:checked'
        );

        //  MONTURA
        const tipoMontura = document.querySelector(
            'input[name="tipo_montura"]:checked'
        );

        // CREAR LISTA DE FILTROS
        let filtros = [];

        filtrosSeleccionados.forEach(function(filtro) {
            filtros.push(filtro.value);
        });

        // CREAR MENSAJE
        const mensajeWhatsApp = `
Hola, quiero solicitar una cotización de lentes.

*Datos del cliente*
Nombre: ${nombre}
WhatsApp: ${whatsapp}

*Características de los lentes*
Tipo de lente: ${tipoLente ? tipoLente.value : "No seleccionado"}
Material: ${materialLente ? materialLente.value : "No seleccionado"}
Filtros y tratamientos: ${filtros.length > 0 ? filtros.join(", ") : "Ninguno"}
Montura: ${tipoMontura ? tipoMontura.value : "No seleccionado"}

Por favor, envía(adjunta) en este chat la foto(formato JPG, JPEG o PNG) de tu fórmula para completar la solicitud de cotización.
        `;

        const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

        const numeroWhatsApp = "573182627710";

        const enlaceWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

        window.open(enlaceWhatsApp, "_blank");

    });

}