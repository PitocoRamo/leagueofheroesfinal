"use client";

import { useParams } from "next/navigation";
import { useHeroes } from "@/app/Components/Context/HeroesContext";
import HeroForm from "@/app/Components/HeroForm";

export default function EditHeroPage() {
  const params = useParams();
  const heroId = Number(params.id);

  const { heroes, loading } = useHeroes();

  if (loading) return <p>Carregando...</p>;

  const hero = heroes.find((h) => h.id === heroId);

  if (!hero) {
    return <p>Herói não encontrado</p>;
  }

  return <HeroForm hero={hero} />;
}
