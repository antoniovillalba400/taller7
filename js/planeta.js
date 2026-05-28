/* ─── RF3: página del planeta ─── */

function obtenerIdDeURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function mostrarPlaneta(planeta) {
    var contenedor = document.getElementById("planetaContenido");
    contenedor.innerHTML = "";

    /* ── card del planeta ── */
    var card = crearElemento("div");
    card.classList.add("planeta-card");

    var img = crearElementoImagen(
        planeta.image || "https://via.placeholder.com/220x180?text=Planeta",
        planeta.name
    );
    img.classList.add("planeta-img");
    adicionarElementoAContenedor(img, card);

    var info = crearElemento("div");
    info.classList.add("planeta-info");

    var nombre = crearElementoTexto("h2", planeta.name);
    nombre.classList.add("planeta-nombre");
    adicionarElementoAContenedor(nombre, info);

    var estado = crearElementoTexto("p",
        planeta.isDestroyed ? "Planeta destruido" : "Planeta activo"
    );
    estado.classList.add(planeta.isDestroyed ? "planeta-destruido" : "planeta-activo");
    adicionarElementoAContenedor(estado, info);

    var desc = crearElementoTexto("p", planeta.description || "Sin descripción disponible.");
    desc.classList.add("planeta-desc");
    adicionarElementoAContenedor(desc, info);

    adicionarElementoAContenedor(info, card);
    adicionarElementoAContenedor(card, contenedor);

    /* ── personajes del planeta ── */
    var personajes = planeta.characters || [];
    if (personajes.length > 0) {
        var titulo = crearElementoTexto("h3", "Personajes del planeta");
        titulo.classList.add("seccion-titulo");
        adicionarElementoAContenedor(titulo, contenedor);

        var grid = crearElemento("div");
        grid.classList.add("personajes-grid");

        personajes.forEach(function (p) {
            var tarjeta = crearTarjetaPersonaje(p);
            adicionarElementoAContenedor(tarjeta, grid);
        });

        adicionarElementoAContenedor(grid, contenedor);
    }
}

function cargarPlaneta() {
    var id = obtenerIdDeURL();
    var contenedor = document.getElementById("planetaContenido");

    if (!id) {
        contenedor.innerHTML = '<div class="error-msg">No se especificó un planeta.</div>';
        return;
    }

    fetch("https://dragonball-api.com/api/planets/" + id)
        .then(function (res) { return res.json(); })
        .then(function (planeta) {
            mostrarPlaneta(planeta);
        })
        .catch(function (err) {
            contenedor.innerHTML = '<div class="error-msg">Error al cargar el planeta.</div>';
            console.error(err);
        });
}

cargarPlaneta();
