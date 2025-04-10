<template>
  <div class="user-info">
    <span v-if="isLoggedIn" class="username">
      {{ userName }} |
    </span>
    <span v-if="showLink">
      <router-link v-if="!isLoggedIn" to="/login">Войти</router-link>
      <router-link v-else to="/logout">Выйти</router-link>
    </span>
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
    showLink() {
      return !(this.$route.name === 'login' || this.$route.name === 'logout');
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex; /* Используем flexbox для выравнивания элементов в строку */
  align-items: center; /* Вертикальное выравнивание по центру */
  color: var(--indigo-dark); /* Используем темный зеленый цвет */
  font-weight: bolder; /* Жирный шрифт */
}

a {
  color: var(--indigo); /* Используем светлый зеленый цвет */
  text-decoration: none; /* Убираем подчеркивание */
  margin-left: 5px; /* Отступ между именем и ссылкой */
}

a:hover {
  text-decoration: underline; /* Подчеркивание при наведении */
}

.username {
  display: inline; /* Отображение в одной строке */
}
</style>
