import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import Projects from "./Components/Projects/Projects";
import Skills from "./Components/Skills/Skills";
import Bot from "./Components/Bot/Bot";

export default function App() {
  return (
    <>
      <NavBar />
      <Bot/>
      <Home />
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </>
  );
}