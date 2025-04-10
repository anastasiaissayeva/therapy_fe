<template>
  <div>

  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userName() {
      return this.$store.getters.userName;
    },
  },
}
</script>

