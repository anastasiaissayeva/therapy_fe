<template>
  <div class="search-container">
    <div class="sidebar">
      <h2>Выберите возраст</h2>
      <div v-for="ageOption in ageOptions" :key="ageOption" class="checkbox-container">
          {{ ageOption }} лет
          <input
            type="checkbox"
            :value="ageOption"
            v-model="selectedAges"
          />
      </div>
      <button @click="search" class="search-button">Поиск</button>
    </div>

    <div class="results">
      <h2>Результаты поиска</h2>
      <ul>
        <li v-for="ClinicalCase in clinicalCases" :key="ClinicalCase.id">
          {{ ClinicalCase.сlinical_сase_text }} (Возраст: {{ ClinicalCase.age }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAges: [],
      clinicalCases: [],
      ageOptions: [], // Изначально пустой массив
    };
  },
  created() {
    this.fetchAgeOptions(); // Загружаем возможные возраста при создании компонента
  },
  methods: {
    async fetchAgeOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        // Извлечение уникальных возрастов из полученных данных, исключая пустые
        const ages = response.data.reduce((acc, ClinicalCase) => {
          const age = ClinicalCase.age;
          if (age && !acc.includes(age)) { // Проверяем, что возраст не пустой и уникален
            acc.push(age);
          }
          return acc;
        }, []);

        this.ageOptions = ages; // Сохраняем уникальные возраста
      } catch (error) {
        console.error("Ошибка при загрузке возрастов:", error);
      }
    },
    async search() {
      try {
        console.log("Выбранные возраста:", this.selectedAges); // Для отладки

        // Формируем параметры для запроса, используя запятую в качестве разделителя
        const params = this.selectedAges.length > 0 ? `age=${this.selectedAges.join(',')}` : '';

        const response = await this.$http.get(`clinical-case/?${params}`, {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          },
        });

        console.log("Ответ от сервера:", response.data);
        this.clinicalCases = response.data; // Сохраняем полученные данные
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }
  },
};
</script>

<style scoped>
  .search-container {
    display: flex; /* Используем flexbox для более удобного расположения элементов */
  }

  .sidebar {
    flex: 1;
    padding: 10px; /* Уменьшаем отступы */
    border-right: 1px solid #ccc;
    background-color: #f9f9f9; /* Светлый фон для боковой панели */
  }

  .results {
    flex: 5; /* Занимает 5 частей от общего пространства */
    padding: 10px; /* Уменьшаем отступы */
  }

  .search-button {
    margin-top: 10px; /* Отступ сверху для кнопки */
    padding: 8px 12px; /* Уменьшаем отступы внутри кнопки */
    background-color: #0002AC; /* Цвет фона кнопки */
    color: white; /* Цвет текста кнопки */
    border: none; /* Убираем рамку */
    border-radius: 5px; /* Закругленные углы */
    cursor: pointer; /* Курсор в виде указателя при наведении */
    font-size: 14px; /* Уменьшаем размер шрифта для кнопки */
  }

  .search-button:hover {
    background-color: #0056b3; /* Темнее при наведении */
  }

  .checkbox-container {
    display: flex; /* Используем flexbox */
    align-items: center; /* Выравниваем по центру по вертикали */
    margin-bottom: 5px; /* Уменьшаем отступ между чекбоксами */

  }

  .checkbox-container input[type="checkbox"] {
    margin-left: 10px; /* Уменьшаем отступ между текстом и чекбоксом */
  }

  .age-text {
    margin-right: 5px; /* Уменьшаем отступ между текстом и чекбоксом */
    font-size: 14px; /* Уменьшаем размер шрифта для текста возраста */
  }
</style>
