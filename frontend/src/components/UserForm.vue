<template>
  <form @submit.prevent="submit" class="mb-6 bg-white p-4 rounded shadow">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label class="block text-sm">User ID</label>
        <input
          v-model="form.user_id"
          class="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label class="block text-sm">Name</label>
        <input
          v-model="form.name"
          class="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label class="block text-sm">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label class="block text-sm">Interest</label>
        <input
          v-model="form.interest"
          class="w-full border px-2 py-1 rounded"
        />
      </div>
    </div>

    <div class="mt-3 flex gap-2">
      <button class="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
        {{ editUser ? "Update" : "Create" }}
      </button>
      <button
        v-if="editUser"
        type="button"
        class="px-4 py-2 border rounded"
        @click="cancel"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, toRefs } from "vue";
import api from "../services/api.js";
const props = defineProps({
  editUser: Object,
});
const emit = defineEmits(["saved", "cancelEdit"]);
const form = ref({
  user_id: "",
  name: "",
  email: "",
  interest: "",
});

watch(
  () => props.editUser,
  (val) => {
    if (val) {
      form.value = {
        user_id: val.user_id,
        name: val.name,
        email: val.email,
        interest: val.interest || "",
      };
    } else {
      form.value = { user_id: "", name: "", email: "", interest: "" };
    }
  },
  { immediate: true }
);

const submit = async () => {
  if (props.editUser) {
    await api.put(`/users/${props.editUser._id}`, form.value);
  } else {
    await api.post("/users", form.value);
  }
  emit("saved");
  form.value = { user_id: "", name: "", email: "", interest: "" };
};

const cancel = () => {
  emit("cancelEdit");
};
</script>
