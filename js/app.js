var personajes = [
    {
        id: 1,
        name: "Goku",
        race: "Saiyan",
        gender: "Male",
        ki: "60.000.000",
        maxKi: "90 Septillion",
        image: "https://dragonball-api.com/characters/goku_normal.webp"
    },
    {
        id: 2,
        name: "Vegeta",
        race: "Saiyan",
        gender: "Male",
        ki: "54.000.000",
        maxKi: "19.84 Septillion",
        image: "https://dragonball-api.com/characters/vegeta_normal.webp"
    },
    {
        id: 3,
        name: "Piccolo",
        race: "Namekian",
        gender: "Male",
        ki: "2.000.000",
        maxKi: "500.000.000",
        image: "https://dragonball-api.com/characters/piccolo_normal.webp"
    },
    {
        id: 5,
        name: "Freezer",
        race: "Frieza Race",
        gender: "Male",
        ki: "530.000",
        maxKi: "52.71 Septillion",
        image: "https://dragonball-api.com/characters/frieza_normal.webp"
    },
    {
        id: 9,
        name: "Celula",
        race: "Android",
        gender: "Male",
        ki: "250.000.000",
        maxKi: "5 Billion",
        image: "https://dragonball-api.com/characters/cell_normal.webp"
    }
]

// mostrar las tarjetas en el grid
function mostrarPersonajes() {
    var grid = document.getElementById("personajesGrid")
    grid.innerHTML = ""

    var busqueda = document.getElementById("busqueda").value.toLowerCase()
    var razaSeleccionada = document.getElementById("filtroRaza").value

    var i = 0
    while (i < personajes.length) {
        var p = personajes[i]
        var coincideNombre = p.name.toLowerCase().indexOf(busqueda) !== -1
        var coincideRaza = razaSeleccionada === "" || p.race === razaSeleccionada
        if (coincideNombre && coincideRaza) {
            var card = crearTarjetaPersonaje(p)
            adicionarElementoAContenedor(card, grid)
        }
        i++
    }
}

// llenar el select de razas
function cargarRazas() {
    var select = document.getElementById("filtroRaza")
    var razas = []
    var i = 0
    while (i < personajes.length) {
        if (razas.indexOf(personajes[i].race) === -1) {
            razas.push(personajes[i].race)
        }
        i++
    }
    var j = 0
    while (j < razas.length) {
        var op = crearElemento("option")
        op.value = razas[j]
        op.textContent = razas[j]
        adicionarElementoAContenedor(op, select)
        j++
    }
}

document.getElementById("busqueda").addEventListener("input", mostrarPersonajes)
document.getElementById("filtroRaza").addEventListener("change", mostrarPersonajes)

cargarRazas()
mostrarPersonajes()
