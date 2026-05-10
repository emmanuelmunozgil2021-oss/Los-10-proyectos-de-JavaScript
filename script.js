// 1. Lógica de Navegación (para que solo se vea un proyecto)
function mostrarProyecto(idProyecto) {
    const proyectos = document.querySelectorAll('.container');
    proyectos.forEach(p => p.classList.remove('activo'));
    
    const seleccionado = document.getElementById(idProyecto);
    if (seleccionado) {
        seleccionado.classList.add('activo');
        localStorage.setItem('ultimoProyecto', idProyecto);
    }
}
// 1.CONTADORRRR
let count = parseInt(localStorage.getItem('contador_valor')) || 0;

const valor = document.querySelector('#value');
const botones = document.querySelectorAll(".btn");

if (valor) {
    valor.textContent = count;
    actualizarColor(count, valor);
}
botones.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const styles = e.currentTarget.classList;

        if (styles.contains("menos")) { 
            count--; 
        } else if (styles.contains("reinicio")) { 
            count = 0; 
        } else if (styles.contains("mas")) { 
            count++; 
        }
        
        localStorage.setItem('contador_valor', count);
        
        valor.textContent = count;
        actualizarColor(count, valor);

        function actualizarColor(valorActual, elemento) {
    if (valorActual > 0) { 
        elemento.style.color = "green"; 
    } else if (valorActual < 0) { 
        elemento.style.color = "red"; 
    } else { 
        elemento.style.color = "#95a5a6"; 
    }
}
    });
});

function actualizarColor(valorActual, elemento) {
    if (valorActual > 0) { elemento.style.color = "green"; } 
    else if (valorActual < 0) { elemento.style.color = "red"; } 
    else { elemento.style.color = "#3b4e61"; }
}
window.addEventListener('DOMContentLoaded', () => {
    const ultimoVisitado = localStorage.getItem('ultimoProyecto');
    
    if (ultimoVisitado) {
        mostrarProyecto(ultimoVisitado);
    } else {
        // 
        mostrarProyecto('p1');
    }
});


//2.LISTA DE TAREASS
function agregarTarea(texto = null) {
    const input = document.getElementById('input-tarea'); 
    const valor = texto || input.value.trim();
    
    if (valor) {
        const lista = document.getElementById('lista-tareas'); 
        const li = document.createElement('li');
        li.className = 'tarea-item';
        li.innerHTML = `
            <span class="tarea-texto">${valor}</span>
            <button class="btn-eliminar" onclick="this.parentElement.remove(); guardarP2();">X</button>
        `;
        lista.appendChild(li);
        
        if(!texto) input.value = ""; 
        guardarP2();
    }
}
function guardarP2() {
    const tareas = Array.from(document.querySelectorAll('.tarea-texto')).map(t => t.innerText);
    localStorage.setItem('p2_data', JSON.stringify(tareas));
}

function cargarTareas() {
    const datosGuardados = JSON.parse(localStorage.getItem('p2_data')) || [];
    datosGuardados.forEach(tarea => agregarTarea(tarea));
}

window.addEventListener('DOMContentLoaded', () => {
    const ultimoVisitado = localStorage.getItem('ultimoProyecto');
    
    if (ultimoVisitado) {
        mostrarProyecto(ultimoVisitado);
    } else {
        mostrarProyecto('p1');
    }
    
    cargarTareas(); 
});

//3.ADIVINA EL NUMERO
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let contadorIntentos = 0;

const entrada = document.getElementById("entrada");
const botonAdivinar = document.getElementById("botonAdivinar");
const botonReiniciar = document.getElementById("botonReiniciar");
const mensaje = document.getElementById("mensaje");
const textoIntentos = document.getElementById("intentos");

botonAdivinar.addEventListener("click", function() {
    let valorUsuario = Number(entrada.value);
    contadorIntentos++;
    textoIntentos.innerText = contadorIntentos;

    if (valorUsuario === numeroSecreto) {
        mensaje.innerText = "¡Correcto! Lo adivinaste.";
        botonReiniciar.style.display = "inline"; 
    } else if (valorUsuario < numeroSecreto) {
        mensaje.innerText = "Muy bajo, intenta uno más alto.";
    } else {
        mensaje.innerText = "Muy alto, intenta uno más bajo.";
    }
});

