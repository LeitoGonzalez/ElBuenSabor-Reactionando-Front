import { Ingrediente } from "../types/Ingrediente";
const BASE_URL = "http://localhost:8080/api/v1/ingrediente";

//Contiene todos los metodos y funciones relacionados con la comunicacion de la Base de Datos

export const IngredieteService = {
  //Hacemos consultas HTTP
  //Declaramos los metodos

  //Devuelve una lista de todos los ingredientes.
  getIngredientesList: async (): Promise<Ingrediente[]> => {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();

    return data;
  },

  //Devuelve el ingrediente por su id.
  getIngrediente: async (id: number): Promise<Ingrediente> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();

    return data;
  },

  //Crear un ingrediente.
  createIngrediente: async (ingredient: Ingrediente): Promise<Ingrediente> => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient), //Serializacion: se utiliza para convertir un objeto JavaScript (en este caso, ingredient) en una cadena de texto en formato JSON.
    });

    const data = await response.json();

    return data;
  },

  //Actualizar un ingrediente. Le paso el id de Ingrediente y me devuelve el Ingrediente actualizado.
  updateIngrediente: async (
    id: number,
    ingredient: Ingrediente
  ): Promise<Ingrediente> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    });

    const data = await response.json();

    return data;
  },

  //Eliminar el ingrediente por el id. Void indica que una funcion no devuelve ningun valor especifico.
  deleteIngrediente: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },
};

//Fetch: realiza solicitudes HTTP a un servidor y recupera datos. => Devuelve una Promesa.
//Async: declara una funcion asincronica. => Devuelve una Promesa.
//Await: dentro de una funcion asincronica para pausar la ejecucion de la funcion y esperar a que una promesa se resuelva o rechace.
