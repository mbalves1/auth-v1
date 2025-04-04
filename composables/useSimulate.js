import { API_URL } from "~/api/apiNest";

export async function getSimulate(token) {
  const cookies = JSON.stringify(token.value)
  const authToken = JSON.parse(cookies);
  
  try {
    const response = await fetch(`${API_URL}investments/products/simulate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}