botonReiniciar.addEventListener("click", function() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    contadorIntentos = 0;
    textoIntentos.innerText = "0";
    mensaje.innerText = "";
    entrada.value = "";
});

//4.CALCULADORA
const contenedor = document.getElementById('p4');

if (contenedor) {
const pantalla = contenedor.querySelector('#pantalla');
const botones = contenedor.querySelectorAll('.btn-calc');
const btnIgual = contenedor.querySelector('#igual');
const btnLimpiar = contenedor.querySelector('#limpiar');

const guardado = localStorage.getItem("ultimoResultado");
    if (guardado) {
        pantalla.innerText = guardado;
    }

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.getAttribute('data-valor');
            if (pantalla.innerText === "0" || pantalla.innerText === "Error") {
                pantalla.innerText = valor;
            } else {
                pantalla.innerText += valor;
            }
        });
    });

    btnLimpiar.addEventListener('click', () => {
        pantalla.innerText = "0";
        localStorage.removeItem("ultimoResultado");
    });

    btnIgual.addEventListener('click', () => {
        try {
            if (pantalla.innerText.includes('/0')) {
                pantalla.innerText = "Error";
                return;
            }

            let resultado = eval(pantalla.innerText);
            pantalla.innerText = resultado;

            localStorage.setItem("ultimoResultado", resultado);

        } catch {
            pantalla.innerText = "Error";
        }
    });
}

// 5.COLORES
const seccionColores = document.getElementById('proyecto-colores');

