let carrito = [];
let posicionCarrusel = 0;

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function toggleCarrito() {
    const modal = document.getElementById('carritoModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ id: Date.now(), nombre, precio });
    actualizarCarrito();
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top:80px; right:20px; background:#4FC3F7; color:white; padding:1rem 2rem; border-radius:5px; z-index:3000;';
    notification.textContent = '✓ Producto agregado al carrito';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function eliminarDelCarrito(id) { carrito = carrito.filter(i => i.id !== id); actualizarCarrito(); }
function vaciarCarrito() { carrito=[]; actualizarCarrito(); }
function finalizarCompra() { carrito=[]; actualizarCarrito(); toggleCarrito(); }

function actualizarCarrito() {
    const count = document.getElementById('carritoCount');
    const items = document.getElementById('carritoItems');
    const total = document.getElementById('carritoTotal');
    count.textContent = carrito.length;
    if(carrito.length===0){ items.innerHTML='<p style="text-align:center;color:#999;">El carrito está vacío</p>'; total.textContent='Total: $0.00'; return;}
    items.innerHTML = carrito.map(item=>`<div class="carrito-item"><div class="carrito-item-info"><strong>${item.nombre}</strong><br><span style="color:#4FC3F7;font-weight:bold;">$${item.precio.toFixed(2)}</span></div><button class="eliminar-item" onclick="eliminarDelCarrito(${item.id})">✖</button></div>`).join('');
    const totalPrecio = carrito.reduce((sum,i)=>sum+i.precio,0);
    total.textContent = `Total: $${totalPrecio.toFixed(2)}`;
}

// Carrusel
function moverCarrusel(direccion){
    const carrusel = document.getElementById('carrusel');
    const items = carrusel.getElementsByClassName('carrusel-item');
    const itemWidth = items[0].offsetWidth + 24;
    const visibleItems = Math.floor(carrusel.parentElement.offsetWidth / itemWidth);
    const maxPosition = items.length - visibleItems;
    posicionCarrusel += direccion;
    if(posicionCarrusel<0)posicionCarrusel=0;
    if(posicionCarrusel>maxPosition)posicionCarrusel=maxPosition;
    carrusel.style.transform=`translateX(-${posicionCarrusel*itemWidth}px)`;
}

setInterval(()=>{
    const carrusel=document.getElementById('carrusel');
    const items=carrusel.getElementsByClassName('carrusel-item');
    const itemWidth=items[0].offsetWidth+24;
    const visibleItems=Math.floor(carrusel.parentElement.offsetWidth/itemWidth);
    const maxPosition=items.length-visibleItems;
    posicionCarrusel++;
    if(posicionCarrusel>maxPosition)posicionCarrusel=0;
    carrusel.style.transform=`translateX(-${posicionCarrusel*itemWidth}px)`;
},3000);

// Cerrar carrito al hacer clic fuera
window.onclick = function(event) {
    if(event.target === document.getElementById('carritoModal')){
        event.target.style.display='none';
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
        e.preventDefault();
        const target=document.querySelector(this.getAttribute('href'));
        if(target){ target.scrollIntoView({behavior:'smooth'});}
    });
});

actualizarCarrito();
