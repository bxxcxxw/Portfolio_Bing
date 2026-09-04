const palabras = ["Welcome", "Bienvenido"];
const textosEntrada = ["click to enter...", "click para entrar..."];

const inicializarCursor = (area, cursor) => {
    const cursorArrow = cursor.querySelector('.spin-cursor-arrow');
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;
    let cursorAngle = 0;
    let targetAngle = 0;
    let cursorStretch = 1;
    let targetStretch = 1;
    let cursorActive = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const animarCursor = () => {
        cursorX += (targetX - cursorX) * 0.2;
        cursorY += (targetY - cursorY) * 0.2;
        const diferenciaAngular = Math.atan2(
            Math.sin(targetAngle - cursorAngle),
            Math.cos(targetAngle - cursorAngle)
        );

        cursorAngle += diferenciaAngular * 0.08;
        cursorStretch += (targetStretch - cursorStretch) * 0.15;

        cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`;
        const escalaPresion = cursor.classList.contains('is-pressed') ? 0.88 : 1;
        cursorArrow.style.transform = `rotate(${cursorAngle}rad) scaleX(${cursorStretch}) scale(${escalaPresion})`;

        if (cursorActive || Math.abs(targetStretch - 1) > 0.01) {
            requestAnimationFrame(animarCursor);
        }
    };

    area.addEventListener('pointerenter', (evento) => {
        if (evento.pointerType && evento.pointerType !== 'mouse') return;

        cursorActive = true;
        cursorX = targetX = evento.clientX;
        cursorY = targetY = evento.clientY;
        lastPointerX = evento.clientX;
        lastPointerY = evento.clientY;
        cursor.classList.add('is-visible');
        requestAnimationFrame(animarCursor);
    });

    area.addEventListener('pointermove', (evento) => {
        if (evento.pointerType && evento.pointerType !== 'mouse') return;

        if (!cursorActive) {
            cursorActive = true;
            cursorX = targetX = evento.clientX;
            cursorY = targetY = evento.clientY;
            lastPointerX = evento.clientX;
            lastPointerY = evento.clientY;
            cursor.classList.add('is-visible');
            requestAnimationFrame(animarCursor);
        }

        const deltaX = evento.clientX - lastPointerX;
        const deltaY = evento.clientY - lastPointerY;
        const velocidad = Math.min(Math.hypot(deltaX, deltaY), 24);
        const elementoBajoElCursor = document.elementFromPoint(evento.clientX, evento.clientY);
        const estaSobreElemento = elementoBajoElCursor &&
            elementoBajoElCursor !== area &&
            !cursor.contains(elementoBajoElCursor);

        targetX = evento.clientX;
        targetY = evento.clientY;
        targetAngle = Math.atan2(deltaY, deltaX) + Math.PI;
        targetStretch = 1 + velocidad / 45;
        lastPointerX = evento.clientX;
        lastPointerY = evento.clientY;
        cursor.classList.toggle('is-over-element', estaSobreElemento);
    });

    window.addEventListener('pointermove', (evento) => {
        if (evento.pointerType && evento.pointerType !== 'mouse') return;
        if (cursorActive) return;

        cursorActive = true;
        cursorX = targetX = evento.clientX;
        cursorY = targetY = evento.clientY;
        lastPointerX = evento.clientX;
        lastPointerY = evento.clientY;
        cursor.classList.add('is-visible');
        requestAnimationFrame(animarCursor);
    });

    area.addEventListener('pointerleave', () => {
        cursorActive = false;
        targetStretch = 1;
        cursor.classList.remove('is-visible', 'is-over-element');
    });

    area.addEventListener('pointerdown', () => {
        cursor.classList.add('is-pressed');
    });

    area.addEventListener('pointerup', () => {
        cursor.classList.remove('is-pressed');
    });

    cursor.classList.remove('is-visible');
};

const cursor = document.getElementById('spin-cursor');
const area = document.querySelector('.hero, .main-page');

if (cursor && area) {
    inicializarCursor(area, cursor);
}

const textoElemento = document.getElementById('dynamic-text');
const textoEntrada = document.getElementById('enter-text');
const icono = document.getElementById('main-icono');

if (textoElemento && textoEntrada && icono) {
    let indice = 1;

    icono.addEventListener('mouseenter', () => {
        const direccion = Math.random() < 0.5 ? -1 : 1;
        const grados = (Math.random() * 4 + 4) * direccion;

        icono.style.setProperty('--hover-rotation', `${grados}deg`);
        icono.classList.add('is-hovered');
    });

    icono.addEventListener('mouseleave', () => {
        icono.classList.remove('is-hovered');
    });

    icono.addEventListener('click', () => {
        icono.classList.remove('click-bounce');
        void icono.offsetWidth;
        icono.classList.add('click-bounce');
    });

    icono.addEventListener('animationend', () => {
        icono.classList.remove('click-bounce');
    });

    document.querySelector('.hero').addEventListener('click', (evento) => {
        if (!evento.target.closest('#main-icono')) {
            window.location.href = 'main.html';
        }
    });

    setInterval(() => {
        textoElemento.classList.add('fade-out');
        textoEntrada.classList.add('fade-out');

        setTimeout(() => {
            textoElemento.textContent = palabras[indice];
            textoEntrada.textContent = textosEntrada[indice];
            textoElemento.classList.toggle('pequeno', palabras[indice] === "Bienvenido");
            textoElemento.classList.remove('fade-out');
            textoEntrada.classList.remove('fade-out');
            indice = (indice + 1) % palabras.length;
        }, 1000);
    }, 5000);
}

const languageToggle = document.getElementById('language-toggle');
const labelsNavegacion = document.querySelectorAll('.top-icon-label');
const botonesNavegacion = document.querySelectorAll('.top-icon');
const opcionesIdioma = document.querySelectorAll('.language-option');
const aboutTabs = document.querySelectorAll('.about-tab');
const aboutWindowTitle = document.getElementById('about-window-title');
const contactsWindowTitle = document.getElementById('contacts-window-title');
const projectsWindowTitle = document.getElementById('projects-window-title');
const aboutHeadingTitle = document.querySelector('.about-heading-row h2');
const aboutTabsGroup = document.querySelector('.about-tabs');
const nombresIdiomas = {
    es: ['Sobre mí', 'Proyectos', 'Intereses', 'Contactos'],
    en: ['About me', 'Projects', 'Interests', 'Contacts']
};
const nombresTabsSobreMi = {
    es: ['Sobre mí', 'Qué hago', 'Educación', 'Experiencias', 'Idiomas'],
    en: ['About me', 'What I do', 'Education', 'Experiences', 'Languages']
};
const textosSobreMi = {
    es: {
        intro1: '¡Hola! Soy Bingcheng, me podeís llamar Bing. Soy estudiante de 4º de Desarrollo de Videojuegos en la UCM. Mi principal interés es la programación, especialmente el desarrollo de videojuegos y software, QA y automatización y la informática musical, aunque estoy dispuesto a desafiarme en diferentes áreas de la informática y aprender cosas nuevas.',
        intro2: 'A lo largo de la carrera he trabajado con distintos lenguajes de programación, incluyendo C++, C# y Python, desarrollo de videojuegos y diferentes proyectos en equipo. Me considero una persona responsable, curiosa y con iniciativa, y disfruto enfrentándome a problemas y buscando la forma de resolverlos.',
        intro3: 'Tengo muchísimas ganas de poner en práctica mis conocimientos, ganar experiencia y seguir aprendiendo junto a profesionales del sector.',
        computingTitle: 'Informática',
        computingText: 'C++, Python, Estructura de datos, algoritmos, Git, QA',
        gamesTitle: 'Videojuegos',
        gamesText: 'C#/C++, desarrollo en Unity y Godot, desarrollo de mecánicas, diseño de experiencias jugables',
        artTitle: 'Arte',
        artText: 'Compongo música de fondo y efectos de sonido (y, a veces, diseño UI) para nuestros proyectos',
        degreeDate: '2023 - en curso',
        degreeTitle: 'Grado de Desarrollo de Videojuegos',
        degreeSchool: 'Universidad Complutense de Madrid (UCM)',
        degreeGpaLabel: 'Nota media:',
        degreeGpa: '8,5',
        bachDate: '2021 - 2023',
        bachTitle: 'Bachillerato',
        bachSchool: 'Colegio Manuel Bartolomé Cossío',
        bachGpaLabel: 'Nota media:',
        bachGpa: '9,53',
        langEs: 'Español',
        langCn: 'Chino',
        langEn: 'Inglés',
        langKo: 'Coreano',
        langEsLevel: 'Nativo',
        langCnLevel: 'Nativo',
        langEnLevel: 'B2',
        langKoLevel: 'Básico',
        languagesTitle: 'Idiomas',
        languagesDescription: 'Mis habilidades lingüísticas',
        roleLine1: 'PROGRAMADOR',
        roleLine2: 'DESARROLLADOR DE VIDEOJUEGOS'
    },
    en: {
        intro1: 'Hi! I am Bingcheng, you can call me Bing. I am a 4th-year Game Development student at UCM. My main interest is programming, especially game and software development, QA and automation, and music technology, although I am open to challenging myself in different areas of computing and learning new things.',
        intro2: 'Throughout my degree I have worked with different programming languages, including C++, C# and Python, game development and several team projects. I consider myself a responsible, curious and proactive person, and I enjoy tackling problems and finding ways to solve them.',
        intro3: 'I am very eager to put my knowledge into practice, gain experience and keep learning alongside professionals in the industry.',
        computingTitle: 'Computer Science',
        computingText: 'C++, Python, Data structures, algorithms, Git, QA',
        gamesTitle: 'Video Games',
        gamesText: 'C#/C++, development in Unity and Godot, gameplay mechanics, playable experience design',
        artTitle: 'Art',
        artText: 'I compose background music and sound effects (and sometimes design UI) for our projects',
        degreeDate: '2023 - ongoing',
        degreeTitle: 'Game Development Degree',
        degreeSchool: 'Complutense University of Madrid (UCM)',
        degreeGpaLabel: 'Average grade:',
        degreeGpa: '8.5',
        bachDate: '2021 - 2023',
        bachTitle: 'High School',
        bachSchool: 'Colegio Manuel Bartolomé Cossío',
        bachGpaLabel: 'Average grade:',
        bachGpa: '9.53',
        langEs: 'Spanish',
        langCn: 'Chinese',
        langEn: 'English',
        langKo: 'Korean',
        langEsLevel: 'Native',
        langCnLevel: 'Native',
        langEnLevel: 'B2',
        langKoLevel: 'Basic',
        languagesTitle: 'Languages',
        languagesDescription: 'My language skills',
        roleLine1: 'PROGRAMMER',
        roleLine2: 'GAME DEVELOPER'
    }
};

const actualizarTextsAbout = (idioma) => {
    const nuevosNombresTabs = nombresTabsSobreMi[idioma];
    const textos = textosSobreMi[idioma];

    aboutTabs.forEach((tab, indice) => {
        const nombre = nuevosNombresTabs[indice] || tab.textContent;
        tab.textContent = nombre;
        tab.setAttribute('aria-label', nombre);
    });

    if (document.getElementById('about-intro-1')) {
        document.getElementById('about-intro-1').textContent = textos.intro1;
        document.getElementById('about-intro-2').textContent = textos.intro2;
        document.getElementById('about-intro-3').textContent = textos.intro3;
    }

    const workMap = [
        ['work-title-computing', textos.computingTitle],
        ['work-text-computing', textos.computingText],
        ['work-title-games', textos.gamesTitle],
        ['work-text-games', textos.gamesText],
        ['work-title-art', textos.artTitle],
        ['work-text-art', textos.artText]
    ];

    workMap.forEach(([id, value]) => {
        const node = document.getElementById(id);
        if (node) node.textContent = value;
    });

    const educationMap = [
        ['education-date-degree', textos.degreeDate],
        ['education-degree-title', textos.degreeTitle],
        ['education-degree-school', textos.degreeSchool],
        ['education-degree-gpa-label', textos.degreeGpaLabel],
        ['education-degree-gpa', textos.degreeGpa],
        ['education-date-bach', textos.bachDate],
        ['education-bach-title', textos.bachTitle],
        ['education-bach-school', textos.bachSchool],
        ['education-bach-gpa-label', textos.bachGpaLabel],
        ['education-bach-gpa', textos.bachGpa]
    ];

    educationMap.forEach(([id, value]) => {
        const node = document.getElementById(id);
        if (node) node.textContent = value;
    });

    const languageMap = [
        ['language-es-name', textos.langEs],
        ['language-cn-name', textos.langCn],
        ['language-en-name', textos.langEn],
        ['language-ko-name', textos.langKo],
        ['language-es-level', textos.langEsLevel],
        ['language-cn-level', textos.langCnLevel],
        ['language-en-level', textos.langEnLevel],
        ['language-ko-level', textos.langKoLevel],
        ['languages-title', textos.languagesTitle],
        ['languages-description', textos.languagesDescription]
    ];

    languageMap.forEach(([id, value]) => {
        const node = document.getElementById(id);
        if (node) node.textContent = value;
    });

    const profileKicker = document.getElementById('profile-kicker');
    if (profileKicker) {
        profileKicker.innerHTML = `${textos.roleLine1}<br>${textos.roleLine2}`;
    }

    if (aboutWindowTitle) {
        aboutWindowTitle.textContent = idioma === 'es' ? 'Sobre mí' : 'About me';
    }

    if (contactsWindowTitle) {
        contactsWindowTitle.textContent = idioma === 'es' ? 'Contactos' : 'Contacts';
    }

    if (projectsWindowTitle) {
        projectsWindowTitle.textContent = idioma === 'es' ? 'Proyectos' : 'Projects';
    }

    if (aboutHeadingTitle) {
        aboutHeadingTitle.textContent = idioma === 'es' ? 'Sobre mí' : 'About me';
    }

    if (aboutTabsGroup) {
        aboutTabsGroup.setAttribute(
            'aria-label',
            idioma === 'es' ? 'Información sobre Bingcheng' : 'Information about Bingcheng'
        );
    }
};

if (languageToggle && labelsNavegacion.length === nombresIdiomas.es.length) {
    let idiomaActual = 'es';

    languageToggle.addEventListener('click', () => {
        idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
        const nuevosNombres = nombresIdiomas[idiomaActual];

        labelsNavegacion.forEach((label, indice) => {
            label.textContent = nuevosNombres[indice];
        });

        botonesNavegacion.forEach((boton, indice) => {
            boton.setAttribute('aria-label', nuevosNombres[indice]);
        });

        actualizarTextsAbout(idiomaActual);
        actualizarTextosProyectos(idiomaActual);

        document.documentElement.lang = idiomaActual;
        languageToggle.classList.toggle('is-english', idiomaActual === 'en');
        opcionesIdioma.forEach((opcion) => {
            const esIdiomaActivo = opcion.classList.contains(`language-${idiomaActual}`);
            opcion.classList.toggle('is-active', esIdiomaActivo);
            opcion.classList.toggle('is-inactive', !esIdiomaActivo);
            opcion.style.color = esIdiomaActivo ? '#7de3ff' : 'rgba(255, 255, 255, 0.55)';
        });
        languageToggle.setAttribute(
            'aria-label',
            idiomaActual === 'es' ? 'Cambiar a inglés' : 'Cambiar a español'
        );
    });
}

const inicializarVentana = (ventana, icono, titlebar) => {
    if (!ventana || !icono || !titlebar) return;

    let dragState = null;

    const abrirVentana = () => {
        ventana.hidden = false;
        ventana.classList.remove('is-minimized', 'is-dragging');
        ventana.focus({ preventScroll: true });
    };

    icono.addEventListener('dblclick', abrirVentana);

    const cerrarVentana = () => {
        ventana.hidden = true;
        ventana.classList.remove('is-maximized', 'is-minimized', 'is-dragging');
        ventana.style.left = '';
        ventana.style.top = '';
        ventana.style.right = '';
        ventana.dispatchEvent(new CustomEvent('ventana-cerrada'));
    };

    ventana.addEventListener('click', (evento) => {
        const control = evento.target.closest('[data-window-action]');
        if (!control) return;

        const action = control.dataset.windowAction;
        if (action === 'close') cerrarVentana();
        if (action === 'minimize') ventana.classList.toggle('is-minimized');
        if (action === 'maximize') {
            ventana.classList.toggle('is-maximized');
            if (!ventana.classList.contains('is-maximized')) {
                ventana.style.left = '';
                ventana.style.top = '';
            }
        }
    });

    ventana.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') cerrarVentana();
    });

    titlebar.addEventListener('pointerdown', (evento) => {
        if (evento.target.closest('button') || ventana.classList.contains('is-maximized')) return;
        const rect = ventana.getBoundingClientRect();
        dragState = { offsetX: evento.clientX - rect.left, offsetY: evento.clientY - rect.top };
        ventana.classList.add('is-dragging');
        ventana.setPointerCapture(evento.pointerId);
    });

    document.addEventListener('pointermove', (evento) => {
        if (!dragState) return;
        const margin = 18;
        const width = ventana.offsetWidth;
        const height = ventana.offsetHeight;
        const left = Math.min(Math.max(margin - width + 90, evento.clientX - dragState.offsetX), window.innerWidth - margin - 90);
        const top = Math.min(Math.max(margin, evento.clientY - dragState.offsetY), window.innerHeight - margin - Math.min(54, height));
        ventana.style.left = `${left}px`;
        ventana.style.top = `${top}px`;
        ventana.style.right = '';
        ventana.style.transform = 'none';
    });

    document.addEventListener('pointerup', () => { dragState = null; });
    document.addEventListener('pointercancel', () => { dragState = null; });
};

const inicializarCuadriculaProyectos = (ventana) => {
    const grid = ventana.querySelector('.projects-grid');
    const tarjetas = grid ? Array.from(grid.querySelectorAll('.projects-card')) : [];
    const botonesFiltro = ventana.querySelectorAll('.projects-filter');
    const indicadorPagina = ventana.querySelector('.projects-page-indicator');
    const botonAnterior = ventana.querySelector('.projects-page-prev');
    const botonSiguiente = ventana.querySelector('.projects-page-next');
    if (!grid || tarjetas.length === 0) return;

    const PANELES_POR_PAGINA = 16;
    let paginas = [tarjetas.slice()];
    let paginaActual = 0;
    let temporizadorSalida = null;

    const vecinasDe = (indice) => {
        const vecinas = [];
        if (indice % 4 !== 0) vecinas.push(indice - 1);
        if (indice % 4 !== 3) vecinas.push(indice + 1);
        vecinas.push(indice - 4);
        vecinas.push(indice + 4);
        return vecinas.filter((n) => n >= 0 && n < paginas[paginaActual].length);
    };

    const aplicarEstado = (indice) => {
        const pagina = paginas[paginaActual];
        const vecinas = indice === null ? [] : vecinasDe(indice);
        pagina.forEach((tarjeta, i) => {
            tarjeta.classList.toggle('is-big', i === indice);
            tarjeta.classList.toggle('is-small', indice !== null && vecinas.includes(i));
            tarjeta.style.zIndex = i === indice ? pagina.length + 1 : i + 1;
        });
    };

    const renderPagina = () => {
        grid.querySelectorAll('.projects-card-placeholder').forEach((panel) => panel.remove());

        const pagina = paginas[paginaActual];
        tarjetas.forEach((tarjeta) => {
            tarjeta.classList.toggle('is-oculta', !pagina.includes(tarjeta));
        });

        // Rellena la página con paneles grises hasta completar los 16.
        const huecos = PANELES_POR_PAGINA - pagina.length;
        for (let i = 0; i < huecos; i++) {
            const panel = document.createElement('div');
            panel.className = 'projects-card projects-card-placeholder';
            panel.setAttribute('aria-hidden', 'true');
            grid.appendChild(panel);
        }

        if (indicadorPagina) {
            indicadorPagina.textContent = `${paginaActual + 1} / ${paginas.length}`;
        }
        if (botonAnterior) botonAnterior.disabled = paginaActual === 0;
        if (botonSiguiente) botonSiguiente.disabled = paginaActual >= paginas.length - 1;

        aplicarEstado(null);
    };

    const cambiarFiltro = (filtro) => {
        // Cada tarjeta puede tener varios tipos separados por espacios.
        const tarjetasFiltradas = tarjetas.filter((tarjeta) =>
            filtro === 'todas' || tarjeta.dataset.categoria.split(' ').includes(filtro)
        );

        paginas = [];
        for (let i = 0; i < tarjetasFiltradas.length; i += PANELES_POR_PAGINA) {
            paginas.push(tarjetasFiltradas.slice(i, i + PANELES_POR_PAGINA));
        }
        if (paginas.length === 0) paginas.push([]);

        paginaActual = 0;
        renderPagina();
    };

    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener('pointerenter', () => {
            if (temporizadorSalida) {
                clearTimeout(temporizadorSalida);
                temporizadorSalida = null;
            }
            aplicarEstado(paginas[paginaActual].indexOf(tarjeta));
        });

        tarjeta.addEventListener('pointerleave', () => {
            if (temporizadorSalida) clearTimeout(temporizadorSalida);
            temporizadorSalida = setTimeout(() => {
                aplicarEstado(null);
            }, 200);
        });
    });

    botonesFiltro.forEach((boton) => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach((otro) => {
                const esActivo = otro === boton;
                otro.classList.toggle('is-active', esActivo);
                otro.setAttribute('aria-pressed', esActivo ? 'true' : 'false');
            });
            cambiarFiltro(boton.dataset.filter);
        });
    });

    if (botonAnterior) {
        botonAnterior.addEventListener('click', () => {
            if (paginaActual > 0) {
                paginaActual--;
                renderPagina();
            }
        });
    }
    if (botonSiguiente) {
        botonSiguiente.addEventListener('click', () => {
            if (paginaActual < paginas.length - 1) {
                paginaActual++;
                renderPagina();
            }
        });
    }

    renderPagina();
};

const categoriasProyectos = {
    es: {
        todas: 'Todas',
        juegos: 'Juegos',
        programacion: 'Programación',
        arte: 'Arte',
        sonido: 'Sonido'
    },
    en: {
        todas: 'All',
        juegos: 'Games',
        programacion: 'Programming',
        arte: 'Art',
        sonido: 'Sound'
    }
};

// Lista de proyectos que se muestran en la ventana "Proyectos".
// Cada proyecto tiene nombre, tipos (puede ser varios), descripción,
// contribución, imagen (null si aún no está elegida), URL y fecha.
const parsearFechaProyecto = (fecha) => {
    if (!fecha || fecha.trim() === '-' || fecha.trim() === '') return new Date(0);

    const [inicio, fin] = fecha.split('-').map((parte) => parte.trim());
    const fechaReferencia = fin || inicio;
    const [mes, anio] = fechaReferencia.split('/');

    if (!mes || !anio || Number.isNaN(Number(mes)) || Number.isNaN(Number(anio))) {
        return new Date(0);
    }

    const anioCompleto = Number(anio) < 100 ? 2000 + Number(anio) : Number(anio);
    return new Date(anioCompleto, Number(mes) - 1, 1);
};

const proyectos = [
    {
        nombre: { es: 'Danse Macabre', en: 'Danse Macabre' },
        tipos: ['juegos'],
        fecha: '01/24-06/24',
        descripcion: {
            es: 'Proyecto universitario realizado entre enero-junio del 2024. Juego de ritmo 2D hecho con Unity.',
            en: 'University project developed between January and June 2024. 2D rhythm game made with Unity.'
        },
        contribucion: {
            es: 'Programación de las mecánicas principales, el diseño de niveles y la creación e integración de la banda sonora y los efectos de sonido.',
            en: 'Programming of the main mechanics, level design, and creation and integration of the soundtrack and sound effects.'
        },
        imagen: 'assets/imagenes/portadas/danse_macabre.jpg',
        url: 'https://proyectos1-fdi-ucm.github.io/c2324-Grupo01/'
    },
    {
        nombre: { es: 'Madness', en: 'Madness' },
        tipos: ['juegos'],
        fecha: '09/24-12/24',
        descripcion: {
            es: 'Proyecto universitario. Juego en web hecho con Phaser (JavaScript), desarrollado entre septiembre y diciembre de 2024.',
            en: 'University project. Web game made with Phaser (JavaScript), developed between September and December 2024.'
        },
        contribucion: {
            es: 'Programación de mecánicas, diseño e implementación del sistema de evolución de los personajes y del marco lógico de combate, diseño de personajes y mapas, y creación e integración de la banda sonora.',
            en: 'Programming of mechanics, design and implementation of the character evolution system and combat logic framework, character and map design, and creation and integration of the soundtrack.'
        },
        imagen: 'assets/imagenes/portadas/madness.png',
        url: 'https://bingoo30.github.io/PVLI-C2024-2025-Grupo7/'
    },
    {
        nombre: { es: 'Crazy Paw Pals', en: 'Crazy Paw Pals' },
        tipos: ['juegos'],
        fecha: '01/25-06/25',
        descripcion: {
            es: 'Proyecto universitario. Juego de cartas 2D tipo roguelike hecho con SDL (C++), desarrollado entre enero y junio de 2025.',
            en: 'University project. 2D card game in roguelike style made with SDL (C++), developed between January and June 2025.'
        },
        contribucion: {
            es: 'Programación de mecánicas, desarrollo del sistema de cartas, lógica de interacción de los menús y creación de los efectos de sonido y la banda sonora.',
            en: 'Programming of mechanics, development of the card system, menu interaction logic, and creation of sound effects and music.'
        },
        imagen: 'assets/imagenes/portadas/cpp.png',
        url: 'https://ucm-fdi-disia.github.io/CrazyPawPals/'
    },
    {
        nombre: { es: 'HUGO', en: 'HUGO' },
        tipos: ['juegos', 'programacion'],
        fecha: '01/26-06/26',
        descripcion: {
            es: 'Proyecto universitario. Motor de videojuegos 3D con arquitectura modular, orientado a la reutilización, el rendimiento y la integración con sistemas de audio e interfaz.',
            en: 'University project. 3D game engine with modular architecture, focused on reusability, performance, and integration with audio and interface systems.'
        },
        contribucion: {
            es: [
                'Integración en la arquitectura ECS del equipo: comprensión profunda del diseño central y adaptación de los subsistemas al enfoque basado en datos.',
                'Sistema de audio: implementación de audio espacial 3D con MINIAUDIO, localización de fuentes sonoras, atenuación por distancia y gestión de recursos.',
                'Sistema de UI: desarrollo de un framework de UI basado en OGRE Overlay, con jerarquías de componentes, eventos y animaciones.',
                'Diseño modular y reutilizable: creación de sistemas independientes y extensibles para facilitar su integración en el motor.',
                'Optimización de la arquitectura: mejora de la mantenibilidad, la escalabilidad y la depuración del código mediante programación orientada a datos.'
            ],
            en: [
                'Integration into the team ECS architecture: deep understanding of the central design and adaptation of subsystems to a data-driven approach.',
                'Audio system: implementation of 3D spatial audio with MINIAUDIO, including sound-source localization, distance attenuation, and resource management.',
                'UI system: development of a UI framework based on OGRE Overlay, with component hierarchies, events, and animations.',
                'Modular and reusable design: creation of independent and extensible systems for easier engine integration.',
                'Architecture optimization: improved maintainability, scalability, and debugging through data-oriented programming.'
            ]
        },
        imagen: 'assets/imagenes/portadas/hugo.png',
        url: 'https://drive.google.com/file/d/11-jLl4xSZMU37_uQ6oFMXrbz2DY1cgC4/view?usp=sharing'
    },
    {
        nombre: { es: 'Zapascape', en: 'Zapascape' },
        tipos: ['juegos'],
        fecha: '04/26-06/26',
        descripcion: {
            es: 'Proyecto universitario. Juego 3D de terror y puzzle en primera persona hecho con nuestro motor (HUGO).',
            en: 'University project. 3D horror and puzzle game in first person made with our engine (HUGO).'
        },
        contribucion: {
            es: 'Programación de mecánicas, máquina de estados del enemigo, diseño de menús y elementos de UI, lógica de interacción de los menús y creación de los efectos de sonido y la banda sonora.',
            en: 'Programming of mechanics, enemy state machine, menu and UI element design, menu interaction logic, and creation of sound effects and music.'
        },
        imagen: 'assets/imagenes/portadas/zapascape.png',
        url: 'https://drive.google.com/file/d/1OPJq5PeUMsvve9B51etYILF4QXZk90Et/view?usp=sharing'
    },
    {
        nombre: { es: 'Batalla de IAs', en: 'Battle of AIs' },
        tipos: ['juegos', 'programacion'],
        fecha: '05/26-06/26',
        descripcion: {
            es: 'Proyecto universitario. Juego casual 3D con multijugador local competitivo. Incluye diferentes modalidades de juego: 1 vs 1 entre jugadores, 1 vs IA e IA vs IA.',
            en: 'University project. Casual 3D competitive local multiplayer game. Includes different game modes: 1 vs 1 between players, 1 vs AI and AI vs AI.'
        },
        contribucion: {
            es: 'Diseño de menús y elementos de UI, implementación de la lógica de interacción de los menús, programación de mecánicas básicas y diseño e implementación de la IA del personaje morado mediante GOAP.',
            en: 'Menu and UI element design, implementation of menu interaction logic, basic mechanics programming, and design and implementation of the purple character AI through GOAP.'
        },
        imagen: 'assets/imagenes/portadas/iaia.png',
        url: 'https://youtu.be/MXT7nz615VI?feature=shared'
    },
    {
        nombre: { es: 'Plaga de Ratas', en: 'Rat Plague' },
        tipos: ['juegos', 'programacion'],
        fecha: '02/26-03/26',
        descripcion: {
            es: 'Proyecto universitario. Un prototipo básico para explorar el movimiento de agentes racionales con “Steering Behaviours” en un entorno 3D.',
            en: 'University project. A basic prototype to explore the movement of rational agents with “Steering Behaviours” in a 3D environment.'
        },
        contribucion: {
            es: 'Steering behaviors (llegada, persecución, encaramiento, huida, merodeo...), máquinas de estados y control de bandadas.',
            en: 'Steering behaviors (arrival, pursuit, facing, fleeing, wandering...), state machines, and flock control.'
        },
        imagen: 'assets/imagenes/portadas/ia1.png',
        url: 'https://www.youtube.com/watch?v=aDzJ2DPpiCw'
    },
    {
        nombre: { es: 'El secreto del Laberinto', en: 'The Secret of the Labyrinth' },
        tipos: ['juegos', 'programacion'],
        fecha: '03/26',
        descripcion: {
            es: 'Proyecto universitario. Prototipo 3D de un entorno laberíntico utilizando A*, suavizado de caminos y comportamientos de dirección para la navegación de agentes.',
            en: 'University project. 3D prototype of a labyrinth environment using A*, path smoothing, and directional behaviors for agent navigation.'
        },
        contribucion: {
            es: 'IA de agentes con A*, pathfinding, heurísticas, steering behaviors, suavizado de caminos, visión y persecución, control del jugador.',
            en: 'Agent AI with A*, pathfinding, heuristics, steering behaviors, path smoothing, vision and pursuit, player control.'
        },
        imagen: 'assets/imagenes/portadas/ia2.png',
        url: 'https://youtu.be/n7ElxGUhQ7Y?si=27UPoAJEe9r1TJ_R'
    },
    {
        nombre: { es: 'Disturbios Orbitales', en: 'Orbital Disturbances' },
        tipos: ['juegos', 'programacion'],
        fecha: '04/26-05/26',
        descripcion: {
            es: 'Proyecto universitario. Prototipo básico para experimentar toma de decisiones.',
            en: 'University project. Basic prototype to experiment with decision-making.'
        },
        contribucion: {
            es: 'Diseño e implementación de máquina de estados jerárquica, búsquedas de caminos mediante mallas de navegación y comportamientos de dirección.',
            en: 'Design and implementation of hierarchical state machines, pathfinding through navigation meshes, and directional behaviors.'
        },
        imagen: 'assets/imagenes/portadas/ia3.png',
        url: 'https://youtu.be/gRNmIhG2XhA?si=qGEx6x6R83c8-xHX'
    },
    {
        nombre: { es: 'Recopilatorio de las canciones compuestas', en: 'Compilation of composed songs' },
        tipos: ['sonido'],
        fecha: '-',
        descripcion: {
            es: 'Lista de todos los BGMs que he compuesto para los diversos proyectos de la universidad.',
            en: 'List of all the BGMs I have composed for the various university projects.'
        },
        contribucion: {
            es: 'Composición y selección de música para distintos proyectos, manteniendo una identidad sonora coherente en cada entrega.',
            en: 'Composition and selection of music for different projects, maintaining a coherent sound identity in each release.'
        },
        imagen: 'assets/imagenes/portadas/canciones.png',
        url: 'https://drive.google.com/drive/folders/1SEH3B9xES9vt_-bRoIDqr9q-ceApchFc?usp=sharing'
    },
    {
        nombre: { es: 'Música dinámica con FMOD', en: 'Dynamic music with FMOD' },
        tipos: ['sonido'],
        fecha: '05/26-06/26',
        descripcion: {
            es: 'Música dinámica compuesta con técnica de composición horizontal y vertical en FMOD.',
            en: 'Dynamic music composed using horizontal and vertical composition techniques in FMOD.'
        },
        contribucion: {
            es: 'Diseño y creación de capas musicales adaptativas, transiciones y temática sonora para una experiencia más reactiva.',
            en: 'Design and creation of adaptive musical layers, transitions, and sonic themes for a more reactive experience.'
        },
        imagen: 'assets/imagenes/portadas/fmod.png',
        url: 'https://youtu.be/6KQ6UUyJkFM'
    },
    {
        nombre: { es: 'Proyecto de Simulación Física', en: 'Physics Simulation Project' },
        tipos: ['programacion'],
        fecha: '12/25',
        descripcion: {
            es: 'Desarrollo de un proyecto de simulación física en C++ utilizando la librería PhysX. Implementación de diferentes sistemas y conceptos de física, incluyendo partículas físicas, proyectiles, muelles, fuerzas, viento, sistemas de partículas, fluidos y cuerpos rígidos.',
            en: 'Development of a physics simulation project in C++ using the PhysX library. Implementation of different physics systems and concepts, including physical particles, projectiles, springs, forces, wind, particle systems, fluids, and rigid bodies.'
        },
        contribucion: {
            es: 'Programación e integración de los sistemas de simulación física descritos en el proyecto mediante C++ y PhysX.',
            en: 'Programming and integration of the physics simulation systems described in the project using C++ and PhysX.'
        },
        imagen: 'assets/imagenes/portadas/fisica.png',
        url: 'https://youtu.be/wS_gdlRHpZ4'
    },
    {
        nombre: { es: 'Animación 3D basada en audio', en: 'Audio-Based 3D Animation' },
        tipos: ['arte'],
        fecha: '12/25-01/26',
        descripcion: {
            es: 'Creación y animación de una escena en Blender a partir de un fragmento de audio de la serie Family Guy.',
            en: 'Creation and animation of a scene in Blender based on an audio clip from the series Family Guy.'
        },
        contribucion: {
            es: 'Modelado, montaje y animación de la escena 3D en Blender, sincronizando la acción con el fragmento de audio.',
            en: 'Modeling, staging, and animation of the 3D scene in Blender, synchronizing the action with the audio clip.'
        },
        imagen: 'assets/imagenes/portadas/animacion.png',
        url: 'https://youtu.be/rAOrPc7yZSs'
    }
].sort((a, b) => parsearFechaProyecto(b.fecha) - parsearFechaProyecto(a.fecha));

const textosProyectos = {
    es: { contribucion: 'Contribución', verProyecto: 'Ver proyecto' },
    en: { contribucion: 'Contribution', verProyecto: 'View project' }
};

// Pares { cardEl, proyecto } para actualizar los aria-label con el idioma.
let tarjetasProyectos = [];

const crearElemento = (etiqueta, clase) => {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    return elemento;
};

// Ventana de detalle que se abre al clicar una tarjeta de proyecto.
const detalleVentana = document.getElementById('projects-detail-window');
const detalleTitulo = document.getElementById('projects-detail-title');
const detalleImagen = document.getElementById('projects-detail-image');
const detalleCruz = document.getElementById('projects-detail-cross');
const detalleTags = document.getElementById('projects-detail-tags');
const detalleDescripcion = document.getElementById('projects-detail-desc');
const detalleContribucion = document.getElementById('projects-detail-contrib');
const detalleEnlace = document.getElementById('projects-detail-link');
const detalleCuerpo = document.querySelector('.projects-detail-body');

let proyectoAbierto = null;
let temporizadorCierre = null;

const generarTarjetasProyectos = (grid) => {
    tarjetasProyectos = proyectos.map((proyecto) => {
        const tarjeta = crearElemento('button', 'projects-card');
        tarjeta.type = 'button';
        tarjeta.dataset.categoria = proyecto.tipos.join(' ');

        if (proyecto.imagen) {
            const imagen = crearElemento('img', 'projects-card-image');
            imagen.src = proyecto.imagen;
            imagen.alt = '';
            imagen.loading = 'lazy';
            imagen.draggable = false;
            tarjeta.appendChild(imagen);
        } else {
            // Imagen todavía no elegida: cruz provisional.
            const cruz = crearElemento('span', 'projects-card-cross');
            cruz.setAttribute('aria-hidden', 'true');
            cruz.textContent = '✕';
            tarjeta.appendChild(cruz);
        }

        // Clic en la tarjeta: abre la ventana de detalle (o la cierra si ya estaba abierta).
        tarjeta.addEventListener('click', () => {
            if (!detalleVentana) return;
            if (proyectoAbierto === proyecto && !detalleVentana.hidden) {
                cerrarDetalleProyecto();
            } else {
                abrirDetalleProyecto(proyecto);
            }
        });

        grid.appendChild(tarjeta);

        return { cardEl: tarjeta, proyecto };
    });
};

const renderDetalleProyecto = () => {
    if (!proyectoAbierto) return;
    const idioma = document.documentElement.lang === 'en' ? 'en' : 'es';
    const etiquetas = textosProyectos[idioma];
    const proyecto = proyectoAbierto;

    detalleTitulo.textContent = proyecto.nombre[idioma];

    if (proyecto.imagen) {
        detalleImagen.src = proyecto.imagen;
        detalleImagen.hidden = false;
        detalleCruz.hidden = true;
    } else {
        detalleImagen.hidden = true;
        detalleCruz.hidden = false;
    }

    detalleTags.textContent = '';
    proyecto.tipos.forEach((tipo) => {
        const etiqueta = crearElemento('span', 'projects-detail-tag');
        etiqueta.textContent = (categoriasProyectos[idioma] || {})[tipo] || tipo;
        detalleTags.appendChild(etiqueta);
    });

    detalleDescripcion.textContent = proyecto.descripcion[idioma];

    const contribucion = Array.isArray(proyecto.contribucion[idioma])
        ? proyecto.contribucion[idioma]
        : [proyecto.contribucion[idioma]];

    detalleContribucion.innerHTML = '';
    const etiqueta = document.createElement('div');
    etiqueta.className = 'projects-detail-contrib-label';
    etiqueta.textContent = `${etiquetas.contribucion}:`;
    detalleContribucion.appendChild(etiqueta);

    contribucion.forEach((parrafo) => {
        const bloque = document.createElement('p');
        bloque.textContent = parrafo;
        detalleContribucion.appendChild(bloque);
    });

    detalleEnlace.href = proyecto.url;
    detalleEnlace.textContent = etiquetas.verProyecto;
};

const cerrarDetalleProyecto = () => {
    if (temporizadorCierre) {
        clearTimeout(temporizadorCierre);
        temporizadorCierre = null;
    }
    detalleVentana.hidden = true;
    proyectoAbierto = null;
};

const abrirDetalleProyecto = (proyecto) => {
    if (temporizadorCierre) {
        clearTimeout(temporizadorCierre);
        temporizadorCierre = null;
    }
    proyectoAbierto = proyecto;
    renderDetalleProyecto();
    detalleCuerpo.scrollTop = 0;
    detalleVentana.hidden = false;
    detalleVentana.focus({ preventScroll: true });
};

if (detalleVentana) {
    // Cerrar con el botón × o con Escape.
    detalleVentana.addEventListener('click', (evento) => {
        if (evento.target.closest('[data-detail-action="close"]')) cerrarDetalleProyecto();
    });
    detalleVentana.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') cerrarDetalleProyecto();
    });

    // Al salir del área de la ventana se cierra (con un pequeño margen
    // por si el puntero sale y vuelve a entrar sin querer).
    detalleVentana.addEventListener('pointerenter', () => {
        if (temporizadorCierre) {
            clearTimeout(temporizadorCierre);
            temporizadorCierre = null;
        }
    });
    detalleVentana.addEventListener('pointerleave', () => {
        temporizadorCierre = setTimeout(cerrarDetalleProyecto, 200);
    });

    // Clic fuera de la ventana de detalle y de las tarjetas: la cierra.
    document.addEventListener('click', (evento) => {
        if (detalleVentana.hidden) return;
        if (evento.target.closest('#projects-detail-window') || evento.target.closest('.projects-card')) return;
        cerrarDetalleProyecto();
    });
}

const actualizarTextosProyectos = (idioma) => {
    const nombres = categoriasProyectos[idioma];
    if (!nombres) return;

    document.querySelectorAll('.projects-filter').forEach((boton) => {
        const filtro = boton.dataset.filter;
        if (nombres[filtro]) boton.textContent = nombres[filtro];
    });

    const barraFiltro = document.querySelector('.projects-filter-bar');
    if (barraFiltro) {
        barraFiltro.setAttribute(
            'aria-label',
            idioma === 'es' ? 'Filtrar proyectos por categoría' : 'Filter projects by category'
        );
    }

    const paginacion = document.querySelector('.projects-pagination');
    if (paginacion) {
        paginacion.setAttribute(
            'aria-label',
            idioma === 'es' ? 'Paginación de proyectos' : 'Project pagination'
        );
    }

    const botonPaginaAnterior = document.querySelector('.projects-page-prev');
    const botonPaginaSiguiente = document.querySelector('.projects-page-next');
    if (botonPaginaAnterior) {
        botonPaginaAnterior.setAttribute('aria-label', idioma === 'es' ? 'Página anterior' : 'Previous page');
    }
    if (botonPaginaSiguiente) {
        botonPaginaSiguiente.setAttribute('aria-label', idioma === 'es' ? 'Página siguiente' : 'Next page');
    }

    // Aria-label de cada tarjeta de proyecto.
    tarjetasProyectos.forEach(({ cardEl, proyecto }) => {
        cardEl.setAttribute('aria-label', proyecto.nombre[idioma]);
    });

    // Si la ventana de detalle está abierta, refresca sus textos.
    if (proyectoAbierto && detalleVentana && !detalleVentana.hidden) {
        renderDetalleProyecto();
    }
};

const aboutWindow = document.getElementById('about-window');
const aboutIcon = document.querySelector('.top-icon-item:first-child .top-icon');
const aboutTitlebar = document.getElementById('about-titlebar');

if (aboutWindow && aboutTitlebar) {
    aboutTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const selectedTab = tab.dataset.tab;
            aboutTabs.forEach((tabButton) => {
                const isSelected = tabButton === tab;
                tabButton.classList.toggle('is-active', isSelected);
                tabButton.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            });
            document.querySelectorAll('.about-tab-panel').forEach((panel) => {
                const isSelected = panel.id === `tab-${selectedTab}`;
                panel.classList.toggle('is-active', isSelected);
                panel.hidden = !isSelected;
            });
        });
    });
}

inicializarVentana(aboutWindow, aboutIcon, aboutTitlebar);

const projectsWindow = document.getElementById('projects-window');
const projectsIcon = document.querySelector('.top-icon-item:nth-child(2) .top-icon');
const projectsTitlebar = document.getElementById('projects-titlebar');

if (projectsWindow && projectsIcon && projectsTitlebar) {
    // Reutiliza la lógica de la ventana "Sobre mí": doble clic para abrir,
    // arrastre desde la barra de título y controles de ventana.
    inicializarVentana(projectsWindow, projectsIcon, projectsTitlebar);

    // Al cerrar la ventana de proyectos también se cierra el detalle abierto.
    projectsWindow.addEventListener('ventana-cerrada', () => cerrarDetalleProyecto());

    // Genera las tarjetas desde la lista de proyectos antes de inicializar
    // la cuadrícula (filtros, paginación y efecto hover).
    const gridProyectos = projectsWindow.querySelector('.projects-grid');
    if (gridProyectos) {
        generarTarjetasProyectos(gridProyectos);
        actualizarTextosProyectos(document.documentElement.lang === 'en' ? 'en' : 'es');
    }

    inicializarCuadriculaProyectos(projectsWindow);
}

const contactsWindow = document.getElementById('contacts-window');
const contactsIcon = document.querySelector('.top-icon[aria-label="Contactos"]');
const contactsTitlebar = document.getElementById('contacts-titlebar');

if (contactsWindow && contactsIcon && contactsTitlebar) {
    // Reutiliza la lógica de la ventana "Sobre mí": doble clic para abrir,
    // arrastre desde la barra de título y controles de ventana.
    inicializarVentana(contactsWindow, contactsIcon, contactsTitlebar);

    // Copia el correo y el teléfono al portapapeles al clicar sus iconos.
    const copiarAlPortapapeles = (texto) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(texto);
            return;
        }
        // Alternativa para navegadores sin la API del portapapeles.
        const areaTemporal = document.createElement('textarea');
        areaTemporal.value = texto;
        areaTemporal.style.position = 'fixed';
        areaTemporal.style.opacity = '0';
        document.body.appendChild(areaTemporal);
        areaTemporal.select();
        document.execCommand('copy');
        areaTemporal.remove();
    };

    // Aviso de que se ha copiado, dentro de la ventana de contactos.
    const avisoCopiado = document.getElementById('copy-toast');
    let temporizadorAviso;

    const mostrarAvisoCopiado = (texto) => {
        if (!avisoCopiado) return;
        const esCorreo = texto.includes('@');
        const enIngles = document.documentElement.lang === 'en';
        avisoCopiado.textContent = enIngles
            ? (esCorreo ? 'Email copied!' : 'Phone number copied!')
            : (esCorreo ? '¡Correo copiado!' : '¡Teléfono copiado!');
        avisoCopiado.classList.add('is-visible');
        clearTimeout(temporizadorAviso);
        temporizadorAviso = setTimeout(() => avisoCopiado.classList.remove('is-visible'), 1600);
    };

    contactsWindow.addEventListener('click', (evento) => {
        const botonCopiar = evento.target.closest('[data-copy]');
        if (!botonCopiar) return;
        copiarAlPortapapeles(botonCopiar.dataset.copy);
        mostrarAvisoCopiado(botonCopiar.dataset.copy);
    });
}

// /* =========================================================
//    REPRODUCTOR DE MÚSICA - MAIN
//    ========================================================= */

// const canciones = [
//     {
//         titulo: "Canción 1",
//         archivo: "musica/cancion1.mp3"
//     },
//     {
//         titulo: "Canción 2",
//         archivo: "musica/cancion2.mp3"
//     },
//     {
//         titulo: "Canción 3",
//         archivo: "musica/cancion3.mp3"
//     }
// ];

// const musicPlay = document.getElementById('music-play');
// const musicTitle = document.getElementById('music-title');
// const musicPrev = document.querySelector('.music-prev');
// const musicNext = document.querySelector('.music-next');

// if (musicPlay && musicTitle) {

//     let indiceCancion = 0;

//     const audio = new Audio();

//     audio.preload = 'auto';


//     /* -----------------------------------------
//        CARGAR CANCIÓN
//        ----------------------------------------- */

//     const cargarCancion = (indice) => {

//         if (!canciones[indice]) return;

//         audio.src = canciones[indice].archivo;

//         musicTitle.textContent = canciones[indice].titulo;

//         musicPlay.innerHTML = '<span>▶</span>';
//     };


//     /* -----------------------------------------
//        REPRODUCIR / PAUSAR
//        ----------------------------------------- */

//     musicPlay.addEventListener('click', () => {

//         if (audio.paused) {

//             audio.play()
//                 .then(() => {
//                     musicPlay.innerHTML = '<span>Ⅱ</span>';
//                 })
//                 .catch(() => {
//                     musicPlay.innerHTML = '<span>▶</span>';
//                 });

//         } else {

//             audio.pause();

//             musicPlay.innerHTML = '<span>▶</span>';
//         }

//     });


//     /* -----------------------------------------
//        CANCIÓN ANTERIOR
//        ----------------------------------------- */

//     if (musicPrev) {

//         musicPrev.addEventListener('click', () => {

//             indiceCancion--;

//             if (indiceCancion < 0) {
//                 indiceCancion = canciones.length - 1;
//             }

//             cargarCancion(indiceCancion);

//             audio.play()
//                 .then(() => {
//                     musicPlay.innerHTML = '<span>Ⅱ</span>';
//                 })
//                 .catch(() => {});
//         });

//     }


//     /* -----------------------------------------
//        CANCIÓN SIGUIENTE
//        ----------------------------------------- */

//     if (musicNext) {

//         musicNext.addEventListener('click', () => {

//             indiceCancion++;

//             if (indiceCancion >= canciones.length) {
//                 indiceCancion = 0;
//             }

//             cargarCancion(indiceCancion);

//             audio.play()
//                 .then(() => {
//                     musicPlay.innerHTML = '<span>Ⅱ</span>';
//                 })
//                 .catch(() => {});
//         });

//     }


//     /* -----------------------------------------
//        CUANDO TERMINA UNA CANCIÓN
//        ----------------------------------------- */

//     audio.addEventListener('ended', () => {

//         indiceCancion++;

//         if (indiceCancion >= canciones.length) {
//             indiceCancion = 0;
//         }

//         cargarCancion(indiceCancion);

//     });


//     /* -----------------------------------------
//        INICIAR CON LA PRIMERA CANCIÓN
//        ----------------------------------------- */

//     cargarCancion(indiceCancion);

// }
