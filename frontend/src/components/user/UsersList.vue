<script setup lang="ts">

import {ref,onMounted} from "vue"
import {usersServices} from "../../services/usersServices"
import type {UserSummary} from "../../types/User"

const users = ref<UserSummary[]>([])
const loading = ref(false)
const error = ref("")

const emit = defineEmits<{
select: [id: string]
}>()

async function loadUsers() {
    loading.value = true
    error.value = ""

    try {
        users.value = await usersServices.getAll()
    } catch (err) {
        error.value = "Can not load users"
        console.error(err)
    } finally {
        loading.value = false
    }
}

onMounted(loadUsers)
</script>

<template>
    <section>
        <h2>List of users</h2>
        <button @click="loadUsers">Refresh list</button>

        <p v-if="loading">Loading users...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="users.length === 0">No users found.</p>
        <ul v-else>
            <li v-for="user in users" :key="user.id">
                <button @click="emit('select', user.id)">{{ user.Display_name }}</button>
                <span>{{ user.Email }}</span>
                <span>{{ user.Role }}</span>
                <span>{{ user.id }}</span>
            </li>
        </ul>

    </section>
</template>
<!-- see leht on ainult adminile -->