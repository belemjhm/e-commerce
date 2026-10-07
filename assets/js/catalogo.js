// ========================================
// CARGAR PRODUCTOS DESDE EL JSON
// ========================================

let productos = [];

async function cargarProductos() {

    try {

        const respuesta = await fetch("../assets/data/productos.json");

        productos = await respuesta.json();

        console.log("Productos cargados correctamente:");
        console.log(productos);

        configurarBotones();

    } catch (error) {

        console.error("Error al cargar productos:", error);

    }

}


// ========================================
// CONFIGURAR BOTONES "AGREGAR AL CARRITO"
// ========================================

function configurarBotones() {

    const botones = document.querySelectorAll(".btn_agregar");

    console.log("Botones encontrados:", botones.length);


    botones.forEach((boton, indice) => {

    boton.addEventListener("click", function () {

        const producto = productos[indice];

        agregarAlCarrito(producto);

    });

});

}

// ========================================
// AGREGAR PRODUCTO AL CARRITO
// ========================================

function agregarAlCarrito(producto) {

    // Obtener carrito existente
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    // Buscar si el producto ya existe
    const productoExistente = carrito.find(
        item => item.id === producto.id
    );


    if (productoExistente) {

        // Si ya existe, aumentar cantidad
        productoExistente.cantidad++;

    } else {

        // Si no existe, agregarlo
        carrito.push({

            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria,
            cantidad: 1

        });

    }


    // Guardar carrito actualizado
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    console.log("Carrito actualizado:");
    console.table(carrito);

}
// ========================================
// INICIAR
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    cargarProductos();

});