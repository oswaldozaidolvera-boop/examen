const carrusel = document.querySelector('[data-carrusel]');

if (carrusel) {
    const pista = carrusel.querySelector('.carrusel-pista');
    const diapositivas = [...carrusel.querySelectorAll('.diapositiva')];
    const indicadores = carrusel.querySelector('[data-carrusel-indicadores]');
    const anterior = carrusel.querySelector('[data-carrusel-anterior]');
    const siguiente = carrusel.querySelector('[data-carrusel-siguiente]');
    let indice = 0;
    let temporizador;

    diapositivas.forEach((_, posicion) => {
        const indicador = document.createElement('button');
        indicador.type = 'button';
        indicador.className = 'carrusel-indicador';
        indicador.setAttribute('aria-label', `Ver producto ${posicion + 1}`);
        indicador.addEventListener('click', () => mostrar(posicion));
        indicadores.append(indicador);
    });

    const botonesIndicadores = [...indicadores.children];

    function mostrar(nuevoIndice) {
        indice = (nuevoIndice + diapositivas.length) % diapositivas.length;
        pista.style.transform = `translateX(-${indice * 100}%)`;
        botonesIndicadores.forEach((boton, posicion) => {
            const activo = posicion === indice;
            boton.classList.toggle('activo', activo);
            boton.setAttribute('aria-current', activo ? 'true' : 'false');
        });
    }

    function iniciarTemporizador() {
        clearInterval(temporizador);
        temporizador = setInterval(() => mostrar(indice + 1), 5000);
    }

    function cambiar(direccion) {
        mostrar(indice + direccion);
        iniciarTemporizador();
    }

    anterior.addEventListener('click', () => cambiar(-1));
    siguiente.addEventListener('click', () => cambiar(1));

    carrusel.addEventListener('mouseenter', () => clearInterval(temporizador));
    carrusel.addEventListener('mouseleave', iniciarTemporizador);
    mostrar(0);
    iniciarTemporizador();
}