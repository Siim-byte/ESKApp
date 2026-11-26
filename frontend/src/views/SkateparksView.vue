<script setup lang="ts">
import { ref } from 'vue'
import SkateparkList from '../components/skatepark/SkateparksList.vue';
import SkateparkDetails from '../components/skatepark/SkateparkDetails.vue';
import SkateparkForm from '../components/skatepark/SkateparkForm.vue'
import { skateparksServices } from "../services/skateparksServices.ts";

const selectedSkateparkId = ref<string | null>(null)
const editing = ref(false)
const listVersion = ref(0)
const detailsVersion = ref(0)
const error = ref("")

function selectSkatepark(id: string) {
    selectedSkateparkId.value = id
  editing.value = false
}

function createSkatepark() {
    selectedSkateparkId.value = null
  editing.value = true
  
}

function skateparkSaved() {
  editing.value = false
  listVersion.value++
  detailsVersion.value++
}

async function deleteSkatepark() {
  if (!selectedSkateparkId.value) return
  if (!confirm("Delete this skatepark?")) return

  error.value = ""

  try {
    await skateparksServices.delete(selectedSkateparkId.value)
    selectedSkateparkId.value = null
    editing.value = false
    listVersion.value++
  } catch (err) {
  
    error.value = "Cannot delete this skatepark"
    console.error(err)
  }
}
</script>

<template>
    <main>
      <h1>Skateparks!</h1>
      <button @click="createSkatepark">Add skatepark</button>
      <p v-if="error">{{ error }}</p>
      <p>
        <SkateparkList 
          :key="listVersion"
          @select="selectSkatepark" />
  
        <section v-if="selectedSkateparkId && !editing">
          <SkateparkDetails 
            :key="`${selectedSkateparkId}-${detailsVersion}`"
            :skatepark-id="selectedSkateparkId" />
          <button @click="editing = true">Edit</button>
          <button @click="deleteSkatepark">Delete</button>
        </section>
        
        <section v-if="editing">
          <button @click="editing = false">Cancel edit</button>
          <SkateparkForm 
            :skatepark-id="selectedSkateparkId"
            @saved="skateparkSaved" />
        </section>
      </p>      
      ------------------------------------------------------------------------
      <p>
        Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
        documentation
      </p>
    </main>
  </template>
  