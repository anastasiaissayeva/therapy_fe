<template>
  <header>
    <div class="header-content">
      <div class="project-info">
        <router-link :to="{ name: 'home' }">
          <img alt="ЛУЧЕВАЯ ТЕРАПИЯ" src="@/assets/1.png" class="project-image" />
        </router-link>
        <h1>ЛУЧЕВАЯ ТЕРАПИЯ</h1>
      </div>
      <nav class="nav">
        <router-link to="#" class="nav-link" v-if="isLoggedIn" @click.prevent="scrollToRadTypes">О видах
          терапии</router-link>
        <router-link :to="{ name: 'home' }" class="nav-link">О проекте</router-link>
        <router-link to="/contact" class="nav-link">Контакты</router-link>
        <router-link to="/faq" class="nav-link">Часто задаваемые вопросы</router-link>
        <user-component />
      </nav>
    </div>
  </header>

  <div class="image-container">
    <img alt="ЛУЧЕВАЯ ТЕРАПИЯ" src="@/assets/55.png" width="100%" height="auto" />
    <div class="overlay-text">Прогнозирование вероятного результата лучевой терапии</div>
    <div class="overlay-text1"> Оцените риски нежелательного воздействия на критические органы и ткани с учетом
      индивидуальных особенностей пациентов</div>


    <div class="container" v-if="!isLoggedIn">
      <p class="welcome-message">
        Для получения доступа к данным,
      </p>
      <div class="auth-section">
        <router-link :to="{ name: 'login' }" class="auth-link">пожалуйста, авторизуйтесь</router-link>

      </div>
    </div>
  </div>

  <router-link v-if="isLoggedIn" to="/ClinicalCaseSearch" class="nav-link clinical-case-search-link">Поиск клинических
    случаев</router-link>
  <div class="container-nav" v-if="isLoggedIn">
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
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-left: auto;
  padding: 10px;
  background-color: #f4f4f4;
  width: 25%;
}

.container-nav {
  display: flex;
}

.content {
  flex: 1;
  background-color: #f4f4f4;
  overflow-y: auto;
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
  color: var(--green);
  margin: 0;
  font-weight: bold;
  font-family: 'Component', sans-serif;
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
  color: var(--black);
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: var(--green);
  color: var(--white);
}

.image-container {
  position: relative;
}

.overlay-text,
.overlay-text1 {
  position: absolute;
  left: 2%;
  font-family: 'Component', sans-serif;
}

.overlay-text {
  top: 20%;
  right: 48%;
  transform: translateY(-50%);
  color: var(--green);
  font-size: 2.8vw;
  font-weight: bold;

}

.overlay-text1 {
  top: 47%;
  right: 48%;
  transform: translateY(-50%);
  color: var(--black);
  font-size: 1.5vw;
  font-weight: 300;


}

.container {
  position: absolute;
  bottom: 5%;
  left: 2%;
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  background-color: var(--green);
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  max-width: 50%;
  z-index: 10;
  font-family: 'Component', sans-serif;
}



.welcome-message {
  margin-top: 10px;
  font-size: 1.125rem;

  color: #ffffff;
  font-family: 'Component', sans-serif;
}

.auth-section {
  margin-top: 10px;
}

.auth-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  transition: color 0.3s;
  font-family: 'Component', sans-serif;
}

.auth-link:hover {
  color: var(--black);
}
</style>
