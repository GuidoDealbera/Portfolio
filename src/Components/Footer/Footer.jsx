const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-sm p-4 text-center text-white flex flex-col gap-2">
      <span>{year} © Guido José Dealbera</span>
      <span className="text-gray-400">
        Villa María, Córdoba, Argentina · Desarrollador Fullstack
      </span>
    </footer>
  );
};

export default Footer;
