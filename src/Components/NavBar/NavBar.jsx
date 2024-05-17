import { Menu, X } from "react-feather";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuLinks = [
    { name: "INICIO", link: "#home" },
    { name: "ACERCA", link: "#about" },
    { name: "HABILIDADES", link: "#skills" },
    { name: "PROYECTOS", link: "#projects" },
    { name: "CONTACTO", link: "#contact" },
  ];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);
  return (
    <nav
      className={`fixed w-full left-0 top-0 z-[999] ${
        sticky ? "bg-neutral-300 text-gray-900" : "text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="mx-7">
          <h4 className="text-4xl uppercase font-bold">
            G<span className="text-cyan-600">uid</span>o
          </h4>
        </div>
        <div
          className={` ${
            sticky ? "md:bg-white/0 bg-white" : "bg-white"
          } text-gray-900 md:block hidden px-7 py-2 font-medium rounded-bl-full`}
        >
          <ul className="flex items-center gap-1 py-2 text-lg">
            {menuLinks?.map((menu, i) => (
              <li
                key={i}
                className="px-[0.65rem] md/lg:px-6 hover:text-cyan-600 transition-all"
              >
                <a className="links" href={menu.link}>
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`z-[999] md:hidden m-5`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <X size={30} className="text-gray-900" />
          ) : (
            <Menu size={30} className="text-gray-100" />
          )}
        </div>
        <div
          className={`md:hidden text-gray-900 absolute w-screen max-w-[350px] h-screen px-7 py-2 bg-white top-0 duration-300 ${
            showMenu ? "right-0" : "right-[-100%]"
          }`}
        >
          <ul className="flex flex-col justify-center h-full gap-10 py-2 text-lg">
            {menuLinks?.map((menu, i) => (
              <li
                key={i}
                className="px-6 hover:text-cyan-600"
                onClick={() => setShowMenu(false)}
              >
                <a href={menu.link} className="links w-max">{menu.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
