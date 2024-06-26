import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const toastSuccess = {
  style: {
      backgroundColor: "#0891B2",
      color: "#FFFFFF",
      border: "solid #0891B2",
      boxShadow: "0 0 5px #0891B2"
  }
};

const toastError = {
  style: {
      backgroundColor: "#C93838",
      color: "#FFFFFF",
      border: "solid #C93838",
      boxShadow: "0 0 5px #C93838"
  }
};

const Contact = () => {
  const [input, setInput] = useState({
    user_name: "",
    user_email: "",
    message: ""
  })
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_hcdcbm8",
        "template_n6qv8df",
        form.current,
        "zo3eKLHIDk1XpwVJw"
      )
      .then(
        (result) => {
          setInput({
            user_name: "",
            user_email: "",
            message: ""
          })
          toast.success('Mensaje enviado con éxito', toastSuccess)
          setTimeout(() => window.scrollTo({top: 0, behavior: "smooth"}), 700)
          console.log(result.text);
        },
        (error) => {
          toast.error('Error, intente nuevamente', toastError)
          console.log(error.text);
        }
      );
  };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }
  const contact_info = [
    {
      logo: "mail",
      text: "guidojdealbera@gmail.com",
      link: "mailto:guidojdealbera@gmail.com",
    },
    {
      logo: "logo-whatsapp",
      text: "+54 3775 432263",
      link: "https://wa.me/543775432263",
    },
    {
      logo: "location",
      text: "Villa María, Córdoba, Argentina",
      link: "https://www.google.com.ar/maps/place/Sta.+Fe+1692,+X5900+Villa+Mar%C3%ADa,+C%C3%B3rdoba/@-32.4060716,-63.2478329,15z",
    },
  ];
  return (
    <section id="contact" className="py-10 px-3 text-white">
      <div className="text-center mt-8">
        <h3 className="text-4xl font-semibold">
          Contácta<span className="text-cyan-600">me</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">Ponte en contacto</p>
        <div className="mt-16 flex md:flex-row flex-col gap-6 max-w-5xl bg-gray-800 md:p-6 p-2 rounded-lg mx-auto">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col flex-1 gap-5">
            <input type="text" value={input.user_name} placeholder="Tu Nombre" name="user_name" onChange={handleInputChange} required/>
            <input type="email" value={input.user_email} placeholder="Tu Correo Electrónico" name="user_email" onChange={handleInputChange} required/>
            <textarea className="resize-none" value={input.message} placeholder="Tu Mensaje" rows={10} name="message" onChange={handleInputChange} required/>
            <button type="submit" className="btn-primary w-fit">Enviar mensaje</button>
          </form>
          <div className="flex flex-col gap-7">
            {contact_info.map((info, i) => (
              <div key={i} className="flex gap-4 items-center">
                <a
                  href={info.link}
                  rel="noreferrer"
                  target="_blank"
                  className="flex justify-center items-center hover:cursor-pointer"
                >
                  <div className="min-w-[3.5rem] text-2xl min-h-[3.5rem] flex items-center justify-center text-white bg-cyan-600 rounded-full">
                    <ion-icon name={info.logo}></ion-icon>
                  </div>
                </a>
                <p className="text-base truncate">{info.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
