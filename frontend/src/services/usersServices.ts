import { apiFetch } from "@/api/client"
import type {User, UserSummary, UserRegister} from "../types/User"

const API_URL = import.meta.env.VITE_BACKEND_URL

export const usersServices = {
    getAll(): Promise<UserSummary[]> {
        return apiFetch<UserSummary[]>("/users")
    },
    getById(id: string): Promise<User> {
        return apiFetch<User>(`/users/${id}`)
    },
    register(user:UserRegister): Promise<void> {
        console.log(user)
        return apiFetch<void>("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }
}