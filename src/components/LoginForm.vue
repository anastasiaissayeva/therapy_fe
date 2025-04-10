<template>
  <div>
    <div class="modal" v-if="isModalOpen">
      <div class="login-container">
        <button class="btn-close" @click="onCancel"></button>
        <h2 class="login-title">Вход в систему</h2>
        <form id="LoginForm" @submit.prevent="onLogin">
          <div class="form-group">
            <label for="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              v-model.lazy.trim="username"
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль:</label>
            <input
              type="password"
              id="password"
              v-model.lazy.trim="password"
              placeholder="Введите пароль"
              required
            />
          </div>
          <div class="button-group">
            <button type="submit" class="btn-login">Войти</button>
            <button type="button" @click="onCancel" class="btn-cancel">Отменить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isModalOpen: true, // Модальное окно открыто по умолчанию
    };
  },
  methods: {
    async onLogin() {
      await this.$store.dispatch('obtainToken', {
        username: this.username,
        password: this.password
      });
      this.isModalOpen = false; // Закрываем модальное окно после успешного входа
      this.$router.push("/");
    },
    onCancel() {
      this.isModalOpen = false; // Закрываем модальное окно при отмене
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Обеспечиваем, что модальное окно поверх всего */
}

.login-container {
  max-width: 400px;
  width: 100%; /* Чтобы форма занимала всю ширину на мобильных устройствах */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  position: relative; /* Для позиционирования кнопки закрытия */
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn-login,
.btn-cancel {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login {
  background-color: #4CAF50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-login:hover {
  background-color: #45a049;
}

.btn-cancel:hover {
  background-color: #e53935;
}
</style>