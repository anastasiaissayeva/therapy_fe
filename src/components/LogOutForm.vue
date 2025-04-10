<template>
  <div class="overlay" v-if="showOverlay">
    <div class="logout-container">
      <p>Вы уверены, что хотите выйти?</p>
      <div class="button-group">
        <button class="btn-yes" type="button" @click="onLogOut">Да</button>
        <button class="btn-no" type="submit" @click="onCancel">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOverlay: true, // Переменная для управления отображением
    };
  },
  methods: {
    async onLogOut() {
      try {
        await this.$store.dispatch('removeToken');
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка при выходе:", error);
        alert("Произошла ошибка при выходе. Пожалуйста, попробуйте еще раз.");
      }
    },
    onCancel() {
      this.showOverlay = false; // Закрываем модальное окно при отмене
    }
  }
}
</script>

<style scoped>
/* Стили для затемняющего фона */
.overlay {
  position: fixed;  /* Фиксированное позиционирование */
  top: 0;
  left: 0;
  width: 100%;  /* Занимает всю ширину */
  height: 100%;  /* Занимает всю высоту */
  background-color: rgba(0, 0, 0, 0.5);  /* Полупрозрачный черный фон */
  display: flex;  /* Используем flexbox для центрирования */
  justify-content: center;  /* Центрируем по горизонтали */
  align-items: center;  /* Центрируем по вертикали */
}

/* Стили для контейнера с сообщением */
.logout-container {
  background-color: white;  /* Белый фон для контейнера */
  padding: 20px;  /* Отступы */
  border-radius: 8px;  /* Закругление углов */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  /* Тень для контейнера */
  text-align: center; /* Центрируем текст */
}

/* Стили для кнопок выбора */
.button-group {
  display: flex;
  justify-content: space-between; /* Распределяем кнопки */
  margin-top: 20px; /* Отступ сверху для кнопок */
}

.btn-yes, .btn-no {
  padding: 10px 15px; /* Отступы для кнопок */
  border: none; /* Убираем стандартную рамку */
  border-radius: 5px; /* Закругление углов */
  cursor: pointer; /* Указываем, что кнопка кликабельная */
}

.btn-yes {
  background-color: #f44336; /* Красный цвет для кнопки "Да" */
  color: white; /* Белый цвет текста */
}

.btn-no {
  background-color: #4CAF50; /* Зеленый цвет для кнопки "Нет" */
  color: white; /* Белый цвет текста */
}

/* Эффект при наведении на кнопки */
.btn-yes:hover {
  background-color: #e53935; /* Темнее красный при наведении */
}

.btn-no:hover {
  background-color: #45a049; /* Темнее зеленый при наведении */
}
</style>
