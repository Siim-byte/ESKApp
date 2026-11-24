<script setup lang="ts">
import { ref, watch } from "vue"
import { skateparksServices } from "../services/skateparksServices"
import type { SkateparkInput } from "../types/Skatepark"

const props = defineProps<{
  skateparkId?: string | null
}>()

const emit = defineEmits<{
  saved: []
}>()

const error = ref("")
const saving = ref(false)

function emptySkatepark(): SkateparkInput {
  return {
    name: "",
    city: "",
    address: "",
    description: "",
    latitude: "",
    longitude: "",
  }
}

const form = ref<SkateparkInput>(emptySkatepark())

async function loadSkatepark() {
  error.value = ""
  if (!props.skateparkId) {
    form.value = emptySkatepark()
    return
  }

  try {
    const skatepark = await skateparksServices.getById(props.skateparkId)
    form.value = {
      name: skatepark.name ?? "",
      city: skatepark.city ?? "",
      address: skatepark.address ?? "",
      description: skatepark.description ?? "",
      latitude: skatepark.latitude ?? "",
      longitude: skatepark.longitude ?? "",
    }
  } catch (err) {
    error.value = "Cannot load this skatepark"
  }
}

async function saveSkatepark() {
  saving.value = true
  error.value = ""

  try {
    if (props.skateparkId) {
      await skateparksServices.update(props.skateparkId, form.value)
    } else {
      await skateparksServices.create(form.value)
    }

    emit("saved")

    if (!props.skateparkId) {
      form.value = emptySkatepark()
    }
  } catch (err) {
    error.value = "Saving failed"
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occured:', err);
    }
  } finally {
    saving.value = false
  }
}

watch(() => props.skateparkId, loadSkatepark, { immediate: true })
</script>

<template>
  <section>
    <h2>{{ props.skateparkId ? "Edit Skatepark" : "Create Skatepark" }}</h2>

    <p v-if="error" class="error">{{ error }}</p>

    <form @submit.prevent="saveSkatepark">
      <label for="name">Skatepark Name</label><br />
      <input id="name" v-model="form.name" required /><br /><br />

      <label for="city">City</label><br />
      <input id="city" v-model="form.city" required /><br /><br />

      <label for="address">Address</label><br />
      <input id="address" v-model="form.address" required /><br /><br />

      <label for="latitude">Latitude</label><br />
      <input id="latitude" v-model="form.latitude" placeholder="e.g. 59.4370" required /><br /><br />

      <label for="longitude">Longitude</label><br />
      <input id="longitude" v-model="form.longitude" placeholder="e.g. 24.7536" required /><br /><br />

      <label for="description">Description</label><br />
      <textarea id="description" v-model="form.description" required></textarea><br /><br />

      <button type="submit" :disabled="saving">
        {{ saving ? "Saving skatepark..." : "Save Skatepark" }}
      </button>
    </form>
  </section>
</template>
