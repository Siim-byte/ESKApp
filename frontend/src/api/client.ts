import router from "@/router"

const API_URL = import.meta.env.VITE_BACKEND_URL

export async function apiFetch<T>(endpoint:string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(API_URL + endpoint, {
        ...options,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
    })

    if (response.status === 401) {
        const currentPath = router.currentRoute.value.fullPath
        if (router.currentRoute.value.name !== "login") {
            router.push({name:"login", query: { redirect: currentPath }})
        }
        throw new Error("Authentication required!")
    }

    if(!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Request has failed, status is: ${response.status}`)
    }
    return response.json() as Promise<T>
}