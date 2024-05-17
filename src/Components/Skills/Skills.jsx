import { IoLogoHtml5, IoLogoCss3 } from "react-icons/io";
import { IoLogoReact } from "react-icons/io5";
import { FaNodeJs } from "react-icons/fa";
import {
  BiLogoTypescript,
  BiLogoPostgresql,
  BiLogoRedux,
} from "react-icons/bi";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiMui,
  SiExpress,
  SiSequelize,
} from "react-icons/si";
import { useState } from "react";

const Skills = () => {
  let skills = [
    {
      logo: <IoLogoHtml5 />,
      name: "HTML",
    },
    {
      logo: <IoLogoCss3 />,
      name: "CSS",
    },
    {
      logo: <IoLogoReact />,
      name: "React Js",
    },
    {
      logo: <FaNodeJs />,
      name: "Node Js",
    },
    {
      logo: <BiLogoTypescript />,
      name: "Typescript",
    },
    {
      logo: <SiTailwindcss />,
      name: "Tailwind Css",
    },
    {
      logo: <SiMui />,
      name: "Material UI",
    },
    {
      logo: <SiNextdotjs />,
      name: "Next Js",
    },
    {
      logo: <BiLogoRedux />,
      name: "Redux",
    },
    {
      logo: <SiExpress />,
      name: "Express",
    },
    {
      logo: <BiLogoPostgresql />,
      name: "PostgreSQL",
    },
    {
      logo: <SiSequelize />,
      name: "Sequelize",
    },
  ];
  const [sliceSkills, setSliceSkills] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(1500);
  if (!sliceSkills) {
    skills = skills.slice(0, 4);
  }

  const clickButton = () => {
    if (sliceSkills) {
      setSliceSkills(false);
    } else {
      setLoading(true);
      const time = setTimeout(() => {
        setSliceSkills(true);
        setLoading(false);
        setLoadTime(300)
      }, loadTime);
      return () => clearTimeout(time);
    }
  };
  return (
    <section id="skills" className="py-10 bg-gray-800 relative scroll-smooth">
      <div className="mt-8 text-gray-100 text-center">
        <h3 className="text-4xl font-semibold">
          Mis <span className="text-cyan-600">Habilidades</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">Mis conocimientos</p>
        <div className="grid mt-12 place-items-center">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-300">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="border-2 group border-cyan-600 relative min-w-[10rem] max-w-[16rem] bg-gray-900 p-10 rounded-xl"
              >
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-800 group-hover:bg-cyan-600 transition-all duration-300">
                  <div className="text-6xl w-28 h-28 group-hover:text-cyan-600 group-hover:scale-110 transition-all duration-300 bg-gray-900 rounded-full flex items-center justify-center">
                    {skill.logo}
                  </div>
                </div>
                <p className="text-xl mt-3">{skill.name}</p>
              </div>
            ))}
          </div>
          <a href={!loading && !sliceSkills ? "#skills" : null}>
            <button
              onClick={clickButton}
              className="bg-cyan-600 font-medium flex justify-center items-center text-white hover:bg-cyan-700 active:bg-cyan-500 transition-all duration-150 h-11 w-32 rounded-full mt-4"
            >
              {!loading && sliceSkills ? "Ver menos" : loading ? <div className="w-full h-full flex justify-center items-center"><div className="loading"></div></div> : "Ver más"}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
