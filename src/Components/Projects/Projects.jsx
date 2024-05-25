import { Swiper, SwiperSlide } from "swiper/react";
import pf from "../../assets/PF-landing.png";
import pi from "../../assets/PI-home.jpg";
import rym from "../../assets/R&M-home.jpg";
import ecommerce from "../../assets/Progress.png";
import project_person from "../../assets/Guido4.1.png";
import novogas from "../../assets/novogas.png";
import grupooeste from "../../assets/grupoesteseguros.png";
import portfolio from '../../assets/portfolio.png'
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const Projects = () => {
  const projects = [
    {
      name: "Grupo Oeste Seguros",
      image: grupooeste,
      github: "https://github.com/GuidoDealbera/seguros-front",
      deploy: false,
    },
    {
      name: "NovoGas Empresa",
      image: novogas,
      github: false,
      deploy: false,
    },
    {
      name: "Portfolio",
      image: portfolio,
      github: "https://github.com/GuidoDealbera/Portfolio",
      deploy: "https://guidodealbera-dev.vercel.app/"
    },
    {
      name: "Aquí Estoy Admin",
      image: pf,
      github: "https://github.com/GuidoDealbera/aqui-estoy",
      deploy: "https://adminaquiestoy.up.railway.app/",
    },
    {
      name: "PI Foods",
      image: pi,
      github: "https://github.com/GuidoDealbera/PI-Food-main",
      deploy: "https://pi-foods-guido.vercel.app/",
    },
    {
      name: "Rick and Morty App",
      image: rym,
      github: "https://github.com/GuidoDealbera/Rick-and-Morty",
      deploy: false,
    },
    {
      name: "E-Commerce",
      image: ecommerce,
      github: "https://github.com/GuidoDealbera/E-commerce",
      deploy: false,
    },
  ];
  return (
    <section id="projects" className="py-[4.5rem] text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          Mis <span className="text-cyan-600">Proyectos</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">Mis trabajos</p>
      </div>
      <br />
      <div className="flex max-w-6xl px-5 mx-auto items-center gap-5">
        <div className="lg:w-2/3 w-full">
          <Swiper
            slidesperview={1.2}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {projects.map((info, i) => (
              <SwiperSlide key={i}>
                <div className="h-fit md:w-full p-4 bg-slate-700 rounded-xl">
                  <img
                    src={info.image}
                    alt={info.name}
                    className="rounded-lg"
                  />
                  <h3 className="text-xl my-4">{info.name}</h3>
                  <div
                    className={`buttons ${
                      i === projects.length - 1 && "pb-1"
                    } ${i === 0 && "pb-[0.8rem]"} ${i === 3 && "pb-1"} ${i === 2 && "pb-3"}`}
                  >
                    {info.github ? (
                      <a href={info.github}>GitHub</a>
                    ) : (
                      <p className="text-neutral-500 pb-[0.8rem] text-sm">
                        Este proyecto es privado
                      </p>
                    )}
                    {info.deploy && <a href={info.deploy}>Deploy</a>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <img
            src={project_person}
            alt=""
            className="h-96 min-w-full bg-cyan-600 rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
