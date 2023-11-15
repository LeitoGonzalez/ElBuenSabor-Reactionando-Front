import { AuthResponse } from "../types/AuthResponse";
import { RegisterRequest } from "../types/RegisterRequest";

const BASE_URL = "http://localhost:8080/auth";

export const AuthService = {

    register: async (request: RegisterRequest): Promise<AuthResponse> => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        const data = await response.json();

        return data;
    }

}