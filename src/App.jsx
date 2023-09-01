import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import Projects from "./Components/Projects/Projects";
import Skills from "./Components/Skills/Skills";
import Bot from "./Components/Bot/Bot";
import Hireme from "./Components/Hireme/Hireme";
import { useState } from "react";
import Modal from "./Components/Modal/Modal";

export default function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <NavBar />
      <Bot/>
      <Home />
      <About/>
      <Skills/>
      <Hireme openModal={() => setShowModal(true)}/>
      <Modal open={showModal} close={() => setShowModal(false)}/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}