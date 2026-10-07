document.addEventListener("DOMContentLoaded", () => {

    const listaCarrito = document.getElementById("lista-carrito");
    const subtotalCarrito = document.getElementById("subtotal-carrito");
    const envioCarrito = document.getElementById("envio-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const btnSeguir = document.getElementById("btn_seguir");
    const btnComprar = document.getElementById("btn_comprar");

    btnSeguir.addEventListener("click", () => {
        window.location.href = "catalogo.html";
    });

    btnComprar.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

    // Obtener el carrito guardado
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    console.log("Carrito recibido en carrito.html:");
    console.table(carrito);

    mostrarCarrito();


    // MOSTRAR PRODUCTOS
    function mostrarCarrito() {

        listaCarrito.innerHTML = "";

        // Si el carrito está vacío
        if (carrito.length === 0) {

            listaCarrito.innerHTML = `
                <tr>
                    <td colspan="5">
                        El carrito está vacío.
                    </td>
                </tr>
            `;

            return;
        }

        // Mostrar cada producto
        carrito.forEach((producto, indice) => {

            const subtotal = producto.precio * producto.cantidad;

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>
                    <div class="producto-carrito">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <p>${producto.nombre}</p>
                    </div>
                </td>

                <td>$${producto.precio.toFixed(2)}</td>

                <td>
                    <div class="cantidad">

                        <button class="btn-menos" data-indice="${indice}">
                            -
                        </button>

                        <input 
                            type="text" 
                            value="${producto.cantidad}" 
                            readonly
                        >

                        <button class="btn-mas" data-indice="${indice}">
                            +
                        </button>

                    </div>
                </td>

                <td>$${subtotal.toFixed(2)}</td>

                <td>
                    <button class="btn_eliminar" data-indice="${indice}">
                        <img 
                            src="../imgs/eliminar.png" 
                            width="25" 
                            height="25"
                            alt="Eliminar"
                        >
                    </button>
                </td>
            `;

            listaCarrito.appendChild(fila);
        });

        activarBotones();
        actualizarResumen();
    }


    // ACTIVAR BOTONES + Y -
    function activarBotones() {

    const botonesMas = document.querySelectorAll(".btn-mas");
    const botonesMenos = document.querySelectorAll(".btn-menos");
    const botonesEliminar = document.querySelectorAll(".btn_eliminar");


    // Botón +
    botonesMas.forEach(boton => {

        boton.addEventListener("click", () => {

            const indice = Number(boton.dataset.indice);

            carrito[indice].cantidad++;

            guardarCarrito();
            mostrarCarrito();

        });

    });


    // Botón -
    botonesMenos.forEach(boton => {

        boton.addEventListener("click", () => {

            const indice = Number(boton.dataset.indice);

            // La cantidad mínima es 1
            if (carrito[indice].cantidad > 1) {

                carrito[indice].cantidad--;

                guardarCarrito();
                mostrarCarrito();

            }

        });

    });


    // Botón eliminar
    botonesEliminar.forEach(boton => {

        boton.addEventListener("click", () => {

            const indice = Number(boton.dataset.indice);

            console.log("Eliminando producto:", carrito[indice]);

            carrito.splice(indice, 1);

            guardarCarrito();
            mostrarCarrito();

        });

    });

}

    // ==========================================
    // ACTUALIZAR RESUMEN DE COMPRA
    // ==========================================
    function actualizarResumen() {

        let subtotal = 0;

        // Sumar el subtotal de cada producto
        carrito.forEach(producto => {

            subtotal += producto.precio * producto.cantidad;

        });

        // Costo de envío
        const envio = 60;

        // Calcular total
        const total = subtotal + envio;

        // Mostrar resultados
        subtotalCarrito.textContent = `$${subtotal.toFixed(2)}`;
        envioCarrito.textContent = `$${envio.toFixed(2)}`;
        totalCarrito.textContent = `$${total.toFixed(2)}`;

    }


    // GUARDAR CARRITO
    function guardarCarrito() {

        localStorage.setItem("carrito", JSON.stringify(carrito));

        console.log("Carrito actualizado:");
        console.table(carrito);
    }

});