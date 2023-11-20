import { DTOProducto } from "../types/DTOProducto";
import { Producto } from "../types/Producto";

const BASE_URL = "http://localhost:8080/api/v1/productos";

export const ProductoService = {
  //Acá hacemos todas las consultas HTTP

  getProductosList: async (token: string | null): Promise<DTOProducto[]> => {
    try {
      const response = await fetch(`${BASE_URL}/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error de solicitud: ", error);
      throw new Error();
    }
  },

  getPublicProductosList: async (): Promise<DTOProducto[]> => {
    try {
      const response = await fetch(`${BASE_URL}/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error de solicitud: ", error);
      throw new Error();
    }
  },

  createProduct: async (
    dtoRequest: DTOProducto, 
    token: string | null
  ): Promise<Producto<"COCINA" | "BEBIDA">> => {
    const response = await fetch(`${BASE_URL}/admin/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(dtoRequest),
    });

    const data = await response.json();

    return data;
  },

  getProducto: async (id: number): Promise<Producto<"COCINA" | "BEBIDA">> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();

    return data;
  },

  updateProduct: async (
    dtoRequest: DTOProducto,
    id: number,
    token: string | null
  ): Promise<Producto<"COCINA" | "BEBIDA">> => {
    try {
      const response = await fetch(`${BASE_URL}/admin/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dtoRequest),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  },

  deleteProduct: async (id: number, token: string | null): Promise<void> => {
    try {
      await fetch(`${BASE_URL}/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
