import "./Header.css";
import Link from "next/link";

interface HeaderProps {
  myName: string;
  projectName: string;
}

export default function Header({ myName, projectName }: HeaderProps) {
  return (
    <header className="header">

      <img
        src="https://i.pinimg.com/736x/7d/44/1f/7d441fa1467d5e2e92d6b2622455c586.jpg"
        alt="Logo"
        className="logo"
      />

      <div className="header-text">
        <h1>{projectName}</h1>
        <h3>Desenvolvido por {myName = "Guilherme Ramos PV33680"}</h3>
      </div>

      <nav className="menu">
        <Link href="/">Home  </Link>
        <Link href="/dashboard">  Dashboard</Link>
      </nav>
    </header>
  );
}