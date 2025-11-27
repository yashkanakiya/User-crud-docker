<template>
  <div class="bg-white rounded shadow">
    <table class="min-w-full">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 text-left">User ID</th>
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Interest</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id" class="border-t">
          <td class="p-2">{{ u.user_id }}</td>
          <td class="p-2">{{ u.name }}</td>
          <td class="p-2">{{ u.email }}</td>
          <td class="p-2">{{ u.interest }}</td>
          <td class="p-2">
            <button
              @click="$emit('edit', u)"
              class="mr-2 px-3 py-1 border rounded"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', u._id)"
              class="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="!users || users.length === 0">
          <td class="p-4" colspan="5">No users yet</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  users: { type: Array, default: () => [] },
});
</script>
