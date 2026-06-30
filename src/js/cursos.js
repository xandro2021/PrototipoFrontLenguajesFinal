// src/js/cursos.js
import {
    API,
    requireLogin,
    authHeaders
} from "./api.js";

requireLogin();

async function cargarCursos() {

    const respuesta = await fetch(`${API}/cursos`);

    const cursos = await respuesta.json();

    const tabla = document.getElementById("tablaCursos");

    cursos.forEach(curso => {

        tabla.innerHTML += `

<tr class="border-b">

<td class="p-3">${curso.id}</td>

<td>${curso.titulo}</td>

<td>${curso.descripcion}</td>

<td>${curso.duracionHoras} horas</td>

<td>$${curso.precio}</td>

<td>${curso.profesor.nombre}</td>

<td>${curso.categoria.nombre}</td>

<td>

<button
class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded comprar"
onclick="location.href='curso.html?id=${curso.id}'"
>

Comprar curso

</button>

</td>

</tr>

`;

    });

}

cargarCursos();

document.getElementById("logout")
.addEventListener("click", () => {

    localStorage.clear();

    location.href = "login.html";

});
