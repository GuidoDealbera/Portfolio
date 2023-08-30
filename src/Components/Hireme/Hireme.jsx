import hireMe from "../../assets/guidoslack.png";

const Hireme = () => {
  return (
    <section id="hireme" className="py-10 px-3 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          Contrátame <span className="text-cyan-600">YA</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">¿Tenés algún trabajo?</p>
      </div>
      <div className="bg-gray-700 relative px-8 rounded-2xl py-5 lg:max-w-4xl mx-auto min-h-[24rem] mt-24 flex gap-6 lg:flex-row flex-col-reverse items-center">
        <div>
          <h2 className="text-2xl font-semibold">¿Tenés un trabajo para mí?</h2>
          <p className="max-w-lg text-sm mt-4 text-gray-200 leading-6 lg:text-left text-justify">
            Como Fullstack Developer{" "}
            <span className="text-cyan-600 font-semibold">Junior</span>, poseo
            un sólido conocimiento en desarrollo web utilizando tecnologías
            claves. Mi experiencia abarca la creación de interfaces interactivas
            con React y Next, así como la implementación de herramientas de
            gestión de estados como Redux y Redux Toolkit. Además, he trabajado
            en proyectos que requerían metodologías ágiles y SCRUM, lo que me ha
            proporcionado una comprensión de las mejores prácticas de trabajo en
            equipo y colaboración. En el ámbito del backend, he adquirido
            habilidades en Node.js, PostgreSQL y Sequelize para la gestión de
            bases de datos y consultas. Mi familiaridad con frameworks como
            Material UI, Bootstrap y Tailwind CSS me permite crear interfaces
            atractivas y funcionales. Estoy emocionado por la oportunidad de
            contribuir con mi entusiasmo y conocimiento, y aprender de manera
            continua en un equipo dinámico y en constante crecimiento.
          </p>
          <button className="btn-primary mt-10">Saluda</button>
        </div>
        <img
          src={hireMe}
          alt=""
          className="lg:h-[25rem] hidden lg:block h-80 lg:absolute bottom-0 right-0 rounded-br-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default Hireme;
