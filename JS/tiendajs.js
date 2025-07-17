
// Filtrar productos por tipo
document.addEventListener("DOMContentLoaded", () => {
    const btnMiniaturas = document.getElementById("mostrar-minis");
    const btnAccesorios = document.getElementById("mostrar-accesorios");
    const btnTodos = document.getElementById("mostrar-todos");

    const productos = document.querySelectorAll(".en-muestra");

    btnMiniaturas.addEventListener("click", (e) => {
        e.preventDefault();
        productos.forEach(p => {
            if (p.classList.contains("en-muestra-miniatura")) {
                p.style.display = "block";
            } else {
                p.style.display = "none";
            }
        });
    });

    btnAccesorios.addEventListener("click", (e) => {
        e.preventDefault();
        productos.forEach(p => {
            if (p.classList.contains("en-muestra-accesorio")) {
                p.style.display = "block";
            } else {
                p.style.display = "none";
            }
        });
    });

    btnTodos.addEventListener("click", (e) => {
        e.preventDefault();
        productos.forEach(p => {
            p.style.display = "block";
        });
    });
});