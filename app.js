// 1. CATÁLOGO DE PRODUCTOS (Arreglo de objetos)
const productos = [
    {
        id: 'donas',
        nombre: 'Caja de Minidonas x 12',
        descripcion: 'Masa esponjosa artesanal con cobertura de chocolate, arequipe o glaseado y toppings a elección.',
        precio: 18000
    },
    {
        id: 'vela',
        nombre: 'Vela Aromática Personalizada',
        descripcion: 'Vela artesanal en vaso de vidrio con aroma a vainilla o frutos rojos y etiqueta conmemorativa.',
        precio: 15000
    },
    {
        id: 'combo-b2b',
        nombre: 'Paquete Eventos B2B (24 Minidonas + 6 Velas)',
        descripcion: 'Ideal para reuniones corporativas o celebraciones en Santander de Quilichao con empaque personalizado.',
        precio: 110000
    }
];

// Arreglo vacío donde iremos guardando los productos que el cliente agregue
let carrito = [];

// 2. CAPTURAR ELEMENTOS DEL HTML (Manipulación del DOM)
const contenedorProductos = document.getElementById('lista-productos');
const selectProducto = document.getElementById('producto');
const formulario = document.getElementById('form-pedido');
const contenedorResumen = document.getElementById('detalle-resumen');
const textoTotal = document.getElementById('total-pagar');

// 3. PINTAR EL CATÁLOGO Y EL MENÚ DESPLEGABLE DESDE JAVASCRIPT
function cargarCatalogo() {
    // Limpiamos el contenido de ejemplo que estaba escrito en el HTML
    contenedorProductos.innerHTML = '';
    selectProducto.innerHTML = '';

    // Recorremos el arreglo de productos uno por uno con forEach
    productos.forEach((producto) => {
        // Agregamos la tarjeta al catálogo
        contenedorProductos.innerHTML += `
            <article class="tarjeta">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">$${producto.precio.toLocaleString('es-CO')} COP</span>
            </article>
        `;

        // Agregamos la opción al <select> del formulario
        selectProducto.innerHTML += `
            <option value="${producto.id}">
                ${producto.nombre} ($${producto.precio.toLocaleString('es-CO')})
            </option>
        `;
    });
}

// 4. MOSTRAR LOS ÍTEMS AGREGADOS Y SUMAR EL TOTAL
function actualizarResumen() {
    contenedorResumen.innerHTML = '';
    let totalGeneral = 0;

    carrito.forEach((item) => {
        totalGeneral += item.subtotal;

        contenedorResumen.innerHTML += `
            <p style="margin-bottom: 0.8rem;">
                <strong>${item.cantidad}x ${item.nombre}</strong><br>
                <small>Detalle: ${item.detalle}</small><br>
                <span>Subtotal: $${item.subtotal.toLocaleString('es-CO')} COP</span>
            </p>
        `;
    });

    textoTotal.textContent = `$${totalGeneral.toLocaleString('es-CO')} COP`;
}

// 5. ESCUCHAR EL BOTÓN "AGREGAR AL RESUMEN"
formulario.addEventListener('submit', (evento) => {
    // Evita que la página se recargue sola al enviar el formulario
    evento.preventDefault();

    // Leemos los datos ingresados por el usuario
    const idSeleccionado = selectProducto.value;
    const detalleEscrito = document.getElementById('detalle').value;
    const cantidadElegida = Number(document.getElementById('cantidad').value);

    // Buscamos el producto en nuestro arreglo usando su id
    const productoEncontrado = productos.find((prod) => prod.id === idSeleccionado);

    // Creamos el objeto del pedido y lo guardamos en el arreglo carrito
    const nuevoItem = {
        nombre: productoEncontrado.nombre,
        detalle: detalleEscrito,
        cantidad: cantidadElegida,
        subtotal: productoEncontrado.precio * cantidadElegida
    };

    carrito.push(nuevoItem);

    // Refrescamos el resumen en pantalla y limpiamos las casillas del formulario
    actualizarResumen();
    formulario.reset();
});

// Arrancamos la función apenas carga la página
cargarCatalogo();