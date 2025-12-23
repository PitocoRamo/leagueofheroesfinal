"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHeroes } from "../Components/Context/HeroesContext";
import { PUBLIC_ID } from "@/app/Services/api";
import "./Dashboard.css";

export default function DashboardPage() {
  const {
    heroes,
    deleteHero,
    toggleFavorite,
    topHeroes,
    loading,
    selectedUser,
  } = useHeroes();

  const router = useRouter();
  const isOwner = selectedUser === PUBLIC_ID;

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {isOwner && <Link href="/dashboard/hero" className="add-hero-btn"> + Adicionar Herói </Link>}

      <div className="cards">
        {heroes.map((hero) => {
          const isFavorite = topHeroes.includes(hero.id);

          return (
            <div
              key={hero.id}
              className="hero-card"
              onClick={() => {
                if (isOwner) {
                  router.push(`/dashboard/hero/${hero.id}`);
                }
              }}
              style={{ cursor: isOwner ? "pointer" : "default" }}
            >
              {/* FAVORITO */}
              <button
                className="favorite-btn"
                disabled={!isOwner}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(hero.id);
                }}
              >
                {isFavorite ? "★" : "☆"}
              </button>

              {/* DELETE */}
              {isOwner && (
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHero(hero.id);
                  }}
                >
                  X
                </button>
              )}

              <img src={hero.image} alt={hero.name} />

              <div className="info">
                <h3>{hero.name}</h3>
                <p>{hero.superpower}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
