let carrito = []


function agregarProducto(producto, precio){
    let productos = {
                        product: producto, 
                        price: precio
                    }
    
    JSON.stringify(localStorage.setItem('nuevoProducto', productos))
    carrito.push(productos)

    let nodo = document.getElementById('carrito');

    let parrafo = document.createElement('p')
    parrafo.textContent = 'Producto ${productos.product} - $${productos.price}'

    nodo.appendChild(parrafo)
    let aux = JSON.parse(localStorage.getItem('nuevoProducto'))
    console.log(aux)

}

let boton = document.getElementById('btn-carrito')

boton.addEventListener("click", () => {agregarProducto('Remera', '2500')})

const generarCarrito = (producto, precio) => {}
