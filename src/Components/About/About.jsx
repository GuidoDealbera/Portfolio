import aboutImg from "../../assets/home.png";

const About = () => {
  const info = [
    { text: "Meses de experiencia", count: "08" },
    { text: "Proyectos completados", count: "03" },
  ];
  return (
    <section id="about" className="py-10 text-white">
      <div className="text-center mt-8">
        <h3 className="text-4xl font-semibold">
          Sobre <span className="text-cyan-600">Mí</span>
        </h3>
        <p className="text-gray-400 my-3 text-lg">Introducción</p>
        <div className="flex md:flex-row flex-col-reverse items-center md:gap-6 gap-12 px-10 max-w-6xl mx-auto">
          <div className="p-2">
            <div className="text-gray-300 my-3">
              <p className="text-justify leading-7 w-11/12 mx-auto">
                Soy Guido, un estudiante de 28 años de edad, dedicado a obtener
                mi título de Profesor Universitario en Matemáticas. Durante los
                últimos meses, me he enamorado del fascinante mundo de la
                programación y he decidido enfocar mi capacitación en el
                desarrollo{" "}
                <span className="font-semibold text-white">Fullstack</span>,
                logrando mi titulación este 2023, en el maravilloso bootcamp de{" "}
                <a
                  className="font-semibold text-white duration-150 hover:text-cyan-600 hover:underline cursor-pointer"
                  href="https://www.soyhenry.com/"
                  target="_blank"
                >
                  SoyHenry
                </a>
                . ¡Espero tener la oportunidad de contribuir y crecer junto a un
                equipo apasionado por la tecnología!
              </p>
              <div className="flex mt-10 items-center gap-7">
                {info.map((info) => (
                  <div key={info.text}>
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">
                      {info.count}
                      <span className="text-cyan-600">+</span>{" "}
                    </h3>
                    <span className="md:text-base text-xs">{info.text}</span>
                  </div>
                ))}
              </div>
              <a href="./src/assets/CV Guido.pdf" download>
                <button className="btn-primary mt-8">Descargar CV</button>
              </a>
            </div>
          </div>
          <div className="flex-1 md:mt-0 mt-6 flex justify-center items-center">
            <div className="lg:w-96 h-full relative sm:w-10/12 w-11/12 max-w-sm aboutImg">
              <img
                src={aboutImg}
                alt=""
                className="w-full object-cover bg-cyan-600 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
