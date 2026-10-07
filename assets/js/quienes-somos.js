document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("btn_mas");

    const mision = document.getElementById("mision-info");

    const valores = document.getElementById("valores-info");

    const tituloValores = document.querySelector("#contenedor-info > h3");


    boton.addEventListener("click", () => {

        const estaOculto = mision.style.display === "none";

        if (estaOculto) {

            mision.style.display = "flex";
            valores.style.display = "flex";
            tituloValores.style.display = "block";

            boton.textContent = "Ver menos";

        } else {

            mision.style.display = "none";
            valores.style.display = "none";
            tituloValores.style.display = "none";

            boton.textContent = "Ver más";

        }

    });

});