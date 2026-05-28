/* ─── RF2: ficha del personaje ─── */

function obtenerIdDeURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function mostrarFichaPersonaje(personaje) {
    var contenedor = document.getElementById("detalleContenido");
    contenedor.innerHTML = "";

    /* ── card principal ── */
    var card = crearElemento("div");
    card.classList.add("ficha-card");

    /* imagen */
    var imgWrap = crearElemento("div");
    imgWrap.classList.add("ficha-img-wrap");
    var img = crearElementoImagen(personaje.image || "", personaje.name);
    img.classList.add("ficha-img");
    adicionarElementoAContenedor(img, imgWrap);
    adicionarElementoAContenedor(imgWrap, card);

    /* bloque derecho */
    var info = crearElemento("div");
    info.classList.add("ficha-info");

    /* nombre */
    var nombre = crearElementoTexto("h2", personaje.name);
    nombre.classList.add("ficha-nombre");
    adicionarElementoAContenedor(nombre, info);

    /* subtítulo raza - género - afiliación */
    var subtitulo = crearElementoTexto("p",
        [personaje.race, personaje.gender, personaje.affiliation]
            .filter(Boolean).join(" - ")
    );
    subtitulo.classList.add("ficha-subtitulo");
    adicionarElementoAContenedor(subtitulo, info);

    /* badges Ki */
    var badges = crearElemento("div");
    badges.classList.add("ficha-badges");

    var badgeBaseKi = crearElemento("div");
    badgeBaseKi.classList.add("badge");
    var lblBase = crearElementoTexto("span", "Base Ki");
    lblBase.classList.add("badge-label");
    var valBase = crearElementoTexto("span", personaje.ki || "0");
    valBase.classList.add("badge-valor");
    adicionarElementoAContenedor(lblBase, badgeBaseKi);
    adicionarElementoAContenedor(valBase, badgeBaseKi);

    var badgeMaxKi = crearElemento("div");
    badgeMaxKi.classList.add("badge");
    var lblMax = crearElementoTexto("span", "Max Ki");
    lblMax.classList.add("badge-label");
    var valMax = crearElementoTexto("span", personaje.maxKi || "0");
    valMax.classList.add("badge-valor", "badge-valor--amarillo");
    adicionarElementoAContenedor(lblMax, badgeMaxKi);
    adicionarElementoAContenedor(valMax, badgeMaxKi);

    var badgeId = crearElemento("div");
    badgeId.classList.add("badge");
    var lblId = crearElementoTexto("span", "ID");
    lblId.classList.add("badge-label");
    var valId = crearElementoTexto("span", String(personaje.id));
    valId.classList.add("badge-valor", "badge-valor--amarillo");
    adicionarElementoAContenedor(lblId, badgeId);
    adicionarElementoAContenedor(valId, badgeId);

    adicionarElementoAContenedor(badgeBaseKi, badges);
    adicionarElementoAContenedor(badgeMaxKi, badges);
    adicionarElementoAContenedor(badgeId, badges);
    adicionarElementoAContenedor(badges, info);

    /* descripción */
    var desc = crearElementoTexto("p", personaje.description || "Sin descripción disponible.");
    desc.classList.add("ficha-desc");
    adicionarElementoAContenedor(desc, info);

    /* botón ver planeta */
    if (personaje.originPlanet) {
        var btnPlaneta = crearElementoTexto("button",
            "Ver planeta: " + personaje.originPlanet.name
        );
        btnPlaneta.classList.add("btn-planeta");
        btnPlaneta.onclick = function () {
            window.location.href = "planeta.html?id=" + personaje.originPlanet.id;
        };
        adicionarElementoAContenedor(btnPlaneta, info);
    }

    adicionarElementoAContenedor(info, card);
    adicionarElementoAContenedor(card, contenedor);

    /* ── transformaciones ── */
    if (personaje.transformations && personaje.transformations.length > 0) {
        var tituloTransf = crearElementoTexto("h3", "Transformaciones");
        tituloTransf.classList.add("seccion-titulo");
        adicionarElementoAContenedor(tituloTransf, contenedor);

        var grid = crearElemento("div");
        grid.classList.add("transf-grid");

        personaje.transformations.forEach(function (t) {
            var tc = crearElemento("div");
            tc.classList.add("transf-card");

            var tImg = crearElementoImagen(t.image || "", t.name);
            tImg.classList.add("transf-img");
            adicionarElementoAContenedor(tImg, tc);

            var tNombre = crearElementoTexto("p", t.name);
            tNombre.classList.add("transf-nombre");
            adicionarElementoAContenedor(tNombre, tc);

            var tKi = crearElementoTexto("p", "Ki: " + (t.ki || "?"));
            tKi.classList.add("transf-ki");
            adicionarElementoAContenedor(tKi, tc);

            adicionarElementoAContenedor(tc, grid);
        });

        adicionarElementoAContenedor(grid, contenedor);
    }
}

function cargarDetalle() {
    var id = obtenerIdDeURL() || 1;
    var contenedor = document.getElementById("detalleContenido");

    fetch("https://dragonball-api.com/api/characters/" + id)
        .then(function (res) { return res.json(); })
        .then(function (personaje) {
            mostrarFichaPersonaje(personaje);
        })
        .catch(function (err) {
            contenedor.innerHTML = '<div class="error-msg">Error al cargar el personaje.</div>';
            console.error(err);
        });
}

cargarDetalle();
