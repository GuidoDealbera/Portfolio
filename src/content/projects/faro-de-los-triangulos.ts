import type { Project } from "./types";

/**
 * Fuente: el README y los documentos del repo privado `GuidoDealbera/faro-de-los-triangulos` (carpeta
 * `Guido/Escape-Seno-Coseno`), leídos el 2026-11-11. Es un derivado del Templo de las Asíntotas: conserva su motor
 * (sala en vivo, panel docente, reglas de Firebase) y cambia el contenido, la estética y suma el quiz final. Las
 * 2.075 pruebas son las de Vitest, contadas ese día; las del emulador corren aparte y no se suman.
 *
 * Según el README, falta publicarlo en Vercel y estrenarlo en clase: por eso es prueba de concepto, como el Templo.
 * Sin enlace "Ver online" por lo mismo que el Templo (sólo el docente crea salas).
 */
export const faroDeLosTriangulos: Project = {
  slug: "faro-de-los-triangulos",
  updatedAt: "2026-11-11",
  year: 2026,
  context: "personal",
  status: "poc",
  stack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
  links: {},
  // Las mismas cinco pantallas que el Templo, de una partida de demo en modo local (sin Firebase), con grupos y
  // alumnos de demo y el reloj adelantado. El QR y los links de la sala van difuminados, como en el Templo.
  shots: [
    {
      src: "/projects/faro-de-los-triangulos/inicio.webp",
      width: 1900,
      height: 987,
      alt: {
        es: "Pantalla de entrada sobre una hoja cuadriculada: un faro dibujado en birome cuya luz, pintada con resaltador, forma un triángulo con un velero (con un ángulo α y una distancia «d = ?»), y el formulario para escribir el código de la sala de 4 letras y anotar al grupo.",
        en: "The entrance screen on graph paper: a lighthouse drawn in ballpoint pen whose highlighter-painted beam forms a triangle with a sailboat (marked with an angle α and an unknown distance d), and the form to type the 4-letter room code and sign up the team.",
      },
      caption: { es: "Entrada al faro", en: "Lighthouse entrance" },
    },
    {
      src: "/projects/faro-de-los-triangulos/sala-de-espera.webp",
      width: 1900,
      height: 987,
      alt: {
        es: "Panel docente en la sala de espera: código de la sala en cuadraditos, QR pegado con cinta y enlaces para alumnos y para quien mira (difuminados), los cuatro grupos anotados con sus integrantes y el botón para iniciar la partida.",
        en: "Teacher panel in the waiting room: room code in little boxes, a taped-on QR code and links for students and spectators (blurred), the four signed-up teams with their members and the button to start the game.",
      },
      caption: { es: "Panel docente · Sala de espera", en: "Teacher panel · Waiting room" },
    },
    {
      src: "/projects/faro-de-los-triangulos/partida-en-curso.webp",
      width: 1900,
      height: 987,
      alt: {
        es: "Panel docente con la partida en curso: tiempo de juego, la franja con el código de la sala y los botones para pausar, proyectar y terminar, y las opciones abiertas: enlaces de la sala (difuminados), sonido y reinicio de la partida para todos.",
        en: "Teacher panel with a game in progress: game time, the bar with the room code and the buttons to pause, project and end the game, and the expanded options: room links (blurred), sound and restarting the game for everyone.",
      },
      caption: { es: "Panel docente · Partida en curso", en: "Teacher panel · Game in progress" },
    },
    {
      src: "/projects/faro-de-los-triangulos/grupos.webp",
      width: 1900,
      height: 724,
      alt: {
        es: "Cómo viene cada grupo: el avance en cuadraditos (desafíos y preguntas del quiz), el cuarto y el desafío en que está, los errores seguidos contados con palitos, las pistas y los reinicios, con avisos escritos como «A 1 error del reinicio» y «Lleva 20 min en el 1.3».",
        en: "How each team is doing: progress in little boxes (challenges and quiz questions), the room and challenge they're on, errors in a row as tally marks, hints and restarts, with written alerts for a team one error away from a restart and for one that has spent 20 minutes on challenge 1.3.",
      },
      caption: { es: "Tablero en vivo", en: "Live dashboard" },
    },
    {
      src: "/projects/faro-de-los-triangulos/detalle-grupo.webp",
      width: 1900,
      height: 987,
      alt: {
        es: "Detalle de un grupo: tiempo del escape room, dónde está, totales de errores, intentos, envíos sin leer, pistas y reinicios, y sus respuestas del quiz, con la correcta en la que se equivocó.",
        en: "A team in detail: escape room time, current position, totals for errors, attempts, unreadable submissions, hints and restarts, and their quiz answers, with the right one shown where they got it wrong.",
      },
      caption: { es: "Historial de un grupo", en: "Team history" },
    },
  ],
  copy: {
    es: {
      title: "El Faro de los Triángulos",
      summary:
        "Escape room web en vivo para repasar el teorema del seno y el del coseno: los grupos suben por un faro resolviendo triángulos, cierran con un quiz y el docente sigue la partida desde un tablero en tiempo real.",
      role: "Diseño y desarrollo completos.",
      problem: [
        "Después del Templo de las Asíntotas, la idea era llevar el mismo formato a otro tema: el teorema del seno y el del coseno. Los grupos suben por los dos cuartos de un faro resolviendo triángulos en papel, con la calculadora, y al salir responden un quiz de 10 preguntas que define el podio.",
        "Con calculadora, los resultados nunca son exactos: el juego tiene que aceptar 7,6 o 7.6 en un lado, y 24,1 o 24° 9' en un ángulo, con un margen razonable. Y en medio de la clase el docente tiene que ver de un vistazo qué grupo está trabado, sin leer una tabla de números.",
      ],
      decisions: [
        "Partir del Templo y no de cero: se conservó lo que ya estaba probado (la arquitectura limpia, la sala en vivo con Firebase, las reglas de seguridad y el panel docente) y se reemplazaron el dominio matemático, el contenido, la narrativa y la estética.",
        "Medidas con margen: los lados se aceptan con coma o punto y un 1 % de tolerancia, y los ángulos en decimal o en grados y minutos, con medio grado. Las respuestas de los 8 desafíos, con 3 variantes cada uno, se calculan resolviendo el triángulo desde el dominio, y los tests las comprueban.",
        "El dibujo es un dato: cada desafío describe su triángulo, que se dibuja a escala en SVG con un «?» en lo que se pide y se completa con los valores al resolverlo.",
        "Cada cuarto es un checkpoint: con 5 errores seguidos, el grupo vuelve al primer desafío de su cuarto, con otros números, y no al principio del juego. El ranking combina los aciertos del quiz con el tiempo del escape room, y el puesto se oculta durante el quiz para no delatar las respuestas.",
        "Un tablero pensado para el aula: avisos escritos y no sólo de color («A 1 error del reinicio», «Lleva 9 min en el 2.2»), la opción de ordenar por quién necesita ayuda y una pantalla para el proyector, sin nombres de alumnos.",
        "Las reglas de Firebase suman el quiz y el checkpoint y se siguen probando contra el emulador: por ejemplo, las respuestas del quiz sólo pueden crecer de a una, sin cambiar las anteriores.",
      ],
      result: [
        "Está terminado y probado, como prueba de concepto: tiene más de 2.000 pruebas automáticas y una partida completa revisada en el navegador, en computadora y en celular. Falta publicarlo y estrenarlo en clase.",
        "Al Templo le suma un quiz final, una pantalla para proyectar y una estética nueva, «Cuaderno cuadriculado»: la app es la hoja cuadriculada donde los alumnos resuelven de verdad, con birome, resaltador y post-its.",
      ],
    },
    en: {
      title: "El Faro de los Triángulos",
      summary:
        "A live web escape room for reviewing the law of sines and the law of cosines: student teams climb a lighthouse by solving triangles, finish with a quiz, and the teacher follows the game from a real-time dashboard.",
      role: "End-to-end design and development.",
      problem: [
        "After El Templo de las Asíntotas, the goal was to bring the same format to another topic: the law of sines and the law of cosines. Teams climb the two rooms of a lighthouse by solving triangles on paper with a calculator, and on the way out they answer a 10-question quiz that decides the podium.",
        "With a calculator, results are never exact: the game has to accept 7,6 (the Argentine decimal comma) or 7.6 for a side, and 24,1 or 24° 9' for an angle, within a reasonable margin. And in the middle of class, the teacher has to see at a glance which team is stuck, without reading a table of numbers.",
      ],
      decisions: [
        "Building on the Templo instead of starting from scratch: what was already proven (the clean architecture, the live room on Firebase, the security rules and the teacher panel) stayed, while the math domain, the content, the story and the visual style were replaced.",
        "Measurements with a margin: sides are accepted with a comma or a dot and a 1% tolerance, and angles in decimal or in degrees and minutes, within half a degree. The answers to the 8 challenges, with 3 variants each, are computed by solving the triangle in the domain and verified by tests.",
        "The drawing is data: each challenge describes its triangle, which is drawn to scale in SVG with a question mark on what's being asked and filled in with the values once it's solved.",
        "Each room is a checkpoint: after 5 errors in a row, the team goes back to the first challenge of its room, with new numbers, instead of the start of the game. The ranking combines quiz answers with escape room time, and the live position is hidden during the quiz so it doesn't give the answers away.",
        "A dashboard designed for the classroom: written alerts, not just colors, for a team one error away from a restart or one that has spent too long on the same challenge, an option to sort by who needs help, and a screen for the projector with no student names.",
        "The Firebase rules add the quiz and the checkpoint and are still tested against the emulator: for example, quiz answers can only grow one at a time, without changing the previous ones.",
      ],
      result: [
        "It's finished and tested as a proof of concept: it has over 2,000 automated tests and a full game checked in the browser, on a computer and on a phone. It still has to be published and used in class.",
        "On top of the Templo, it adds a final quiz, a projector screen and a new graph-paper notebook look: the app is the sheet of graph paper where students actually work things out, with ballpoint pen, highlighter and sticky notes.",
      ],
    },
  },
};