if (seccionColores) {
const textoHex = seccionColores.querySelector('#codigo-hex');
const btnCambiar = seccionColores.querySelector('#btn-cambiar');
const btnCopiar = seccionColores.querySelector('#btn-copiar');
const aviso = seccionColores.querySelector('#aviso');

const colorGuardado = localStorage.getItem('ultimoColor');
    if (colorGuardado) {
        seccionColores.style.backgroundColor = colorGuardado;
        textoHex.innerText = colorGuardado;
    }


function generarColor() {
        
    const caracteres = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
            color += caracteres[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    btnCambiar.addEventListener('click', () => {
        const nuevoColor = generarColor();
        
        seccionColores.style.backgroundColor = nuevoColor;
        textoHex.innerText = nuevoColor;
        
        localStorage.setItem('ultimoColor', nuevoColor);
    });


    btnCopiar.addEventListener('click', () => {
        const colorACopiar = textoHex.innerText;
        
        navigator.clipboard.writeText(colorACopiar).then(() => {
            aviso.style.display = "block";
            setTimeout(() => aviso.style.display = "none", 2000); 
        });
    });
}

//6.TEMPORIZADOR
const contenedorTM = document.getElementById('tm-contenedor');

if (contenedorTM) {
    let tiempoRestante;
    let intervalo;

const inputMin = contenedorTM.querySelector('#tm-minutos');
const inputSeg = contenedorTM.querySelector('#tm-segundos');
const btnInicio = contenedorTM.querySelector('#tm-inicio');
const btnPausa = contenedorTM.querySelector('#tm-pausa');
const btnReset = contenedorTM.querySelector('#tm-reset');
const alerta = contenedorTM.querySelector('#tm-alerta');

    function actualizarPantalla(totalSegundos) {
        const m = Math.floor(totalSegundos / 60);
        const s = totalSegundos % 60;
        inputMin.value = m;
        inputSeg.value = s < 10 ? "0" + s : s; 
    }

    btnInicio.addEventListener('click', () => {

        clearInterval(intervalo);

        let total = parseInt(inputMin.value) * 60 + parseInt(inputSeg.value);

        if (total <= 0) return;

        alerta.style.display = "none";

        intervalo = setInterval(() => {
            total--;
            actualizarPantalla(total);

            if (total <= 0) {
                clearInterval(intervalo);
                alerta.style.display = "block";
            }
        }, 1000);
    });

    btnPausa.addEventListener('click', () => {
        clearInterval(intervalo);
    });

    btnReset.addEventListener('click', () => {
        clearInterval(intervalo);
        inputMin.value = 0;
        inputSeg.value = 0;
        alerta.style.display = "none";
    });
}

//7.CONTRASEÑA

const btnGenerar = document.getElementById('btn-generar');
const btnCopiarPass = document.getElementById('btn-copiar-pass');
const resultadoPass = document.getElementById('pass-resultado');

const passGuardada = localStorage.getItem('p7_ultima_pass');
if (passGuardada && resultadoPass) {
    resultadoPass.innerText = passGuardada;
}
if (btnGenerar) {
    btnGenerar.addEventListener('click', () => {
        const longitud = parseInt(document.getElementById('pass-longitud').value);
        const incluirMayus = document.getElementById('chk-mayus').checked;
        const incluirMinus = document.getElementById('chk-minus').checked;
        const incluirNum = document.getElementById('chk-num').checked;
        const incluirSimb = document.getElementById('chk-simb').checked;

        let caracteres = "";
        if (incluirMinus) caracteres += "abcdefghijklmnopqrstuvwxyz";
        if (incluirMayus) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (incluirNum) caracteres += "0123456789";
        if (incluirSimb) caracteres += "!@#$%^&*()_+";

        if (caracteres === "") caracteres = "abcdefghijklmnopqrstuvwxyz";

        let passwordGenerada = "";
        for (let i = 0; i < longitud; i++) {
            passwordGenerada += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }

    
        resultadoPass.innerText = passwordGenerada;


        localStorage.setItem('p7_ultima_pass', passwordGenerada);
    });
}
if (btnCopiarPass) {
    btnCopiarPass.addEventListener('click', () => {
        const texto = resultadoPass.innerText;
        if (texto && texto !== "P4ssw0rd!") {
            navigator.clipboard.writeText(texto);
            const originalText = btnCopiarPass.innerText;
            btnCopiarPass.innerText = "¡Copiado!";
            setTimeout(() => btnCopiarPass.innerText = originalText, 1500);
        }
    });
}

//8. MODO OSCURO

const botonModo = document.getElementById('btn-modo');
const tarjetaP8 = document.getElementById('p8');

if (botonModo) {
    botonModo.addEventListener('click', () => {
        
        if (tarjetaP8.style.backgroundColor === "rgb(51, 51, 51)") {
            tarjetaP8.style.backgroundColor = "white";
            tarjetaP8.style.color = "black";
            botonModo.innerText = "Modo Oscuro";
        } else {

            tarjetaP8.style.backgroundColor = "#333333";
            tarjetaP8.style.color = "white";
            botonModo.innerText = "Modo Claro";
        }
    });
}


//9. PIEDRA,PAPEL O TIJERA
const displayPuntosUsuario = document.getElementById('puntos-usuario');
const displayPuntosPC = document.getElementById('puntos-pc');
const textoResultado = document.getElementById('resultado-texto');
const textoEleccionPC = document.getElementById('eleccion-pc');
const botonesArma = document.querySelectorAll('.btn-arma');
const btnResetPPT = document.getElementById('btn-reset-game');


let puntajePPT = JSON.parse(localStorage.getItem('ppt_save')) || { usuario: 0, pc: 0 };


function actualizarInterfazPPT() {
    displayPuntosUsuario.innerText = puntajePPT.usuario;
    displayPuntosPC.innerText = puntajePPT.pc;
    localStorage.setItem('ppt_save', JSON.stringify(puntajePPT));
}


if (displayPuntosUsuario) {
    actualizarInterfazPPT();
}

botonesArma.forEach(boton => {
    boton.addEventListener('click', () => {
        const eleccionUsuario = boton.getAttribute('data-arma');
        const opciones = ["piedra", "papel", "tijera"];
        const eleccionPC = opciones[Math.floor(Math.random() * 3)];

        textoEleccionPC.innerText = `La PC eligió: ${eleccionPC.toUpperCase()}`;

        if (eleccionUsuario === eleccionPC) {
            textoResultado.innerText = "¡Empate! 🤝";
        } else if (
            (eleccionUsuario === "piedra" && eleccionPC === "tijera") ||
            (eleccionUsuario === "papel" && eleccionPC === "piedra") ||
            (eleccionUsuario === "tijera" && eleccionPC === "papel")
        ) {
            textoResultado.innerText = "¡Ganaste! 🏆";
            puntajePPT.usuario++;
        } else {
            textoResultado.innerText = "Perdiste... ❌";
            puntajePPT.pc++;
        }
        actualizarInterfazPPT();
    });
});

if (btnResetPPT) {
    btnResetPPT.addEventListener('click', () => {
        puntajePPT = { usuario: 0, pc: 0 };
        textoResultado.innerText = "¡Elige tu arma!";
        textoEleccionPC.innerText = "La PC eligió: -";
        actualizarInterfazPPT();
    });
}

//10.GALERIA
const seccionGaleria = document.getElementById('p10');

if (seccionGaleria) {
    const contenedorImg = seccionGaleria.querySelector('#contenedor-imagenes');
    const inputBusqueda = seccionGaleria.querySelector('#buscador');
    const botonesFiltro = seccionGaleria.querySelectorAll('.btn-filtro');
    
    const imagenes = [
        { url: 'https://picsum.photos/id/237/400/300', tag: 'animales', cat: 'animales' },
        { url: 'https://picsum.photos/id/1/400/300', tag: 'tecnologia', cat: 'tecnologia' },
        { url: 'https://picsum.photos/id/10/400/300', tag: 'naturaleza', cat: 'naturaleza' },
        { url: 'https://picsum.photos/id/219/400/300', tag: 'animales', cat: 'animales' },
        { url: 'https://picsum.photos/id/3/400/300', tag: 'tecnologia', cat: 'tecnologia' },
        { url: 'https://picsum.photos/id/28/400/300', tag: 'naturaleza', cat: 'naturaleza' },
        { url: 'https://picsum.photos/id/200/400/300', tag: 'animales', cat: 'animales' },
        { url: 'https://picsum.photos/id/160/400/300', tag: 'tecnologia', cat: 'tecnologia' },
        { url: 'https://picsum.photos/id/15/400/300', tag: 'naturaleza', cat: 'naturaleza' }
    ];

    function mostrarGaleria(lista) {
        contenedorImg.innerHTML = "";
        lista.forEach(img => {
            const elemento = document.createElement('img');
            elemento.src = img.url;
            elemento.classList.add('img-item');
            elemento.onclick = () => abrirModal(img.url); // Evento para el modal
            contenedorImg.appendChild(elemento);
        });
    }

    inputBusqueda.addEventListener('keyup', (e) => {
        const texto = e.target.value.toLowerCase();
        const filtradas = imagenes.filter(i => i.tag.includes(texto));
        mostrarGaleria(filtradas);
    });

    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-categoria');
            if(cat === "todas") {
                mostrarGaleria(imagenes);
            } else {
                const filtradas = imagenes.filter(i => i.cat === cat);
                mostrarGaleria(filtradas);
            }
        });
    });

    const modal = seccionGaleria.querySelector('#modal-imagen');
    const imgGrande = seccionGaleria.querySelector('#img-grande');
    const spanCerrar = seccionGaleria.querySelector('.cerrar');

    function abrirModal(url) {
        modal.style.display = "block";
        imgGrande.src = url;
    }

    spanCerrar.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    mostrarGaleria(imagenes);
}
window.addEventListener('load', () => {
    const ultimoVisitado = localStorage.getItem('ultimoProyecto');
    
    if (ultimoVisitado) {
        mostrarProyecto(ultimoVisitado);
    } else {
        mostrarProyecto('p1');
    }
});
