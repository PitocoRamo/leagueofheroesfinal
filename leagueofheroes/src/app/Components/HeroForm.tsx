"use client";

import { useState } from "react";
import { useHeroes, Hero } from "./Context/HeroesContext";
import { useRouter } from "next/navigation";

interface Props {
  hero?: Hero | null;
}

export default function HeroForm({ hero = null }: Props) {
  const { addHero, updateHero } = useHeroes();
  const router = useRouter();

  const [name, setName] = useState(hero?.name ?? "");
  const [image, setImage] = useState(hero?.image ?? "");
  const [superpower, setSuperpower] = useState(hero?.superpower ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (hero === null) {
      addHero({ name, image, superpower });
    } else {
      updateHero({
        id: hero.id,
        name,
        image,
        superpower,
      });
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{hero ? "Editar Herói" : "Adicionar Herói"}</h2>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="URL da imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      <input
        placeholder="Superpoder"
        value={superpower}
        onChange={(e) => setSuperpower(e.target.value)}
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
}
