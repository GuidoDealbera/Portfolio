import { Menu, X } from "react-feather";
import { useState, useEffect, useRef, useMemo } from "react";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const menuRef = useRef(null);
  const trigger = useRef(null);
  const menuLinks = useMemo(
    () => [
      { name: "INICIO", link: "#home" },
      { name: "ACERCA", link: "#about" },
      { name: "HABILIDADES", link: "#skills" },
      { name: "PROYECTOS", link: "#projects" },
      { name: "CONTACTO", link: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Los atajos sólo viven mientras el menú está abierto: capturarlos siempre
    // dejaba a la página entera sin scroll por teclado.
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
      setSelectedOption(null);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      if (trigger.current?.contains(event.target)) return;
      closeMenu();
    };

    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        trigger.current?.focus();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedOption((prev) =>
          prev === null ? 0 : (prev + 1) % menuLinks.length
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedOption((prev) =>
          prev === null || prev === 0 ? menuLinks.length - 1 : prev - 1
        );
      } else if (event.key === "Enter" && selectedOption !== null) {
        event.preventDefault();
        closeMenu();
        window.location.href = menuLinks[selectedOption].link;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuLinks, selectedOption, showMenu]);

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
        <button
          type="button"
          ref={trigger}
          aria-label={showMenu ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={showMenu}
          className="z-[999] md:hidden m-5 cursor-pointer bg-transparent border-0 p-0"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? (
            <X size={30} className="text-gray-900" />
          ) : (
            <Menu size={30} className="text-gray-100" />
          )}
        </button>
        <div
          ref={menuRef}
          className={`md:hidden text-gray-900 absolute w-screen max-w-[350px] h-screen px-7 py-2 bg-white top-0 duration-300 ${
            showMenu ? "right-0" : "right-[-100%]"
          }`}
        >
          <ul className="flex flex-col justify-center h-full w-max gap-10 py-2 text-lg">
            {menuLinks?.map((menu, i) => (
              <li
                key={i}
                className={`w-max px-6 hover:text-cyan-600 ${
                  selectedOption === i ? "text-cyan-600" : ""
                }`}
                onClick={() => setShowMenu(false)}
              >
                <a href={menu.link} className="links w-max">
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
