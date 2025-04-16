import { API_URL } from "~/api/apiNest";

export async function postSimpleInvestment(token, payload) {
  const cookies = JSON.stringify(token.value)
  const authToken = JSON.parse(cookies);

  const formatPayload = JSON.stringify(payload);
  try {
    const response = await fetch(`${API_URL}investments/simple/contract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: formatPayload
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

export async function getUserInvestment(token) {
  const cookies = JSON.stringify(token.value)
  const authToken = JSON.parse(cookies);

  try {
    const response = await fetch(`${API_URL}investments/user/contracts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
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

