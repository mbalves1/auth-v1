import { API_URL } from "~/api/apiNest";

export async function getSimulate(token) {
  const cookies = JSON.stringify(token.value)
  const toje = JSON.parse(cookies);
  console.log('auth_token', toje);
  
  try {
    const response = await fetch(`${API_URL}investments/products/simulate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${toje}`
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