

function cargarCarritoDesdeStorage() {
    const cuenta = localStorage.getItem('cuentaCarrito') || 0;
    document.getElementById('cuenta-carrito').textContent = cuenta;
}

function actualizarCuentaCarrito() {
    let botonesComprar = document.getElementsByClassName('boton-comprar');

    //Nos aseguramos de que cargue lo que ya estaba en el carrito (por si se actualizó)
    cargarCarritoDesdeStorage();

    //Convertimos el HTMLCollection a array para usar forEach
    Array.from(botonesComprar).forEach((boton, index) => {
        boton.addEventListener('click', () => {
            //Aumenta el contador
            let cuentaActual = parseInt(localStorage.getItem('cuentaCarrito') || '0');
            cuentaActual++;
            localStorage.setItem('cuentaCarrito', cuentaActual);
            document.getElementById('cuenta-carrito').textContent = cuentaActual;

            //Obtener el producto desde el DOM
            const producto = boton.parentElement;
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('p').textContent;
            const imagen = producto.querySelector('img').src;

            //Guardarlo en una lista de productos
            let productosEnCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
            productosEnCarrito.push({ nombre, precio, imagen });
            localStorage.setItem('productosCarrito', JSON.stringify(productosEnCarrito));
        });
    });
}

//Ejecutar la función al cargar el DOM
document.addEventListener('DOMContentLoaded', actualizarCuentaCarrito);


//Mostrar  el carrito
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('carrito-contenedor');
    const totalElemento = document.getElementById('total');

    let productos = JSON.parse(localStorage.getItem('productosCarrito')) || [];

    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        totalElemento.textContent = 'Total: $0';
        return;
    }

    let total = 0;

    productos.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('item-carrito');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
        `;
        contenedor.appendChild(item);

        // Sumar el precio
        const precioNumerico = parseInt(producto.precio.replace(/\D/g, ''));
        total += precioNumerico;
    });

    totalElemento.textContent = `Total: $${total}`;
});


//Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    localStorage.removeItem('productosCarrito');
    localStorage.removeItem('cuentaCarrito');
    location.reload();
});