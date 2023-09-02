import home from "../../assets/home(sin fondo).png";

const Home = () => {
  const social_media = [
    {logo: "logo-facebook", url: "https://www.facebook.com/guido.dealbera/"},
    {logo: "logo-instagram", url: "https://www.instagram.com/guido.dealbera/"},
    {logo: "logo-github", url: "https://github.com/GuidoDealbera"},
    {logo: "logo-linkedin", url: "https://www.linkedin.com/in/guido-jos%C3%A9-dealbera-5433a0261/"},
  ];
  return (
    <section
      id="home"
      className="min-h-screen flex py-10 md:flex-row flex-col items-center"
    >
      <div className="flex-1 flex items-center justify-center h-full">
        <img
          src={home}
          alt=""
          className="md:w-11/12 h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="md:text-left text-center">
          <h1 className="md:text-5xl text-2xl md:leading-normal leading-10 text-white font-bold">
            <span className="text-cyan-600 md:text-6xl text-5xl">
              Hola!
              <br />
            </span>
            <span>Mi nombre es</span> <span>Guido Dealbera</span>
          </h1>
          <h4 className="md:text-2xl text-lg md:leading-normal leading-5 mt-4 font-bold text-gray-600">Fullstack Web Developer</h4>
          <a href="#contact" className="btn-primary mt-8 w-fit duration-300 hover:bg-cyan-700">Contáctame</a>
          <div className="mt-8 text-3xl flex items-center md:justify-start justify-center gap-3">
          {social_media?.map((red) => (
              <div
                key={red.logo}
                className="text-gray-600 hover:text-white cursor-pointer "
              >
                <a href={red.url} target="_blank"><ion-icon name={red.logo}></ion-icon></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
