
// Carga el carrito desde el localStorage al cargar la página
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

            // Buscamos si el producto ya está en el carrito
            let productoExistente = productosEnCarrito.find(p => p.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                productosEnCarrito.push({ nombre, precio, imagen, cantidad: 1 });
            }
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
    // Si el carrito está vacío, muestra un mensaje
    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No hay productos en el carrito.</p>';
        totalElemento.textContent = 'Total: $0';
        return;
    }

    let total = 0;
    // Crea el elemento para cada producto en el carrito
    productos.forEach((producto, index) => {
    const item = document.createElement('div');
    item.classList.add('item-carrito');
    item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <div>
            <button class="restar" data-index="${index}">-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="sumar" data-index="${index}">+</button>
        </div>
    `;
    contenedor.appendChild(item);

    // Agregar eventos a los botones de sumar y restar
    document.querySelectorAll('.sumar').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            productos[index].cantidad++;
            localStorage.setItem('productosCarrito', JSON.stringify(productos));
            location.reload();
        });
    });
    document.querySelectorAll('.restar').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            productos[index].cantidad--;
            localStorage.removeItem('productosCarrito');
            localStorage.removeItem('cuentaCarrito');
            if (productos[index].cantidad <= 0) {
                productos.splice(index, 1);
            }
            localStorage.setItem('productosCarrito', JSON.stringify(productos));
            location.reload();
        });
    });
    // Calcular el total
    const precioNumerico = parseInt(producto.precio.replace(/\D/g, ''));
    total += precioNumerico * producto.cantidad;
    });

    totalElemento.textContent = `Total: $${total}`;
});


//Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    localStorage.removeItem('productosCarrito');
    localStorage.removeItem('cuentaCarrito');
    location.reload();
});