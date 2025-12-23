const BASE_URL = "https://dwdm-psw-heroes-api.onrender.com/api";

export const PUBLIC_ID = "vG6ecxlZ"; 
export const PRIVATE_ID = "3vGezHG-wZbCh7dO"; 

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

// GET lista de utilizadores
export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erro ao obter utilizadores");
  }

  return res.json();
}

// GET heróis do utilizador
export async function getHeroesByUser(publicId) {
  const res = await fetch(`${BASE_URL}/users/${publicId}`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erro ao obter heróis");
  }

  return res.json();
}

// GET top 3
export async function getTopHeroes(publicId) {
  const res = await fetch(`${BASE_URL}/users/${publicId}/top`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erro ao obter top 3");
  }

  return res.json();
}

// POST guardar heróis
export async function saveHeroes(privateId, heroes) {
  const res = await fetch(`${BASE_URL}/users/${privateId}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(heroes),
  });

  if (!res.ok) {
    throw new Error("Erro ao guardar heróis");
  }
}

// POST guardar top 3
export async function saveTopHeroes(privateId, topHeroes) {
  const res = await fetch(`${BASE_URL}/users/${privateId}/top`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(topHeroes),
  });

  if (!res.ok) {
    throw new Error("Erro ao guardar top 3");
  }
}
