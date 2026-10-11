import { Nunito_Sans, Poppins } from "next/font/google";

// Poppins no es variable en Google Fonts: se piden sólo los pesos que usan los títulos.
export const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Nunito Sans sí es variable: un solo archivo cubre todos los pesos del cuerpo.
export const nunito = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
});
