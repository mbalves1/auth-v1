import { API_URL } from "~/api/apiNest";

export async function createUser(userData) {
  try {
    const response = await fetch(`${API_URL}users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    // 🛠️ Lendo os dados apenas uma vez
    const data = await response.clone().json(); 

    if (response.status === 409) {
      console.warn("Usuário já cadastrado, tentando login...");
    }

    if (!response.ok) {
      throw new Error(`Erro ao criar usuário: ${data.message}`);
    }

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Erro na requisição:", error.message);
    throw error;
  }
}
