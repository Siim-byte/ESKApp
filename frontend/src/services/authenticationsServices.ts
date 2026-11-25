import {ref} from "vue";
import type { UserSummary } from "@/types/User";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const currentUser = ref<UserSummary|null>(null)
export const authReady = ref(false)

export const authenticationsServices = {
    async login(Email: string, Password_hash: string) {
        const response = await fetch(API_URL + "/authentication", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Email, Password_hash})
        })
        console.log("Login response:", response);        
        if(!response.ok) {
            throw new Error(`Request has failed, status is: ${response.status}`)
        }
    }
}