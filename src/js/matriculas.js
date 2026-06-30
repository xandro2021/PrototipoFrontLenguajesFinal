import {
    API,
    requireLogin,
    authHeaders
} from "./api.js";

requireLogin();

async function cargarMatriculas() {

    const respuesta = await fetch(
        `${API}/matriculas/mis-matriculas`,
        {
            headers: authHeaders(),
        });

    if (!respuesta.ok) {

        alert("No fue posible cargar las matrículas.");

        return;
    }

    const matriculas = await respuesta.json();

    const tabla = document.getElementById("tablaMatriculas");

    tabla.innerHTML = "";

    if (matriculas.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7" class="text-center p-8 text-slate-500">
                    Todavía no has comprado ningún curso.
                </td>
            </tr>
        `;

        return;
    }

    matriculas.forEach(m => {

        const fecha = new Date(m.fechaInscripcion)
            .toLocaleDateString("es-CR");

        tabla.innerHTML += `

<tr class="border-b hover:bg-slate-50">

    <td class="p-3">${m.id}</td>

    <td>${m.curso.titulo}</td>

    <td>${m.curso.profesor.nombre}</td>

    <td>${fecha}</td>

    <td>$${Number(m.monto).toLocaleString("es-CR")}</td>

    <td>

        <span class="
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            text-sm">

            ${m.pagado ? "Pagado" : "Pendiente"}

        </span>

    </td>

    <td>

        <button
            class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cancelar"
            data-id="${m.id}">

            Cancelar

        </button>

    </td>

</tr>

`;

    });

    document.querySelectorAll(".cancelar")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                cancelar(btn.dataset.id);

            });

        });

}

async function cancelar(id) {

    if (!confirm("¿Desea cancelar esta matrícula?")) {
        return;
    }

    const respuesta = await fetch(
        `${API}/matriculas/cancelar/${id}`,
        {
            method: "DELETE",

            headers: authHeaders(),
        });

    if (!respuesta.ok) {

        const error = await respuesta.json();

        alert(error.mensaje);

        return;
    }

    cargarMatriculas();

}

cargarMatriculas();

document
    .getElementById("logout")
    .addEventListener("click", () => {

        localStorage.clear();

        location.href = "index.html";

    });
