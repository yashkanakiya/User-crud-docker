<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Accounts</h1>
    <UserForm
      @saved="fetchUsers"
      :editUser="editUser"
      @cancelEdit="cancelEdit"
    />
    <UserList :users="users" @edit="onEdit" @delete="onDelete" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "./services/api.js";
import UserForm from "./components/UserForm.vue";
import UserList from "./components/UserList.vue";

const users = ref([]);
const editUser = ref(null);

const fetchUsers = async () => {
  const resp = await api.get("/users");
  users.value = resp.data;
};

onMounted(fetchUsers);

const onEdit = (user) => {
  editUser.value = user;
};

const cancelEdit = () => {
  editUser.value = null;
};

const onDelete = async (id) => {
  if (!confirm("Delete user?")) return;
  await api.delete(`/users/${id}`);
  fetchUsers();
};
</script>
