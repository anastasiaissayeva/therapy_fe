<template>
  <header>
    <div class="header-content">
      <div class="project-info">
        <router-link :to="{name: 'home'}">
          <img alt="ЛУЧЕВАЯ ТЕРАПИЯ" src="@/assets/1.png" width="30" height="30" class="project-image" />
        </router-link>
        <h1>ЛУЧЕВАЯ ТЕРАПИЯ</h1>
      </div>
      <nav class="nav">
        <router-link to="#" class="nav-link" v-if="isLoggedIn" @click.prevent="scrollToRadTypes">О видах терапии</router-link>
        <router-link :to="{name: 'home'}" class="nav-link">О проекте</router-link>
        <router-link to="/contact" class="nav-link">Контакты</router-link>
        <router-link to="/faq" class="nav-link">Часто задаваемые вопросы</router-link>
        <user-component />
      </nav>
    </div>
  </header>

  <div class="image-container">
    <img alt="ЛУЧЕВАЯ ТЕРАПИЯ" src="@/assets/ris.png" width="100%" height="auto" />
    <div class="overlay-text">Примите обоснованные решения о лучевой терапии:</div>
    <div class="overlay-text1">Получите прогноз, оцените риски и индивидуализируйте лечение для каждого пациента.</div>


    <div class="container" v-if="!isLoggedIn">
      <p class="welcome-message" >
        Для получения доступа к данным,
      </p>
      <div class="auth-section">
        <router-link  :to="{name: 'login'}" class="auth-link">пожалуйста, авторизуйтесь</router-link>
        <!-- <span v-else class="greeting">Привет, {{ userName }}</span> -->
      </div>
    </div>
  </div>

  <router-link to="/ClinicalCaseSearch" class="nav-link clinical-case-search-link">Поиск клинических случаев</router-link>
  <div class="container-nav">
    <div class="content">
      <router-view name="additional" />
    </div>
  </div>

  <div class="container-nav">

    <nav class="nav-table" v-if="isLoggedIn">
      <h1>Редактор БД</h1>
      <router-link id="rad-type-nav" to="/radtypelist" class="nav-link">Виды лучевой терапии</router-link>
      <router-link to="/locationlist" class="nav-link">Виды локализаций</router-link>
      <router-link to="/speclocationlist" class="nav-link">Уточненные локализации</router-link>
      <router-link to="/diagnosis" class="nav-link">Диагнозы МКБ-10</router-link>
      <router-link to="/stage" class="nav-link">Стадии</router-link>
      <router-link to="/riskgroup" class="nav-link">Группы риска</router-link>
      <router-link to="/complication" class="nav-link">Осложнения</router-link>
      <router-link to="/histology" class="nav-link">Гистологическая классификация</router-link>
      <router-link to="/grade" class="nav-link">Классификация по степени злокачественности</router-link>
      <router-link to="/tumor" class="nav-link">Tumor(Опухоль)</router-link>
      <router-link to="/node" class="nav-link">Node(Узел)</router-link>
      <router-link to="/metastasis" class="nav-link">Metastasis(Метастазы)</router-link>
      <router-link to="/clinical-case" class="nav-link">Клинические случаи</router-link>
      <router-link to="/unit" class="nav-link">Единицы измерения</router-link>
      <router-link to="/parameter" class="nav-link">Параметры</router-link>
      <router-link to="/model-name" class="nav-link">Модели</router-link>
      <router-link to="/model-structure" class="nav-link">Структуры моделей</router-link>
      <router-link to="/result" class="nav-link">Результаты измерений</router-link>
      <router-link to="/source" class="nav-link">Источники</router-link>
      <router-link to="/data-set" class="nav-link">Набор данных</router-link>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>

</template>

<script>
import UserComponent from './components/UserComponent.vue';

export default {
  components: {
    UserComponent,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    scrollToRadTypes() {
      const element = document.getElementById('rad-type-nav');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.$router.push('/radtypelist');
    },
  }
}
</script>

<style>
.nav-table {
  display: flex;
  flex-direction: column; /* Располагаем ссылки вертикально */
  align-items: flex-start; /* Выравнивание по левому краю */
  gap: 10px; /* Уменьшаем отступ между ссылками */
  margin-left: auto; /* Сдвигаем навигацию вправо */
  padding: 10px; /* Уменьшаем отступы внутри навигации */
  background-color: #f4f4f4; /* Цвет фона для навигации */
  width: 25%;
}
.container-nav {
  display: flex; /* Используем Flexbox для размещения элементов */

}
.content {
  flex: 1; /* Контент занимает оставшееся пространство */

  background-color: #f4f4f4; /* Цвет фона для контента */
  overflow-y: auto; /* Прокрутка, если контент превышает высоту */
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  padding: 20px;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.project-info {
  display: flex;
  align-items: center;
}

.project-image {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

h1 {
  color: var(--indigo);
  margin: 0;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
}

nav {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
}

.nav-link {
  text-decoration: none;
  color: var(--indigo);
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: var(--violet_light);
  color: var(--white);
}

.image-container {
  position: relative;
}

.overlay-text {
  position: absolute;
  top: 20%; /* Позиция по вертикали */
  left: 2%; /* Отступ от левого края */
  transform: translateY(-50%); /* Центрируем текст по вертикали */
  color: var(--indigo_dark); /* Цвет текста */
  font-size: 1.85vw; /* Размер шрифта в относительных единицах */
  font-weight: 300; /* Используем Light */
  font-family: 'Montserrat', sans-serif;
}

.overlay-text1 {
  position: absolute;
  top: 45%; /* Позиция по вертикали */
  left: 2%; /* Отступ от левого края */
  right: 48%; /* Отступ от правого края */
  transform: translateY(-50%); /* Центрируем текст по вертикали */
  color: var(--indigo); /* Цвет текста */
  font-size: 2.5vw; /* Размер шрифта в относительных единицах */
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

.container {
  position: absolute;
  bottom: 5%;
  left: 20px;
  text-align: center;
  font-size: 1rem; /* Используем rem для более гибкого масштабирования */
  padding: 10px;
  background-color: #C2B6FE;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  max-width: 50%; /* Максимальная ширина контейнера в процентах */
  z-index: 10;
  font-family: 'Montserrat', sans-serif;
}

.containernet {
  position: absolute;
  bottom: 5%;
  left: 20px;
  text-align: center;
  font-size: 1rem; /* Используем rem для более гибкого масштабирования */
  padding: 10px;
  background-color: #c2b6fa00;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  max-width: 50%; /* Максимальная ширина контейнера в процентах */
  z-index: 10;
  font-family: 'Montserrat', sans-serif;
}

.welcome-message {
  margin-top: 10px;
  font-size: 1.125rem; /* Используем rem для более гибкого масштабирования */
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
}

.auth-section {
  margin-top: 10px;
}

.auth-link {
  text-decoration: none;
  color: #f5f5f5;
  font-weight: bold;
  transition: color 0.3s;
  font-family: 'Montserrat', sans-serif;
}

.auth-link:hover {
  color: #0002AC;
}

.greeting {
  font-size: 1rem; /* Используем rem для более гибкого масштабирования */
  color: #0002AC;
  font-family: 'Montserrat', sans-serif;
}



</style>
