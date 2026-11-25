<script setup lang="ts">
import router from "@/router"
import { authenticationsServices } from "@/services/authenticationsServices"
import { ref } from "vue"
import { useRoute } from "vue-route"

const error = ref("")
const email = ref("")
const password = ref("")
const saving = ref(false)
const route = useRoute()

const handleLogin = async () => {
    try {
        await authenticationsServices.login(email.value, password.value)
        const redirectPath = (route.query.redirect as string) || "/users"
        router.push(redirectPath)
    } catch (err) {
        if (err instanceof Error) {
            error.value = "Invalid email or password"
            console.error(err.message);
        } else {
            console.error('An unknown error occurred:', err);
        }
    }
}

</script>

<template>
    <section>
        <h2>Log in</h2>
        <p style="font-size: 3px; color:#fefefe;">haha made u look</p>
        <form @submit.prevent="handleLogin">
            <label for="UserName">User Name <span color="red">*</span></label><br/>
            <input id="UserName" v-model="email" required/><br/><br/>

            <label for="Password">Password <span color="red">*</span></label><br/>
            <input type="password" id="Password" v-model="password" required/><br/><br/>

            <span color="red">Fields with an * (asterix) must be filled</span><br/><br/>

            <p v-if="error">{{ error }}</p><br/><br/>

            <button type="submit" :disabled="saving">{{ saving ? "Logging in, please hold" : "Log in" }}</button><br/><br/>
        </form><br/><br/>
    </section>
</template>