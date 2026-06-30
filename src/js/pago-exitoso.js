import {
    API,
    requireLogin,
    authHeaders
} from "./api.js";

requireLogin();

const params = new URLSearchParams(location.search);

const orderId = params.get("token");

capturar();

async function capturar() {

    const respuesta = await fetch(
        `${API}/paypal/capture-order`,
        {
            method: "POST",

            headers: authHeaders(),

            body: JSON.stringify({
                orderId
            })
        });

    const datos = await respuesta.json();

    if (!respuesta.ok) {

        alert(datos.mensaje);

        location.href = "cursos.html";

        return;
    }

    location.href = "mis-matriculas.html";

}
