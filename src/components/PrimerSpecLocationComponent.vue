<template>
  <tr>
    <td>
      <router-link
        :to="{name: 'speclocationdetails', params: {id: this.id }}">{{ name }} </router-link>
    </td>
    <td>
      {{ name_location }}
    </td>
    <td>
      {{ note }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    name_location: {
      type: String,
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .petslist {
    min-height: 5vh;
    display: flex;
    align-items: center;
  }
}
</style>
