function crearElemento(tipo) {
    var nodo = document.createElement(tipo);
    return nodo;
}

function crearElementoTexto(tipo, texto) {
    var nodo = document.createElement(tipo);
    var textoNodo = document.createTextNode(texto);
    nodo.appendChild(textoNodo);
    return nodo;
}

function crearElementoImagen(url, alt) {
    var nodo = crearElemento("img");
    nodo.src = url;
    nodo.alt = alt;
    return nodo;
}

function crearElementoLink(href, texto) {
    var nodo = crearElementoTexto("a", texto);
    nodo.href = href;
    return nodo;
}

function adicionarElementoABody(nodo) {
    document.body.appendChild(nodo);
}

function adicionarElementoAContenedor(elemento, contenedor) {
    contenedor.appendChild(elemento);
}

/* ── helper para armar "Label: valor" ── */
function crearDato(label, valor) {
    var p = crearElemento("p");
    p.classList.add("card-dato");
    var bold = crearElementoTexto("strong", label + ": ");
    adicionarElementoAContenedor(bold, p);
    p.appendChild(document.createTextNode(valor));
    return p;
}

/* ── tarjeta reutilizable (RF1 y RF3) ── */
function crearTarjetaPersonaje(personaje) {
    var card = crearElemento("div");
    card.classList.add("personaje-card");

    var imgWrapper = crearElemento("div");
    imgWrapper.classList.add("card-img-wrapper");
    var img = crearElementoImagen(
        personaje.image || "https://via.placeholder.com/200x200?text=DBZ",
        personaje.name
    );
    img.classList.add("card-img");
    adicionarElementoAContenedor(img, imgWrapper);
    adicionarElementoAContenedor(imgWrapper, card);

    var info = crearElemento("div");
    info.classList.add("card-info");

    var nombre = crearElementoTexto("h3", personaje.name);
    nombre.classList.add("card-nombre");
    adicionarElementoAContenedor(nombre, info);

    adicionarElementoAContenedor(crearDato("Raza", personaje.race || "Desconocida"), info);
    adicionarElementoAContenedor(crearDato("Ki", personaje.ki || "0"), info);

    var btn = crearElementoTexto("button", "Ver detalle");
    btn.classList.add("btn-detalle");
    btn.onclick = function () {
        window.location.href = "detalle.html?id=" + personaje.id;
    };
    adicionarElementoAContenedor(btn, info);
    adicionarElementoAContenedor(info, card);

    return card;
}
