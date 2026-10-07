document.addEventListener("DOMContentLoaded", () => {

    // Obtener elementos del HTML
    const productosCheckout = document.getElementById("productos-checkout");

    const subtotalCheckout = document.getElementById("subtotal-checkout");
    const envioCheckout = document.getElementById("envio-checkout");
    const totalCheckout = document.getElementById("total-checkout");


    // Obtener el carrito guardado
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    console.log("Carrito recibido en checkout:");
    console.table(carrito);


    // Mostrar productos
    let subtotal = 0;

    productosCheckout.innerHTML = "";


    carrito.forEach(producto => {

        const subtotalProducto = producto.precio * producto.cantidad;

        subtotal += subtotalProducto;


        const productoHTML = document.createElement("div");

        productoHTML.classList.add("producto-checkout");

        productoHTML.innerHTML = `
            <p>
                <strong>${producto.nombre}</strong>
                <br>
                Cantidad: ${producto.cantidad}
            </p>

            <span>
                $${subtotalProducto.toFixed(2)}
            </span>
        `;


        productosCheckout.appendChild(productoHTML);

    });


    // Calcular envío
    const envio = 60;

    // Calcular total
    const total = subtotal + envio;


    // Mostrar cantidades
    subtotalCheckout.textContent = `$${subtotal.toFixed(2)}`;

    envioCheckout.textContent = `$${envio.toFixed(2)}`;

    totalCheckout.textContent = `$${total.toFixed(2)}`;

});