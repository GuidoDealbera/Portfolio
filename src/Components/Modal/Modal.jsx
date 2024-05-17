/* eslint-disable react/prop-types */
import { ArrowDownRight } from "react-feather";

const Modal = ({ open, close }) => {
  if (!open) return null;
  const handleClose = (event) => {
    if (event.target.id === "outside") close();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[8px] flex justify-center items-center z-[999]"
      id="outside"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col relative z-[999]">
        <div className="bg-gray-900/80 text-white px-4 py-2 rounded-xl">
          <h3 className="text-4xl py-4 text-center uppercase">
            Gracias por ver mi <span className="text-cyan-600">Portfolio</span>
          </h3>
          <p className="text-justify">
            Es sumamente crucial destacar en el ámbito de la tecnología. Por lo
            tanto, el hecho de que hayas dedicado tiempo a revisar mi página y
            hayas llegado hasta aquí tiene un valor significativo para mí. Por
            esta razón, quiero expresarte mi sincero{" "}
            <span className="text-cyan-600 font-semibold">agradecimiento</span>
          </p>
          <h3 className="py-10 text-xl">Sin más ...</h3>
          <h3 className="flex gap-4 items-center pb-4">
            Ahora decide tú <ArrowDownRight className="hidden sm:block border-2 border-white rounded-full"/>
          </h3>
          <div className="flex w-full justify-end gap-2 pb-2">
            <a onClick={close} href="#contact" className="btn-primary w-fit">
              Lo contactaré
            </a>
            <a onClick={close} href="#projects" className="btn-primary">Sigamos viendo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
