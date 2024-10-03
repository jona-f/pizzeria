// Función para filtrar las categorías
function filtrarCategoria(categoria) {
    const categorias = document.querySelectorAll('.categoria');

    categorias.forEach(cat => {
        if (categoria === 'todos') {
            cat.style.display = 'flex';  // Muestra todas las categorías
        } else {
            cat.style.display = cat.classList.contains(categoria) ? 'flex' : 'none';  // Muestra solo la categoría seleccionada
        }
    });
}

// Lógica del pedido
let pedido = [];

function agregarPedido(nombre, precio, inputId) {
    const cantidad = parseInt(document.getElementById(inputId).value);

    if (cantidad < 1) {
        alert("La cantidad debe ser al menos 1.");
        return;
    }

    // Verifica si el ítem ya está en el pedido
    const index = pedido.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        // Si existe, actualiza la cantidad
        pedido[index].cantidad += cantidad;
    } else {
        // Si no existe, lo agrega al pedido
        const itemPedido = { nombre, precio, cantidad };
        pedido.push(itemPedido);
    }

    actualizarPedido();
}

function actualizarPedido() {
    const pedidoContainer = document.getElementById("pedido");
    const totalContainer = document.getElementById("total");

    // Limpia el pedido actual
    pedidoContainer.innerHTML = '';

    if (pedido.length === 0) {
        pedidoContainer.innerHTML = '<p>No hay productos en el pedido.</p>';
        totalContainer.textContent = '0';
        return;
    }

    let nuevoTotal = 0;

    pedido.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        nuevoTotal += subtotal;

        const itemHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
            <strong>${item.nombre}</strong> x${item.cantidad} - $${subtotal}
        </div>
        <button class="btn btn-danger btn-sm" onclick="eliminarItem(${index})">Eliminar</button>
        </div>
    `;
        pedidoContainer.innerHTML += itemHTML;
    });

    totalContainer.textContent = nuevoTotal;
}

function eliminarItem(index) {
    pedido.splice(index, 1);
    actualizarPedido();
}

function confirmarPedido() {
    if (pedido.length === 0) {
        alert("Tu pedido está vacío.");
        return;
    }

    let mensaje = "Hola, quiero realizar el siguiente pedido:\n";
    pedido.forEach(item => {
        mensaje += `- ${item.nombre} x${item.cantidad}\n`;
    });

    const total = document.getElementById("total").textContent;
    mensaje += `Total: $${total}\nPago en efectivo y envío a domicilio.`;

    // Reemplaza '123456789' con el número de WhatsApp del local (incluye el código de país, pero sin el '+' ni '00')
    const numeroWhatsApp = '123456789'; // Ejemplo: '5491123456789' para Argentina
    const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(whatsappUrl, "_blank");
}

// Opcional: Guarda el pedido en LocalStorage para persistencia (si el usuario recarga la página)
window.onload = function () {
    if (localStorage.getItem('pedido')) {
        pedido = JSON.parse(localStorage.getItem('pedido'));
        actualizarPedido();
    }
}

function agregarPedido(nombre, precio, inputId) {
    const cantidad = parseInt(document.getElementById(inputId).value);

    if (cantidad < 1) {
        alert("La cantidad debe ser al menos 1.");
        return;
    }

    // Verifica si el ítem ya está en el pedido
    const index = pedido.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        // Si existe, actualiza la cantidad
        pedido[index].cantidad += cantidad;
    } else {
        // Si no existe, lo agrega al pedido
        const itemPedido = { nombre, precio, cantidad };
        pedido.push(itemPedido);
    }

    actualizarPedido();
    localStorage.setItem('pedido', JSON.stringify(pedido));
}

function eliminarItem(index) {
    pedido.splice(index, 1);
    actualizarPedido();
    localStorage.setItem('pedido', JSON.stringify(pedido));
}
