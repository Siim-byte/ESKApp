<script setup lang="ts">
import {ref, watch} from "vue"
import { skateparksServices } from "../../services/skateparksServices";
import type { Skatepark } from "../../types/Skatepark";

const props = defineProps<{
    skateparkId: string
}>()

const skatepark = ref<Skatepark | null>(null)
const error = ref("")
const loading = ref(false)

async function loadSkatepark(id:string) {
    skatepark.value = null
    loading.value = true
    error.value = ""

    try {
        skatepark.value = await skateparksServices.getById(id)
    }catch (err) {
        error.value = "Cannot get skatepark."
        console.error(err);
    } finally {
        loading.value = false
    }
}
watch( () => props.skateparkId, loadSkatepark, {immediate: true})
</script>

<template>
    <section>
        <h2>Skatepark Details</h2>

        <p v-if="loading">Loading skatepark info</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else-if="skatepark">
            <h3>{{ skatepark.name }}</h3>
            <p>{{ skatepark.description }}</p>
            <p>{{ skatepark.city }}</p>
            <p>{{ skatepark.address }}</p>
            <p>{{ skatepark.latitude }}</p>
            <p>{{ skatepark.longitude }}</p>
        </div>
    </section>
</template>