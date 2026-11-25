<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { usersServices } from "@/services/usersServices";
import type { UserRegister } from "@/types/User"
import router from "@/router";

const props = defineProps<{
    userId?: string | null
}>()

const emit = defineEmits<{
    saved:[]
}>()

const error = ref("")
const saving = ref(false)

function emptyUser(): UserRegister {
    return {
        Display_name: "",
        Email: "",
        Role: "",
        Is_blocked: false,
        Created_at: new Date().toDateString(),
        Password_hash: "",
        PasswordConfirmation: null
    }
}

const form = ref<UserRegister>(emptyUser())

async function register() {
    saving.value = true
    error.value = ""

    try {
        await usersServices.register(form.value)
            router.replace("/login")
            console.log("try")
    } catch (err) {
        error.value = "Saving failed"
        if (err instanceof Error) {
        console.error(err.message);
        } else {
        console.error('An unknown error occurred:', err);
        }
    } finally {
        saving.value = false
    }
}

</script>

<template>
    <section>
        <h2>Input your personal and very very private data</h2>
        <p style="font-size: 3px; color:#fefefe;">haha made u look</p>
        <form @submit.prevent="register">
            <label for="Display_name">User Name <span color="red">*</span></label><br/>
            <input id="Display_name" v-model="form.Display_name" required/><br/><br/>

            <label type="email" for="EmailA">Email <span color="red">*</span></label><br/>
            <input id="Email" v-model="form.Email" required/><br/><br/>

            <label for="Password">Password <span color="red">*</span></label><br/>
            <input type="password" id="Password" v-model="form.Password_hash" required/><br/><br/>

            <label for="PasswordConfirmation">Confirm password <span color="red">*</span></label><br/>
            <input type="password" id="PasswordConfirmation" v-model="form.PasswordConfirmation" required/><br/><br/>

            <span color="red">Fields with an * (asterix) must be filled</span><br/><br/>

            <p v-if="error">{{ error }}</p><br/><br/>

            <button type="submit" :disabled="saving">{{ saving ? "Registering user, please hold" : "Register" }}</button><br/><br/>
        </form><br/><br/>
    </section>
</template>
