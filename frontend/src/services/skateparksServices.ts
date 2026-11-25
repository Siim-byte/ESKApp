import { apiFetch } from "@/api/client"
import type { Skatepark, SkateparkSummary, SkateparkInput } from "../types/Skatepark"

export const skateparksServices = {
  getAll(): Promise<SkateparkSummary[]> {
    return apiFetch<SkateparkSummary[]>("/skateparks")
  },
  getById(id: string): Promise<Skatepark> {
    return apiFetch<Skatepark>(`/skateparks/${id}`)
  },
  create(skatepark: SkateparkInput): Promise<void> {
    return apiFetch<void>("/skateparks", {
      method: "POST",
      body: JSON.stringify(skatepark),
    })
  },
  update(id: string, skatepark: SkateparkInput): Promise<void> {
    return apiFetch<void>(`/skateparks/${id}`, {
      method: "PUT",
      body: JSON.stringify(skatepark),
    })
  },
  delete(id: string): Promise<void> {
    return apiFetch<void>(`/skateparks/${id}`, {
      method: "DELETE",
    })
  },
}
