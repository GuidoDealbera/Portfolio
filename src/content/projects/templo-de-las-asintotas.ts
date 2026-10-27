import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (ficha 3.4) y lo que Guido confirmó el
 * 2026-10-21: está publicado y listo, pero todavía no se usó en clase. Sin enlace
 * "Ver online" a propósito: sólo Guido puede crear salas, así que un visitante
 * se quedaría en la pantalla del código. El repo es privado.
 */
export const temploDeLasAsintotas: Project = {
  slug: "templo-de-las-asintotas",
  updatedAt: "2026-10-22",
  year: 2026,
  context: "personal",
  status: "poc",
  stack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
  links: {},
  // Grupos y alumnos de demo. Los links de la sala y el QR van difuminados: llevan a la versión publicada.
  shots: [
    {
      src: "/projects/templo-de-las-asintotas/inicio.webp",
      width: 1901,
      height: 987,
      alt: {
        es: "Pantalla de entrada del templo: un arco con la gráfica de una función racional y sus asíntotas, antorchas, columnas, y el formulario para escribir el código de la sala de 4 letras y anotar al grupo.",
        en: "The temple entrance: an arch showing the graph of a rational function and its asymptotes, torches and columns, and the form to type the 4-letter room code and sign up the team.",
      },
      caption: { es: "Entrada al templo", en: "Temple entrance" },
    },
    {
      src: "/projects/templo-de-las-asintotas/sala-de-espera.webp",
      width: 1900,
      height: 987,
      alt: {
        es: "Panel docente en la sala de espera: código de la sala, QR y enlaces para alumnos y para quien mira (difuminados), grupos anotados, reglas y sonido de la partida.",
        en: "Teacher panel in the waiting room: room code, QR code and links for students and spectators (blurred), signed-up teams, game rules and sound.",
      },
      caption: { es: "Panel docente · Sala de espera", en: "Teacher panel · Waiting room" },
    },
    {
      src: "/projects/templo-de-las-asintotas/partida-en-curso.webp",
      width: 1896,
      height: 987,
      alt: {
        es: "Panel docente con la partida en curso: tiempo de juego, enlaces de la sala (difuminados) y controles para pausar, reiniciar o terminar la partida.",
        en: "Teacher panel with a game in progress: game time, room links (blurred) and controls to pause, restart or end the game.",
      },
      caption: { es: "Panel docente · Partida en curso", en: "Teacher panel · Game in progress" },
    },
    {
      src: "/projects/templo-de-las-asintotas/grupos.webp",
      width: 1896,
      height: 697,
      alt: {
        es: "Cómo viene cada grupo: el cuarto y el desafío en que está, desafíos resueltos de 15, errores seguidos, pistas usadas y reinicios, con opciones para reiniciar o quitar al grupo.",
        en: "How each team is doing: the room and challenge they're on, challenges solved out of 15, errors in a row, hints used and restarts, with options to restart or remove the team.",
      },
      caption: { es: "Tablero en vivo", en: "Live dashboard" },
    },
    {
      src: "/projects/templo-de-las-asintotas/detalle-grupo.webp",
      width: 1895,
      height: 985,
      alt: {
        es: "Detalle de un grupo: tiempo de juego, dónde está, totales de errores, intentos, envíos sin leer, pistas y reinicios, y el estado de cada desafío.",
        en: "A team in detail: game time, current position, totals for errors, attempts, unreadable submissions, hints and restarts, and the status of each challenge.",
      },
      caption: { es: "Historial de un grupo", en: "Team history" },
    },
  ],
  copy: {
    es: {
      title: "El Templo de las Asíntotas",
      summary:
        "Escape room web en vivo para repasar funciones racionales en 5.º año: los grupos compiten resolviendo desafíos y el docente controla la partida desde un tablero en tiempo real.",
      role: "Diseño y desarrollo completos.",
      problem: [
        "La idea era que el repaso de funciones racionales antes de la evaluación fuera un juego por equipos: cada grupo resuelve los cálculos en papel, escribe el resultado y avanza por los cuartos de un templo.",
        "Eso exige respuestas abiertas y no de opción múltiple: el juego tiene que aceptar 3/2, 1,5 o una expresión algebraica equivalente, y el docente tiene que ver en vivo cómo avanza cada grupo, desde la computadora o el celular. Además, los jugadores son menores: los datos tienen que ser los mínimos y poder borrarse al terminar.",
      ],
      decisions: [
        "Un dominio matemático propio: fracciones exactas, números con la convención argentina y comparación de expresiones algebraicas por equivalencia. Las respuestas de los 15 desafíos se calculan desde ese dominio y los tests las comprueban.",
        "Clean architecture verificada por tests: las reglas del juego no conocen ni React ni Firebase, y un test falla si una capa importa lo que no le corresponde.",
        "Tres implementaciones intercambiables para el estado de la sala: Firebase Realtime Database para jugar en vivo, sincronización entre pestañas para probar sin conexión y memoria para los tests.",
        "La seguridad la decide el servidor: las reglas de Firebase se generan desde TypeScript, con mínimo privilegio por rol, y se prueban contra el emulador. Ocultar un botón no protege nada.",
        "Costo cero y privacidad: Firebase y Vercel en sus planes gratuitos, sin herramientas de análisis, y un botón para borrar la partida con todos sus datos al terminar.",
      ],
      result: [
        "Está publicado y listo para usar en clase, como prueba de concepto: falta estrenarlo con alumnos. Tiene unas 1.600 pruebas automáticas, accesibilidad cuidada (foco, lectores de pantalla, reducción de movimiento) y un panel docente con código de sala, QR, tablero en vivo, historial por grupo y exportación a PDF.",
      ],
    },
    en: {
      title: "El Templo de las Asíntotas",
      summary:
        "A live web escape room for reviewing rational functions in high school: student teams compete by solving challenges while the teacher runs the game from a real-time dashboard.",
      role: "End-to-end design and development.",
      problem: [
        "The goal was to turn the review of rational functions before the exam into a team game: each group works the problems out on paper, types in the result and moves through the rooms of a temple.",
        "That calls for open answers rather than multiple choice: the game has to accept 3/2, 1,5 (the Argentine decimal comma) or an equivalent algebraic expression, and the teacher has to follow every team live, from a computer or a phone. And since the players are minors, the data has to be minimal and erasable at the end.",
      ],
      decisions: [
        "A custom math domain: exact fractions, Argentine number formatting and equivalence-based comparison of algebraic expressions. The answers to the 15 challenges are computed from that domain and verified by tests.",
        "Clean architecture enforced by tests: the game rules know nothing about React or Firebase, and a test fails if a layer imports something it shouldn't.",
        "Three interchangeable implementations for the room state: Firebase Realtime Database for live play, cross-tab sync for offline testing, and in-memory for tests.",
        "Security is decided by the server: Firebase rules are generated from TypeScript with least privilege per role and tested against the emulator. Hiding a button protects nothing.",
        "Zero cost and privacy: Firebase and Vercel on their free tiers, no analytics, and a button to delete the game and all its data at the end.",
      ],
      result: [
        "It's live and ready for the classroom as a proof of concept: it hasn't been used with students yet. It has around 1,600 automated tests, careful accessibility (focus management, screen readers, reduced motion) and a teacher panel with a room code, QR code, live dashboard, per-team history and PDF export.",
      ],
    },
  },
};
