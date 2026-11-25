import {ref} from "vue";
import type { UserSummary } from "@/types/User";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const currentUser = ref<UserSummary|null>(null)
export const authReady = ref(false)

export const authenticationsServices = {
    async login(EmailAddress: string, Password: string) {
        const response = await fetch(API_URL + "")
    }
}