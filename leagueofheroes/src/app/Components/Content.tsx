"use client";

import { useHeroes } from "./Context/HeroesContext";
import Loader from "./Loader";
import HeroInfo from "./HeroInfo";

export default function Content() {
  const {
    heroes,
    topHeroes,
    users,
    selectedUser,
    changeUser,
    loading,
  } = useHeroes();

  if (loading) return <Loader />;

  return (
    <main>
      <label>   
        Utilizador Selecionado:
        <select
          value={selectedUser}
          onChange={(e) => changeUser(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.publicId} value={user.publicId}>
              {user.name || user.publicId}
            </option>
          ))}
        </select>
      </label>

      <h2>Heróis Favoritos</h2>

      <div className="heroes-container">
        {heroes
          .filter((hero) => topHeroes.includes(hero.id))
          .map((hero) => (
            <HeroInfo
              key={hero.id}
              id={hero.id}
              name={hero.name}
              image={hero.image}
              isFavorite={topHeroes.includes(hero.id)}
            />
          ))}
      </div>
    </main>
  );
}
