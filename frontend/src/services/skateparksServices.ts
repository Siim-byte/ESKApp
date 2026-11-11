import type { Skatepark, SkateparkSummary, SkateparkInput } from "../types/Skatepark"
const API_URL = import.meta.env.VITE_BACKEND_URL

async function request<T>(endpoint:string, options?: RequestInit): Promise<T> {
    const response = await fetch(API_URL + endpoint, options)

    if (!response.ok) {
        throw new Error(
            `Request has failed, status is: ${response.status}`
        )
    }
    if (response.status === 204){
        return undefined as T
    }
    return response.json() as Promise<T>
}

/* service */

export const skateparksServices = {
    getAll(): Promise<SkateparkSummary[]> {
    return request<SkateparkSummary[]>("/skateparks")
    },
    getById(id: string): Promise<Skatepark>
    {
        return request<Skatepark>(`/skateparks/${id}`)
    },
    create(skatepark:SkateparkInput): Promise<void> {
        return request<void>("/skateparks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(skatepark)
        })
    },
    update(id: string, skatepark: SkateparkInput): Promise<void> {
        return request<void>(`/skateparks/${id}`, {
            method: "PUT",
            headers:  {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(skatepark)
        })
    },
    delete(id: string): Promise<void> {
        return request<void>(`/skateparks/${id}`, {
            method: "DELETE"
        })
    }
}