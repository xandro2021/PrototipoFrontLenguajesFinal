// src/js/login.js
import { API } from "./api.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch(`${API}/account/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    if (!respuesta.ok) {

        document.getElementById("error").innerText =
            "Correo o contraseña incorrectos.";

        return;
    }

    const datos = await respuesta.json();

    localStorage.setItem("token", datos.token);

    localStorage.setItem("usuario",
        JSON.stringify(datos.usuario));

    location.href = "cursos.html";

});
