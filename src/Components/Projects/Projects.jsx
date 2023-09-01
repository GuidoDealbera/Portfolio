import { Swiper, SwiperSlide } from "swiper/react";
import project1 from "../../assets/project-1.png";
import project_person from '../../assets/project.png'
import "swiper/css";
import "swiper/css/pagination";
import {Pagination, Autoplay} from 'swiper/modules'

const Projects = () => {
  const projects = [
    {
      name: "Aquí Estoy Admin",
      image: project1,
      github: "https://github.com/GuidoDealbera/aqui-estoy",
      deploy: false
    },
    {
      name: "PI Foods",
      image: project1,
      github: "https://github.com/GuidoDealbera/PI-Food-main",
      deploy: "https://pi-foods-guido.vercel.app/"
    },
    {
      name: "Rick and Morty App",
      image: project1,
      github: "https://github.com/GuidoDealbera/Rick-and-Morty",
      deploy: false
    },
    {
      name: "E-Commerce",
      image: project1,
      github: "https://github.com/GuidoDealbera/E-commerce",
      deploy: false
    }

  ]
  return (
    <section id="projects" className="py-10 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          Mis <span className="text-cyan-600">Proyectos</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">Mis trabajos</p>
      </div>
      <br />
      <div className="flex max-w-6xl px-5 mx-auto items-center relative">
        <div className="lg:w-2/3 w-full">
        <Swiper
            slidesPerview={1.2}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            loop={true}
            autoplay={{
              delay: 3500,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
          >
            {
              projects.map((info, i) =>(
            <SwiperSlide key={i}>
              <div className="h-fit w-full p-4 bg-slate-700 rounded-xl">
                <img src={info.image} alt={info.name} className="rounded-lg" />
                <h3 className="text-xl my-4">{info.name}</h3>
                <div className="buttons">
                  <a href={info.github}>GitHub</a>
                  {info.deploy && 
                  <a href={info.deploy}>Deploy</a>
                  }
                </div>
              </div>
            </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div>
          <img src={project_person} alt="" className="h-96 drop-shadow-xl"/>
        </div>
      </div>
    </section>
  );
};

export default Projects;
