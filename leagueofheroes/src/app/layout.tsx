import "./globals.css";
import "./styles/animations.css";

import { HeroesProvider } from "./Components/Context/HeroesContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <HeroesProvider>
          <Header myName="O TEU NOME" projectName="League of Heroes" />
          {children}
          <Footer myName="O TEU NOME" projectName="League of Heroes" />
        </HeroesProvider>
      </body>
    </html>
  );
}
