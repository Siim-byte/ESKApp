<script setup lang="ts">
import { ref, onMounted } from "vue"
import { skateparksServices } from "../services/skateparksServices";
import type { SkateparkSummary } from "../types/Skatepark";

const skateparks = ref<SkateparkSummary[]>([])
const loading = ref(false)
const error = ref("")

async function loadSkateparks() {
    loading.value = true
    error.value = ""

    try {
        skateparks.value = await skateparksServices.getAll()
    } catch (err) {
        error.value = "Cannot load skateparks, geegs"
        console.log(err);
    } finally {
        loading.value = false
    }
}

onMounted(loadSkateparks)
</script>

<template>
    <section>
        <h2>Skateparks</h2>
        <button @click="loadSkateparks">Refresh</button>
        <p v-if="loading">Loading skateparks...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="skateparks.length === 0">No skateparks have been found</p>
        <ul v-else>
            <li v-for="skatepark in skateparks" :key="skatepark.id">
                {{ skatepark.name }} ( {{ skatepark.id }})
            </li>
        </ul>
    </section>
</template>