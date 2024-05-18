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
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });

    const handleClickOutside = (event) => {
      if (!menuRef.current) return;
      if (
        !showMenu ||
        menuRef.current.contains(event.target) ||
        trigger.current.contains(event.target)
      )
        return;
      setShowMenu(false);
      setSelectedOption(null);
    };

    const handleKey = (event) => {
      if (event.key === "Escape" || event.key === "ArrowRight") {
        event.preventDefault();
        setShowMenu(false);
        setSelectedOption(null);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedOption(0)
        setShowMenu(true);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedOption((prevOption) => (prevOption + 1) % menuLinks.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedOption((prevOption) =>
          prevOption === 0 ? menuLinks.length - 1 : prevOption - 1
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        setShowMenu(false);
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
        <div
          ref={trigger}
          className={`z-[999] md:hidden m-5 cursor-pointer`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <X size={30} className="text-gray-900" />
          ) : (
            <Menu size={30} className="text-gray-100" />
          )}
        </div>
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
