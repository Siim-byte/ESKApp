<script setup lang="ts">

import { ref} from "vue"
import Userslist from "../components/user/UsersList.vue"
import UserDetails from "../components/user/UserDetails.vue"
import RegisterForm from "../components/user/RegisterForm.vue"
/*userdetails ka*/

const selectedUserId = ref<string | null>(null)

    function selectUser(id: string) {
        selectedUserId.value = id
    }

</script>

<template>
    <div>
        <h1>See all users</h1>
        <Userslist @select="selectUser" />

        <UserDetails v-if="selectedUserId" :user-id="selectedUserId" />
        <h1>sign up for user</h1>
        <RegisterForm />
    </div>
</template>