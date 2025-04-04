import { API_URL } from "~/api/apiNest";
import { dataFixedIncome } from "../mocks/dataFixedIncome.js" 

const USE_MOCKS = false;

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getProductsFixedIncome() {
  if (USE_MOCKS) {
    return dataFixedIncome;
  }
  try {
    const response = await fetch(`${API_URL}products/finxed_income`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Erro na requisição, retornando mock:", error);
    throw error;
  }
}

export async function getProductsRealEstate() {
  try {
    const response = await fetch(`${API_URL}products/real_estate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getProductsStocks() {
  try {
    const response = await fetch(`${API_URL}products/stocks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function getProductsCrypto() {
  try {
    const response = await fetch(`${API_URL}products/crypto`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
