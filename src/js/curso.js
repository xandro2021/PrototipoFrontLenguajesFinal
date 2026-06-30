// src/js/curso.js
import {
  API,
  requireLogin,
  authHeaders
} from "./api.js";

requireLogin();

const params = new URLSearchParams(location.search);

const id = params.get("id");

async function cargarCurso() {

  const respuesta = await fetch(`${API}/cursos/${id}`);

  if (!respuesta.ok) {

    alert("Curso no encontrado.");

    location.href = "cursos.html";

    return;
  }

  const curso = await respuesta.json();

  mostrarCurso(curso);

}

cargarCurso();


function mostrarCurso(curso) {

  document.getElementById("cursoCard").innerHTML = `

<h2 class="text-3xl font-bold mb-4">

${curso.titulo}

</h2>

<p class="text-slate-600 mb-6">

${curso.descripcion}

</p>

<div class="space-y-2">

<p>

<strong>Profesor:</strong>

${curso.profesor.nombre}

</p>

<p>

<strong>Categoría:</strong>

${curso.categoria.nombre}

</p>

<p>

<strong>Duración:</strong>

${curso.duracionHoras} horas

</p>

<p>

<strong>Precio:</strong>

₡${curso.precio}

</p>

</div>

<div class="mt-8">

<button
id="btnPaypal"
class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg"
>

Pagar con PayPal

</button>

</div>

`;

  document
    .getElementById("btnPaypal")
    .addEventListener("click", () => pagar(curso.id));

}

async function pagar(cursoId) {

  const respuesta = await fetch(
    `${API}/paypal/create-order`,
    {
      method: "POST",

      headers: authHeaders(),

      body: JSON.stringify({
        cursoId
      })
    });

  const datos = await respuesta.json();

  if (!respuesta.ok) {

    alert(datos.mensaje);

    return;
  }

  const approve = datos.links.find(
    l => l.rel === "approve"
  );

  window.location.href = approve.href;

}
