"use client";

import { getUsers } from "@/app/Services/api";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  getHeroesByUser,
  getTopHeroes,
  saveHeroes,
  saveTopHeroes,
  PUBLIC_ID,
  PRIVATE_ID,
} from "@/app/Services/api";

export interface Hero {
  id: number;
  name: string;
  image: string;
  superpower: string;
}

interface HeroesContextType {
  heroes: Hero[];
  topHeroes: number[];
  users: any[];
  selectedUser: string;
  loading: boolean;
  changeUser: (id: string) => void;
  addHero: (hero: Omit<Hero, "id">) => void;
  updateHero: (hero: Hero) => void;
  deleteHero: (id: number) => void;
  toggleFavorite: (id: number) => void;
}


const HeroesContext = createContext<HeroesContextType | undefined>(undefined);

function generateId() {
  return Math.floor(Math.random() * 1_000_000_000);
}

export function HeroesProvider({ children }: { children: ReactNode }) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [topHeroes, setTopHeroes] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(PUBLIC_ID);


  useEffect(() => {
    async function loadData() {
      try {
        const heroesData = await getHeroesByUser(PUBLIC_ID);
        const topData = await getTopHeroes(PUBLIC_ID);
        const usersData = await getUsers();

        setUsers(usersData);
        setHeroes(heroesData || []);
        setTopHeroes(topData || []);

      }
      catch (err) {
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function addHero(hero: Omit<Hero, "id">) {
    const newHero: Hero = {
      ...hero,
      id: generateId(),
    };

    const updated = [...heroes, newHero];
    setHeroes(updated);
    saveHeroes(PRIVATE_ID, updated);
  }

  function updateHero(hero: Hero) {
    const updated = heroes.map((h) => (h.id === hero.id ? hero : h));
    setHeroes(updated);
    saveHeroes(PRIVATE_ID, updated);
  }

  function deleteHero(id: number) {
    const updatedHeroes = heroes.filter((h) => h.id !== id);
    const updatedTop = topHeroes.filter((t) => t !== id);

    setHeroes(updatedHeroes);
    setTopHeroes(updatedTop);

    saveHeroes(PRIVATE_ID, updatedHeroes);
    saveTopHeroes(PRIVATE_ID, updatedTop);
  }

  function toggleFavorite(id: number) {
    let updatedTop: number[];

    if (topHeroes.includes(id)) {
      updatedTop = topHeroes.filter((t) => t !== id);
    } else {
      updatedTop = [...topHeroes, id].slice(0, 3);
    }

    setTopHeroes(updatedTop);
    saveTopHeroes(PRIVATE_ID, updatedTop);
  }

  function changeUser(userId: string) {
    setSelectedUser(userId);
    setLoading(true);

    Promise.all([
      getHeroesByUser(userId),
      getTopHeroes(userId),
    ])
      .then(([heroesData, topData]) => {
        setHeroes(heroesData || []);
        setTopHeroes(topData || []);
      })
      .finally(() => setLoading(false));
  }

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        topHeroes,
        loading,
        users,
        selectedUser,
        changeUser,
        addHero,
        updateHero,
        deleteHero,
        toggleFavorite,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
}

export function useHeroes() {
  const context = useContext(HeroesContext);
  if (!context) {
    throw new Error("useHeroes deve ser usado dentro do Provider");
  }
  return context;
}
