import "./Footer.css";

interface FooterProps {
  myName: string;
  projectName: string;
}

export default function Footer({ myName, projectName }: FooterProps) {
  return (
    <footer className="footer">
      {projectName = "League of Heros"} Copyright © 2025 por {myName = "Guilherme Ramos PV33680"}
    </footer>
  );
}
